/* ======================================================================
   CV GÉNÉRÉ — rien à modifier

   Le CV est reconstruit à la volée depuis le contenu du site : il est
   donc toujours a jour, sans aucun fichier à téléverser. Le visiteur
   l'enregistre en PDF avec le bouton « Save as PDF ».
   ====================================================================== */

const CV = I.cv || {};

function cvHTML(){
  const age = CV.naissance ? (new Date().getFullYear() - (+CV.naissance)) : "";
  const coord = [
    `<span><b>E</b> <a href="mailto:${esc(I.email)}">${esc(I.email)}</a></span>`,
    CV.telephone    && `<span><b>T</b> ${esc(CV.telephone)}</span>`,
    CV.adressePerso && `<span><b>A</b> ${esc(CV.adressePerso)}</span>`,
    age             && `<span><b>Age</b> ${age}</span>`,
    CV.nationalite  && `<span><b>Nationality</b> ${esc(CV.nationalite)}</span>`,
    ...I.liens.map(l => `<span><b>${esc(l.label)}</b> <a href="${esc(l.url)}">${
      esc(l.url.replace(/^https?:\/\/(www\.)?/, "").split("?")[0].replace(/\/$/, ""))}</a></span>`)
  ].filter(Boolean).join("");

  const poste = e => `<article class="cv-job">
    <div class="hd"><h3>${esc(e.role)}</h3><span class="when">${esc(e.periode)}</span></div>
    <p class="where">${esc(e.lieu)}</p>
    ${e.sujet ? `<p class="what">“${esc(e.sujet)}”</p>` : ""}
    ${e.supervision ? `<p class="sup">Supervision — ${esc(e.supervision)}</p>` : ""}
    ${e.contexte ? `<p class="ctx">${esc(e.contexte)}</p>` : (e.detail ? `<p class="ctx">${esc(e.detail)}</p>` : "")}
    ${e.realisations && e.realisations.length ? `<h4>Main achievements</h4>
      <ul>${e.realisations.map(r => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
    ${e.acquis && e.acquis.length ? `<h4>Technical skills acquired</h4>
      <ul>${e.acquis.map(a => { const i = a.indexOf("—");
        return `<li>${i > 0 ? `<b>${esc(a.slice(0,i).trim())}</b> — ${esc(a.slice(i+1).trim())}`
                            : esc(a)}</li>`; }).join("")}</ul>` : ""}
  </article>`;

  const groupe = (k, label) => {
    const l = parType(k); if (!l.length) return "";
    let n = 0;
    return `<h4 style="font-family:var(--mono);font-size:7.2pt;letter-spacing:.15em;text-transform:uppercase;
      color:var(--warm);font-weight:500;margin:4mm 0 1.5mm">${esc(label)} — ${l.length}</h4>` +
      anneesDe(l).flatMap(y => l.filter(x => x.annee === y)).map(x => `<div class="cv-pub">
        <div class="n">${String(++n).padStart(2,"0")}</div>
        <div><p class="t">${esc(x.titre)}</p><p class="a">${moi(x.auteurs)}</p>
          <p class="s">${esc(x.source)} (${esc(x.annee)})${x.format ? " · " + esc(x.format) : ""}${x.doi ? " · doi " + esc(x.doi) : ""}</p></div>
      </div>`).join("");
  };

  return `<div class="cv-bar">
      <span>${esc(CV.intitule || "Curriculum Vitae")} — generated from this site, ${esc(SITE.maj.replace(/^Last updated — /,""))}</span>
      <span class="acts">
        <button type="button" class="primary" id="cv-print">Save as PDF</button>
        <button type="button" id="cv-close">Close</button>
      </span>
    </div>
    <article class="cv">
      <header class="cv-head">
        <div>
          <p class="kicker">${esc(CV.intitule || "Curriculum Vitae")}</p>
          <h1>${esc(I.prenom)} <b>${esc(I.nom)}</b></h1>
          <p class="role">${esc(I.role)}</p>
          <p class="lab">${esc(I.labo)}</p>
        </div>
        <img src="${I.portraitCarre}" alt="">
      </header>
      <div class="cv-contact">${coord}</div>

      <section class="cv-sec">
        <h2>Profile</h2>
        ${SITE.bio.map(t => `<p class="cv-lead">${esc(t)}</p>`).join("")}
        <div class="cv-tally">${SITE.chiffres.map(c =>
          `<div><b>${esc(c.valeur)}</b><span>${esc(c.label)}</span></div>`).join("")}</div>
      </section>

      <section class="cv-sec">
        <h2>Professional experience</h2>
        ${SITE.experience.map(poste).join("")}
      </section>

      <section class="cv-sec">
        <h2>Education</h2>
        ${SITE.formation.map(f => `<div class="cv-line">
          <p class="t">${esc(f.diplome)} — ${esc(f.lieu)}</p>
          <span class="r">${esc(f.periode)}</span>
          <p class="d">${esc(f.detail)}</p></div>`).join("")}
      </section>

      <section class="cv-sec">
        <h2>Technical skills</h2>
        <div class="cv-grid2">${SITE.competences.map(c => `<div class="cv-block">
          <h4>${esc(c.famille)}</h4>
          <ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}
          ${CV.langues ? `<div class="cv-block"><h4>Languages</h4>
            <ul>${CV.langues.map(l => `<li>${esc(l.langue)} — ${esc(l.niveau)}</li>`).join("")}</ul></div>` : ""}
        </div>
      </section>

      <section class="cv-sec">
        <h2>Awards</h2>
        ${SITE.distinctions.map(d => `<div class="cv-line">
          <p class="t">${esc(d.prix)} — ${esc(d.evenement)}</p>
          <span class="r">${esc(d.date)}</span>
          <p class="d">${esc(d.titre)} · ${esc(d.lieu)}</p></div>`).join("")}
      </section>

      <section class="cv-sec">
        <h2>Teaching — ${esc(SITE.enseignementLieu)}</h2>
        ${SITE.enseignement.map(t => `<div class="cv-line">
          <p class="t">${esc(t.titre)}</p>
          <span class="r">${esc(t.heures)} · ${esc(t.format)} · ${esc(t.niveau)}</span>
          <p class="d">${esc(t.resume)}</p></div>`).join("")}
      </section>

      <section class="cv-sec">
        <h2>Students supervised</h2>
        ${SITE.encadrement.map(e => `<div class="cv-line">
          <p class="t">${esc(e.nom)} — ${esc(e.niveau)}</p>
          <span class="r">${esc(e.periode)}</span>
          <p class="d">“${esc(e.sujet)}”</p></div>`).join("")}
      </section>

      <section class="cv-sec">
        <h2>Publications — ${SITE.publications.length} contributions</h2>
        ${GROUPES.map(([k,l]) => groupe(k,l)).join("")}
      </section>

      <div class="cv-foot">
        <span>${esc(I.prenom)} ${esc(I.nom)} — ${esc(CV.intitule || "Curriculum Vitae")}</span>
        <span>${esc(SITE.maj)}</span>
      </div>
    </article>`;
}

const cvdoc = document.getElementById("cvdoc");
let cvPret = false;
function ouvrirCV(){
  if (!cvPret){ cvdoc.innerHTML = cvHTML(); cvPret = true;
    cvdoc.querySelector("#cv-close").addEventListener("click", fermerCV);
    cvdoc.querySelector("#cv-print").addEventListener("click", imprimerCV);
  }
  cvdoc.style.display = "block";
  document.body.style.overflow = "hidden";
  cvdoc.scrollTop = 0;
  cvdoc.querySelector("#cv-close").focus();
}
function fermerCV(){ cvdoc.style.display = "none"; document.body.style.overflow = ""; }
function imprimerCV(){
  document.documentElement.classList.add("cv-print");
  print();
}
addEventListener("afterprint", () => document.documentElement.classList.remove("cv-print"));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && cvdoc.style.display === "block") fermerCV();
});
