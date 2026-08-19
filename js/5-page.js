/* ======================================================================
   CONSTRUCTION DE LA PAGE — rien à modifier

   Assemble le HTML de chaque section à partir de SITE.
   Pour changer un texte, passer par le dossier « contenu ».
   ====================================================================== */

const T = SITE.titres, ST = SITE.sousTitres;
const ORDRE = ["about","research","thesis","gallery","background","publications","awards","teaching","supervision","skills","contact"];

/* ── Colonne portrait ─────────────────────────────────────────────── */
const portrait = document.getElementById("portrait");
portrait.src = I.portrait;
portrait.alt = `Portrait of ${I.prenom} ${I.nom}`;
document.getElementById("plate").innerHTML = `
  <h1>${esc(I.prenom)}<b>${esc(I.nom)}</b></h1>
  <p class="role">${esc(I.role)}</p>
  <p class="lab">${esc(I.labo)}</p>
  <p class="accroche">${esc(I.accroche)}</p>
  <div class="soc">
    ${I.liens.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
    <a href="mailto:${esc(I.email)}">Email</a>
  </div>
  <button class="cvbtn" id="cvbtn" type="button"><i>↓</i>${esc((I.cv && I.cv.label) || "Download CV")}</button>`;

/* ── Carte de la colonne de gauche ─────────────────────────────────────
   Hors champ à l'arrivée, découverte dès que la photo se replie. Tout
   ce qu'elle affiche est repris d'ailleurs — e-mail et adresse de
   1-identite.js, projet en cours de 4-recherche.js, articles de
   8-publications.js : il n'y a donc rien de plus à tenir à jour.
   Le repère de lecture, lui, est rempli au défilement par
   activerColonne(), dans js/2-outils.js.                              */

/* Le projet mis en avant est celui marqué « Current » dans
   4-recherche.js ; à défaut, le premier de la liste. */
const enCours = SITE.recherche.find(r => r.statut === "Current") || SITE.recherche[0];

/* Les deux articles les plus récents. anneesDe trie les années de la
   plus récente à la plus ancienne ; à l'intérieur d'une même année,
   l'ordre du fichier est conservé. Pour mettre un article en tête, il
   suffit donc de le remonter dans 8-publications.js. */
const derniers = anneesDe(parType("journal"))
  .flatMap(y => parType("journal").filter(p => p.annee === y))
  .slice(0, 2);

document.getElementById("carte").innerHTML = `
  <p class="eyebrow">${esc(ST.carte || "Get in touch")}</p>
  <a class="c-mail" href="mailto:${esc(I.email)}">${esc(I.email)}</a>
  <p class="c-addr">${I.adresse.map(esc).join("<br>")}</p>

  ${enCours ? `<div class="c-actu">
    <p class="a-tete">
      <span class="a-pastille">${esc(ST.actu || "Currently")}</span>
      <span class="a-quand">${esc(enCours.periode)}</span>
    </p>
    <p class="a-titre">${esc(enCours.titre)}</p>
    ${enCours.motscles ? `<div class="a-mots">${
      enCours.motscles.map(m => `<span>${esc(m)}</span>`).join("")}</div>` : ""}
    ${derniers.length ? `<div class="a-pubs">
      <p class="a-sous">${esc(ST.dernieres || "Latest articles")}</p>
      ${derniers.map(p => {
        const dedans = `<span class="t">${esc(p.titre)}</span>
          <span class="s">${esc(p.source)} · ${esc(p.annee)}${p.doi ? " ↗" : ""}</span>`;
        return p.doi
          ? `<a class="a-pub" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">${dedans}</a>`
          : `<span class="a-pub">${dedans}</span>`;
      }).join("")}
    </div>` : ""}
  </div>` : ""}

  <div class="c-lecture">
    <div class="c-piste"><span id="c-jauge"></span></div>
    <p class="c-etat"><b id="c-section"></b><span id="c-rang"></span></p>
  </div>`;

document.getElementById("topbar").innerHTML =
  ORDRE.map(k => `<a href="#${k}">${esc(T[k].onglet)}</a>`).join("");
document.getElementById("printhead").innerHTML =
  `<h1>${esc(I.prenom)} ${esc(I.nom)}</h1>
   <p>${esc(I.role)} — ${esc(I.labo)} · ${esc(I.email)}</p>`;

/* Même en-tête pour toutes les sections */
const S = (k, corps) => `<section id="${k}" class="rev">
  <p class="eyebrow">${esc(T[k].onglet)}</p>
  <h2>${emph(T[k].h2.replace("{n}", SITE.publications.length))}</h2>
  ${corps}</section>`;


const cnt = compteurs();
function pubs(f){
  return GROUPES.filter(([k]) => f === "all" || f === k).map(([k,label]) => {
    const list = parType(k); if (!list.length) return "";
    return `<p class="subhead" style="margin:36px 0 4px">${esc(label)} · ${list.length}</p>` +
      anneesDe(list).map(y => `<div class="yr"><div class="yr-n">${esc(y)}</div><div>` +
        list.filter(x => x.annee === y).map(x => `<article class="pub">
          <p class="t">${esc(x.titre)}</p>
          <p class="a">${moi(x.auteurs)}</p>
          <p class="s"><span>${esc(x.source)}</span>${badge(x)}${doiLien(x)}</p>
        </article>`).join("") + `</div></div>`).join("");
  }).join("");
}

document.getElementById("main").insertAdjacentHTML("beforeend",

S("about", `
  ${SITE.bio.map(t => `<p class="lead">${esc(t)}</p>`).join("")}
  <div class="stats">${SITE.chiffres.map(c =>
    `<div><b>${esc(c.valeur)}</b><span>${esc(c.label)}</span></div>`).join("")}</div>`) +

S("research", SITE.recherche.map(r => { const g = fig(r.image); return `<div class="rblock">
    <div>
      <span class="tag">${esc(r.statut)}</span>
      <h3>${esc(r.titre)}</h3>
      <p class="meta">${esc(r.lieu)}<br>${esc(r.periode)}</p>
      <p>${esc(r.resume)}</p>
      <div class="chips">${r.motscles.map(m => `<span class="chip">${esc(m)}</span>`).join("")}</div>
    </div>
    ${g ? `<figure class="thumb" data-fig="${esc(g.cle)}" tabindex="0" role="button"
        aria-label="Open image viewer — ${esc(g.titre)}">
      <div class="wrapimg">${imgHTML(g.src, {alt:g.titre, cls:"fig" + fitCls(g),
        sizes:"(max-width:820px) 92vw, 300px"})}<span class="loupe" aria-hidden="true">⤢</span></div>
      <figcaption>${esc(g.technique)}</figcaption></figure>` : ""}
  </div>`; }).join("")) +

S("thesis", blocThese()) +

S("gallery", `
  <div class="strip">${SITE.galerie.map(g => `<figure data-fig="${esc(g.cle)}" tabindex="0" role="button"
      aria-label="Open image viewer — ${esc(g.titre)}">
    <div class="wrapimg">${imgHTML(g.src, {alt:g.titre, cls:"fig" + fitCls(g),
      sizes:"(max-width:640px) 78vw, 300px"})}<span class="loupe" aria-hidden="true">⤢</span></div>
    <figcaption><span class="tech">${esc(g.technique)}</span><div class="ti">${esc(g.titre)}</div></figcaption>
  </figure>`).join("")}</div>
  <p class="hint">Scroll sideways · click or press Enter to open the viewer</p>`) +

S("background", `<div class="two">
  <div><p class="subhead">${esc(ST.experience)}</p><div class="tl">
    ${SITE.experience.map(e => `<div class="it"><p class="d">${esc(e.periode)}</p><h3>${esc(e.role)}</h3>
      <p class="w">${esc(e.lieu)}</p><p class="s">${esc(e.sujet)}</p>${e.detail ? `<p>${esc(e.detail)}</p>` : ""}</div>`).join("")}
  </div></div>
  <div><p class="subhead">${esc(ST.formation)}</p><div class="tl">
    ${SITE.formation.map(f => `<div class="it"><p class="d">${esc(f.periode)}</p><h3>${esc(f.diplome)}</h3>
      <p class="w">${esc(f.lieu)}</p><p>${esc(f.detail)}</p></div>`).join("")}
  </div></div>
