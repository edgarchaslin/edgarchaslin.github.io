/* ======================================================================
   OUTILS COMMUNS — rien à modifier

   Petites fonctions utilisées partout : mise en forme du texte,
   tri des publications, apparition au défilement, choix de la taille
   des images, visionneuse plein écran.
   ====================================================================== */

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const emph = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const moi = s => esc(s).replace(/E\.\s?Chaslin/g, "<em>E. Chaslin</em>");
const I   = SITE.identite;

/* Recollage de l'adresse électronique, écrite en deux morceaux dans
   contenu/1-identite.js. Aucun fichier du site ne contient donc
   l'adresse entière ; elle n'existe qu'en mémoire, une fois la page
   ouverte. Une adresse écrite d'un seul tenant reste acceptée.     */
if (I.email && typeof I.email === "object")
  I.email = I.email.avant + String.fromCharCode(64) + I.email.apres;
const GROUPES = [
  ["journal","Peer-reviewed journals"],
  ["international","International conferences"],
  ["national","National conferences"],
  ["invited","Invited conferences"]
];
const parType   = k => SITE.publications.filter(p => p.type === k);
const anneesDe  = l => [...new Set(l.map(p => p.annee))].sort().reverse();
const fitCls    = g => g && g.cadrage === "contain" ? " contain" : "";
const fig       = k => SITE.galerie.find(g => g.cle === k);
const compteurs = () => {
  const c = { all: SITE.publications.length };
  GROUPES.forEach(([k]) => c[k] = parType(k).length);
  return c;
};
const doiLien = p => p.doi
  ? `<a class="doi" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">doi ↗</a>` : "";
const badge = p => p.format ? `<span class="fmt ${p.format.toLowerCase()}">${esc(p.format)}</span>` : "";

/* Révélation au scroll + année active, utilisés par toutes les variantes */
function activerReveal(sel){
  const o = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add("in"); o.unobserve(e.target); }
  }), {rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(sel).forEach(el => o.observe(el));
}
function activerNav(navSel){
  const links = [...document.querySelectorAll(navSel)];
  if (!links.length) return;
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), {rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("section[id], header[id]").forEach(s => spy.observe(s));
}


/* ══════════════════════════════════════════════════════════════════════
   COLONNE DE GAUCHE — repli de la photo au défilement

   En haut de page, la photo tient tout l'écran. Dès que le défilement
   commence, elle se replie et découvre la carte de contact. Tout le
   mouvement est fait par la feuille css/2-colonne-portrait.css : ici on
   ne fait que poser ou retirer la classe « compact » au bon moment.

   Les deux seuils sont volontairement différents. Avec un seuil unique,
   la colonne se remettrait à clignoter dès qu'un doigt hésite autour de
   la valeur limite ; l'écart entre les deux l'en empêche.
   ═════════════════════════════════════════════════════════════════════ */

function activerColonne(){
  const aside = document.querySelector(".aside");
  const carte = document.getElementById("carte");
  if (!aside || !carte) return;

  const REPLI = 90, DEPLI = 30;          /* en pixels de défilement */
  const grand    = matchMedia("(min-width:941px)");
  const jauge    = document.getElementById("c-jauge");
  const nom      = document.getElementById("c-section");
  const rang     = document.getElementById("c-rang");
  const sections = [...document.querySelectorAll("main section[id]")];
  let compact = null, enAttente = false;

  /* Toutes les mesures d'abord, toutes les modifications ensuite.
     Mesurer après avoir modifié forcerait le navigateur à recalculer la
     mise en page sur-le-champ, à chaque cran de molette. */
  function relire(){
    enAttente = false;

    /* ── Mesures ── */
    const y      = scrollY;
    const course = document.documentElement.scrollHeight - innerHeight;
    const seuil  = innerHeight * .4;
    let k = 0;
    for (let n = 0; n < sections.length; n++)
      if (sections[n].getBoundingClientRect().top <= seuil) k = n;

    /* ── Modifications ── */
    /* Repli — inactif sur téléphone, où la colonne n'est pas collante. */
    const veut = grand.matches && (compact ? y > DEPLI : y > REPLI);
    if (veut !== compact){
      compact = veut;
      aside.classList.toggle("compact", compact);
      /* Hors champ, la carte doit aussi sortir du parcours de
         tabulation : sans cela, la touche Tab emmène le visiteur sur
         un e-mail qu'il ne voit pas. */
      carte.inert = !compact;
    }
    if (jauge) jauge.style.width = (course > 0 ? Math.min(100, y / course * 100) : 0) + "%";
    if (!nom || !sections.length) return;
    const id = sections[k].id;
    if (nom.dataset.id !== id){
      nom.dataset.id   = id;
      nom.textContent  = ((SITE.titres || {})[id] || {}).onglet || "";
      rang.textContent = `${k + 1} / ${sections.length}`;
    }
  }

  /* Un seul calcul par image affichée, quel que soit le nombre
     d'événements de défilement reçus entre-temps. */
  addEventListener("scroll", () => {
    if (!enAttente){ enAttente = true; requestAnimationFrame(relire); }
  }, {passive:true});
  addEventListener("resize", relire);
  grand.addEventListener("change", relire);
  relire();
}


