/* ======================================================================
   LISEUSE DE THÈSE — rien à modifier

   Fabrique le sommaire cliquable et affiche le PDF au bon chapitre.
   Le contenu se règle dans contenu/5-these.js.
   ====================================================================== */

const TH = SITE.these || {};


/* Sommaire + cadre de lecture, inseres dans la section « Thesis ». */
function blocThese(){
  const meta = [
    TH.etablissement && `<span>${esc(TH.etablissement)}</span>`,
    TH.ecole         && `<span>${esc(TH.ecole)}</span>`,
    TH.defendue      && `<span>Defended <b>${esc(TH.defendue)}</b></span>`,
    TH.encadrement   && `<span>${esc(TH.encadrement)}</span>`,
    TH.pages         && `<span><b>${esc(TH.pages)}</b> pages</span>`
  ].filter(Boolean).join("");
  const chap = (TH.chapitres || []).map((c,k) =>
    `<li><button type="button" class="${k===0 ? "on" : ""}" data-page="${c.page}" data-k="${k}" aria-current="${k===0}">
       ${esc(c.titre)}<em>p.&nbsp;${esc(c.page)}</em></button></li>`).join("");
  return `
  <p class="th-titre">${esc(TH.titre || "")}</p>
  <div class="th-meta">${meta}</div>
  ${(TH.resume || []).map(t => `<p class="lead">${esc(t)}</p>`).join("")}
  ${TH.motscles ? `<div class="chips">${TH.motscles.map(m => `<span class="chip">${esc(m)}</span>`).join("")}</div>` : ""}
  <div class="reader">
    <div class="toc">
      <p class="subhead">Contents</p>
      <ol id="th-toc">${chap}</ol>
      <div class="dl">
        <a href="${esc(TH.fichier || "#")}" download>Download ↓</a>
        <a href="${esc(TH.fichier || "#")}" target="_blank" rel="noopener">Full screen ↗</a>
        ${TH.lien ? `<a class="keep" href="${esc(TH.lien)}" target="_blank" rel="noopener">Official record ↗</a>` : ""}
      </div>
    </div>
    <div class="frame" id="th-body"></div>
  </div>`;
}


/* Le PDF est verifie avant d'etre propose : tant qu'il n'est pas
   depose dans « documents », un message s'affiche a la place. */
async function existe(url){
  if (!url) return false;
  if (location.protocol === "file:") return true;   /* test en local */
  try { const r = await fetch(url, {method:"HEAD"}); return r.ok; }
  catch (e) { return false; }
}


async function demarrerLiseuse(){
  const corps = document.getElementById("th-body");
  const toc   = document.getElementById("th-toc");
  if (!corps) return;
  const chap = TH.chapitres || [];

  if (!await existe(TH.fichier)){
    corps.innerHTML = `<div class="absent"><strong>The manuscript is not online yet.</strong>
      Drop the PDF into a <code>documents</code> folder next to this page,
      under the name <code>${esc((TH.fichier||"").split("/").pop())}</code>, and it will appear here.</div>`;
    document.querySelectorAll(".dl a:not(.keep), .toc button").forEach(el => {
      el.setAttribute("disabled",""); el.style.opacity = ".45"; el.style.pointerEvents = "none";
    });
    return;
  }

  /* Sur téléphone, l'affichage d'un PDF dans un cadre est peu fiable
     (iOS n'affiche souvent que la première page) : on propose plutôt
     d'ouvrir le fichier, et les chapitres s'ouvrent dans un onglet.   */
  const petitEcran = matchMedia("(max-width:900px)").matches;
  if (petitEcran){
    corps.innerHTML = `<div class="absent"><strong>${esc(TH.titre || "The manuscript")}</strong>
      Reading a PDF inside a page works poorly on a phone.
      <span style="display:block;margin-top:18px">
        <a class="cvbtn" style="background:var(--ink);border-color:var(--ink);color:var(--paper)"
           href="${esc(TH.fichier)}" target="_blank" rel="noopener">Open the manuscript ↗</a></span></div>`;
    toc.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      window.open(`${TH.fichier}#page=${b.dataset.page}`, "_blank", "noopener");
    });
    return;
  }

  /* Réglages d'adresse compris par les lecteurs PDF des navigateurs :
     toolbar=0 et navpanes=0 masquent la barre grise et le volet latéral,
     view=FitH ajuste la page à la largeur du cadre.                    */
  const adresse = c =>
    `${TH.fichier}#page=${c.page}&view=FitH&toolbar=0&navpanes=0&pagemode=none`;

  function aller(k){
    const c = chap[k]; if (!c) return;
    if (corps.dataset.k === String(k)) return;   /* déjà à ce chapitre */
    corps.dataset.k = k;

    /* Le lecteur PDF intégré au navigateur ne lit « #page= » qu'au
       moment où il charge le document : modifier la fin de l'adresse
       d'un cadre déjà affiché ne le fait pas bouger d'une ligne. Il
       faut donc lui donner un cadre neuf à chaque chapitre. L'adresse
       du fichier ne changeant pas, le PDF est repris du cache du
       navigateur et n'est pas retéléchargé.                           */
    corps.innerHTML = `<iframe id="th-pdf" title="${esc(TH.titre || "Thesis")}"
      src="${esc(adresse(c))}" loading="lazy"></iframe>`;

    toc.querySelectorAll("button").forEach((b,i) => {
      b.classList.toggle("on", i === k);
      b.setAttribute("aria-current", i === k);
    });
  }
  toc.addEventListener("click", e => {
    const b = e.target.closest("button"); if (b) aller(+b.dataset.k);
  });
  aller(0);
}