</div>`) +

S("publications", `
  <div class="filters" id="filters">
    ${[["all","All"],...GROUPES.map(([k,l]) => [k,l.replace(" conferences","").replace("Peer-reviewed journals","Journals")])]
      .map(([k,l]) => `<button data-f="${k}" aria-pressed="${k==='all'}">${esc(l)}<i>${cnt[k]}</i></button>`).join("")}
  </div>
  <div id="publist"></div>`) +

S("awards", `<div class="aw">${SITE.distinctions.map(d => `<article>
    <p class="p">${esc(d.prix)}</p><p class="ev">${esc(d.evenement)}</p>
    <p class="dt">${esc(d.date)} · ${esc(d.lieu)}</p>
    <p class="ti">${esc(d.titre)}</p><p class="au">${moi(d.auteurs)}</p></article>`).join("")}</div>`) +

S("teaching", `
  <p class="subhead">${esc(SITE.enseignementLieu)}</p>
  <div class="rows">${SITE.enseignement.map(t => `<div class="row">
    <div><h3>${esc(t.titre)}</h3><p>${esc(t.resume)}</p></div>
    <div class="side"><b>${esc(t.heures)}</b> · ${esc(t.format)}<br>${esc(t.niveau)}</div></div>`).join("")}</div>`) +

S("supervision", `<div class="rows">${SITE.encadrement.map(s => `<div class="row">
    <div><h3>${esc(s.nom)}</h3><p>${esc(s.sujet)}</p><p class="lvl">${esc(s.niveau)}</p></div>
    <div class="side">${esc(s.periode)}</div></div>`).join("")}</div>`) +

S("skills", `<div class="sk">${SITE.competences.map(c => `<div><h4>${esc(c.famille)}</h4>
    <ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>`) +

S("contact", `
  <p class="lead">${esc(ST.contact)}</p>
  <div class="contact-grid">
    <a class="mail" href="mailto:${esc(I.email)}">${esc(I.email)}</a>
    <p class="addr">${I.adresse.map(esc).join("<br>")}</p>
    <div class="soc-inline">
      ${I.liens.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}
    </div>
  </div>`) +

`<footer>
  <span>© ${new Date().getFullYear()} ${esc(I.prenom)} ${esc(I.nom)}</span>
  <span>${esc(SITE.maj)}</span>
  <span><a href="#top">Back to top ↑</a></span>
</footer>`);

const publist = document.getElementById("publist");
publist.innerHTML = pubs("all");
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  [...e.currentTarget.children].forEach(x => x.setAttribute("aria-pressed", x === b));
  publist.innerHTML = pubs(b.dataset.f);
});