/* ══════════════════════════════════════════════════════════════════════
   IMAGES — servir la bonne taille

   outils/optimiser-images.py fabrique dans « images/opt » plusieurs
   largeurs de chaque image, en WebP, et les déclare dans le fichier
   contenu/12-images-optimisees.js. Les deux fonctions ci-dessous s'en
   servent pour ne télécharger que ce qui est réellement affiché.

   Si une image n'y figure pas — parce qu'elle vient d'être déposée et
   que le script n'a pas encore été relancé — elles retombent sur le
   fichier d'origine : l'image s'affiche quand même, simplement plus
   lourde. Rien ne casse jamais.
   ═════════════════════════════════════════════════════════════════════ */

const OPT = k => (SITE.imagesOpt || {})[k];

/* Version allégée la plus proche d'une largeur souhaitée. */
function srcOpt(src, largeur){
  const v = OPT(src); if (!v) return src;
  return `${v.base}-${v.w.find(x => x >= largeur) || v.w[v.w.length - 1]}.webp`;
}

/* Balise <picture> complète. « sizes » décrit la place que l'image
   occupera à l'écran : c'est lui qui évite au navigateur de charger
   2400 px pour une vignette de 300 px. Les attributs width/height
   reprennent les dimensions de l'original — ils réservent la place
   avant l'arrivée de l'image et empêchent la page de sursauter. */
function imgHTML(src, {alt = "", cls = "", sizes = "100vw", lazy = true} = {}){
  const fin = `${cls ? ` class="${cls}"` : ""} alt="${esc(alt)}"`
            + `${lazy ? ` loading="lazy"` : ""} decoding="async">`;
  const v = OPT(src);
  if (!v) return `<img src="${esc(src)}"${fin}`;
  return `<picture>
    <source type="image/webp" sizes="${esc(sizes)}"
            srcset="${v.w.map(w => `${v.base}-${w}.webp ${w}w`).join(", ")}">
    <img src="${v.base}-${v.jpg}.jpg" width="${v.l}" height="${v.h}"${fin}
  </picture>`;
}


/* ══════════════════════════════════════════════════════════════════════
   VISIONNEUSE PLEIN ÉCRAN

   S'ouvre au clic — ou à la touche Entrée — sur n'importe quelle figure
   portant « data-fig ». Elle donne accès à toute la galerie sans avoir
   à en ressortir : flèches ← →, molette ou double-clic pour zoomer,
   glisser pour se déplacer dans l'image, Échap pour sortir.

   L'échelle affichée en bas à gauche n'apparaît que si l'image la
   déclare dans contenu/6-galerie.js. Voir ce fichier pour la mesurer.
   ═════════════════════════════════════════════════════════════════════ */

