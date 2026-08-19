/* ======================================================================
   FICHIER 2 — TITRES : nom des onglets et grand titre de chaque section

   Le texte placé entre *astérisques* s'affiche en italique.
   {n} est remplacé automatiquement par le nombre de publications.
   Ne pas toucher au mot place a gauche des deux-points (about, research,
   thesis, ...) : c'est lui qui relie le titre à sa section.
   ====================================================================== */

const TITRES = {
  about:        { onglet:"About",        h2:"From the *atomic scale* to the *device*" },
  research:     { onglet:"Research",     h2:"Selected *research highlights*" },
  thesis:       { onglet:"Thesis",       h2:"*Transparent devices* based on *ferroelectric thin films*" },
  gallery:      { onglet:"Gallery",      h2:"What my work *looks like*" },
  background:   { onglet:"Background",   h2:"Experience & education" },
  publications: { onglet:"Publications", h2:"{n} scientific contributions" },
  awards:       { onglet:"Awards",       h2:"Distinctions" },
  teaching:     { onglet:"Teaching",     h2:"Practicals and tutorials" },
  supervision:  { onglet:"Supervision",  h2:"Students supervised" },
  skills:       { onglet:"Skills",       h2:"Instruments & methods" },
  contact:      { onglet:"Contact",      h2:"Let's *talk*" }
};


/* Petites phrases de contexte affichees dans les sections. */
const SOUS_TITRES = {
  experience:  "Professional experience",
  formation:   "Education",
  contact:     "Happy to discuss epitaxial growth, ferroelectric characterisation, or a possible collaboration.",
  /* Petits titres de la carte qui apparaît sous la photo, dans la
     colonne de gauche, dès que l'on commence à défiler. */
  carte:       "Get in touch",
  actu:        "Currently",
  dernieres:   "Latest articles"
};