function activerLightbox(){
  const items = SITE.galerie || [];
  if (!items.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Image viewer");
  box.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Close (Esc)">✕</button>
    <button class="lb-btn lb-prev"  type="button" aria-label="Previous image (left arrow)">‹</button>
    <button class="lb-btn lb-next"  type="button" aria-label="Next image (right arrow)">›</button>
    <figure>
      <div class="lb-stage">
        <img alt="" draggable="false">
        <div class="lb-echelle" hidden><span class="bar"></span><span class="txt"></span></div>
      </div>
      <figcaption>
        <p class="lb-tech"></p>
        <p class="lb-titre"></p>
        <p class="lb-leg"></p>
        <p class="lb-aide">Scroll or click to zoom · drag to pan · arrow keys to browse</p>
      </figcaption>
    </figure>
    <p class="lb-num" aria-live="polite"></p>`;
  document.body.appendChild(box);

  const $     = s => box.querySelector(s);
  const img   = $("img");
  const scene = $(".lb-stage");
  const ech   = $(".lb-echelle");
  const seul  = items.length < 2;
  if (seul) box.querySelectorAll(".lb-prev, .lb-next").forEach(b => b.hidden = true);

  let i = 0, z = 1, tx = 0, ty = 0, avant = null, glisse = null;
  const ZMAX = 6;


  /* ── Placement de l'image ────────────────────────────────────────
     Le déplacement est borné pour qu'un bord de l'image ne puisse
     jamais entrer dans le cadre : on ne peut pas se perdre dans le
     vide en faisant glisser trop loin. */
  function appliquer(){
    const mx = Math.max(0, (img.offsetWidth  * z - scene.clientWidth)  / 2);
    const my = Math.max(0, (img.offsetHeight * z - scene.clientHeight) / 2);
    tx = Math.min(mx, Math.max(-mx, tx));
    ty = Math.min(my, Math.max(-my, ty));
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${z})`;
    scene.classList.toggle("zoome", z > 1.01);
    barreEchelle();
  }

  /* Zoom centré sur un point : ce point de l'image reste sous le
     curseur pendant que le reste s'écarte autour de lui. */
  function zoomer(k, px, py){
    const z2 = Math.min(ZMAX, Math.max(1, z * k));
    if (Math.abs(z2 - z) < 1e-4) return;
    const r  = scene.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    tx = px - cx - (px - cx - tx) * (z2 / z);
    ty = py - cy - (py - cy - ty) * (z2 / z);
    z  = z2;
    appliquer();
  }

  /* Le zoom au clic et au clavier est animé — le mouvement aide à
     comprendre ce qui change ; celui de la molette et le glisser
     restent instantanés, pour rester collés au geste. */
  function anime(fn){
    scene.classList.add("anime");
    fn();
    setTimeout(() => scene.classList.remove("anime"), 220);
  }

  /* ── Barre d'échelle ─────────────────────────────────────────────
     « part » est la fraction de la LARGEUR de l'image couverte par la
     barre ; sa longueur à l'écran suit donc fidèlement le zoom. Sans
     « part » ni « texte », rien ne s'affiche : aucune échelle n'est
     devinée ni inventée. */
  function barreEchelle(){
    const e  = (items[i] || {}).echelle;
    const px = e && e.part ? img.offsetWidth * z * e.part : 0;
    if (!e || !e.texte || !px || px > scene.clientWidth * .9){
      ech.hidden = true; return;
    }
    ech.hidden = false;
    ech.querySelector(".bar").style.width = px + "px";
    ech.querySelector(".txt").textContent = e.texte;
  }


  /* ── Changement d'image ──────────────────────────────────────────── */
  function aller(k){
    i = (k + items.length) % items.length;
    const g = items[i];
    z = 1; tx = 0; ty = 0;
    img.src = srcOpt(g.src, 2400);
    img.alt = g.titre || "";
    $(".lb-tech").textContent  = g.technique || "";
    $(".lb-titre").textContent = g.titre || "";
    $(".lb-leg").textContent   = g.legende || "";
    $(".lb-num").textContent   = seul ? "" : `${i + 1} / ${items.length}`;
    appliquer();
    /* Les deux images voisines sont préparées en silence : la
       navigation ← → devient alors instantanée. */
    if (!seul) [i + 1, i - 1].forEach(v => {
      new Image().src = srcOpt(items[(v + items.length) % items.length].src, 2400);
    });
  }
  img.addEventListener("load", appliquer);


  /* ── Ouverture, fermeture, focus ─────────────────────────────────
     Le focus reste enfermé dans la fenêtre tant qu'elle est ouverte,
     puis il est rendu à l'élément qui l'avait avant : au clavier, on
     revient exactement sur la vignette d'où l'on vient. */
  function ouvrir(cle){
    const k = items.findIndex(g => g.cle === cle);
    if (k < 0) return;
    avant = document.activeElement;
    box.hidden = false;
    document.body.style.overflow = "hidden";
    aller(k);
    $(".lb-close").focus();
  }
  function fermer(){
    box.hidden = true;
    document.body.style.overflow = "";
    if (avant && avant.focus) avant.focus();
    avant = null;
  }

  box.addEventListener("click", e => {
    if (e.target === box)              return fermer();
    if (e.target.closest(".lb-close")) return fermer();
    if (e.target.closest(".lb-prev"))  return aller(i - 1);
    if (e.target.closest(".lb-next"))  return aller(i + 1);
  });

  box.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const f = [...box.querySelectorAll("button:not([hidden])")];
    const bord = e.shiftKey ? f[0] : f[f.length - 1];
    if (document.activeElement === bord){
      e.preventDefault();
      (e.shiftKey ? f[f.length - 1] : f[0]).focus();
    }
  });


  /* ── Zoom : molette, clic, glisser ───────────────────────────────── */
  scene.addEventListener("wheel", e => {
    e.preventDefault();
    zoomer(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY);
  }, {passive:false});

  /* Un seul geste sert au déplacement, au balayage et au zoom : on
     regarde à la fin de quelle sorte de geste il s'agissait. */
  scene.addEventListener("pointerdown", e => {
    if (e.button !== 0) return;
    glisse = {x:e.clientX, y:e.clientY, tx, ty, parcours:0};
    scene.setPointerCapture(e.pointerId);
  });
  scene.addEventListener("pointermove", e => {
    if (!glisse) return;
    const dx = e.clientX - glisse.x, dy = e.clientY - glisse.y;
    glisse.parcours = Math.max(glisse.parcours, Math.abs(dx) + Math.abs(dy));
    if (z > 1){ tx = glisse.tx + dx; ty = glisse.ty + dy; appliquer(); }
  });
  scene.addEventListener("pointerup", e => {
    if (!glisse) return;
    const dx = e.clientX - glisse.x, immobile = glisse.parcours < 6;
    glisse = null;
    if (immobile)                          anime(() => zoomer(z > 1 ? 1 / z : 2.6, e.clientX, e.clientY));
    else if (z === 1 && Math.abs(dx) > 60) aller(i + (dx < 0 ? 1 : -1));
  });
  scene.addEventListener("pointercancel", () => { glisse = null; });

  addEventListener("resize", () => { if (!box.hidden) appliquer(); });


  /* ── Raccourcis clavier ──────────────────────────────────────────── */
  document.addEventListener("keydown", e => {
    if (box.hidden) return;
    const cx = innerWidth / 2, cy = innerHeight / 2;
    if      (e.key === "Escape")     fermer();
    else if (e.key === "ArrowRight") aller(i + 1);
    else if (e.key === "ArrowLeft")  aller(i - 1);
    else if (e.key === "+" || e.key === "=") anime(() => zoomer(1.4, cx, cy));
    else if (e.key === "-")                  anime(() => zoomer(1 / 1.4, cx, cy));
    else if (e.key === "0")                  anime(() => { z = 1; tx = 0; ty = 0; appliquer(); });
    else return;
    e.preventDefault();
  });


  /* ── Ouverture depuis la page ────────────────────────────────────
     Les figures sont annoncées comme des boutons : elles répondent
     donc aussi à Entrée et à la barre d'espace. */
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-fig]");
    if (t) ouvrir(t.dataset.fig);
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target.closest && e.target.closest("[data-fig]");
    if (!t) return;
    e.preventDefault();
    ouvrir(t.dataset.fig);
  });
}
