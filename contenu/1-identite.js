/* ======================================================================
   FICHIER 1 — QUI TU ES : nom, poste, photos, liens, réglages du CV

   Règles valables pour tous les fichiers du dossier « contenu » :
     - garder les guillemets " " autour des textes ;
     - garder la virgule qui sépare deux lignes ou deux blocs ;
     - pour ajouter une entrée, copier un bloc { ... } complet
       et le coller juste en dessous ;
     - le dernier bloc d'une liste ne prend pas de virgule.
   ====================================================================== */

const IDENTITE = {
  prenom: "Edgar",
  nom: "Chaslin",
  role: "Post-doctoral Researcher",
  labo: "CEA SPEC — Université Paris-Saclay",
  accroche: "Epitaxial growth and characterisation of ferroelectric oxide thin films.",

  /* Photos de profil. Le plus simple pour les changer : remplacer les
     deux fichiers du dossier « images » en gardant exactement les mêmes
     noms. Sinon, écrire ici le nom du nouveau fichier.                  */
  portrait:       "images/portrait-vertical.jpg",   /* format vertical (3:4) */
  portraitCarre:  "images/portrait-carre.jpg",     /* format carré (1:1)    */

  /* Adresse électronique, volontairement coupée en deux morceaux.
     Les robots qui parcourent le web pour récolter des adresses à
     spammer lisent le texte des fichiers sans exécuter le programme :
     ne trouvant nulle part une adresse entière, ils repartent les
     mains vides. Le site, lui, la recolle au moment de l'affichage,
     et elle reste cliquable pour un visiteur.
     Pour la changer : garder la coupure de part et d'autre du @.   */
  email: { avant: "edgar.chaslin", apres: "cea.fr" },
  adresse: [
    "CEA — Service de Physique de l'État Condensé",
    "Site de l'Orme des Merisiers",
    "91191 Gif-sur-Yvette, France"
  ],
  liens: [
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=5qYy_gwAAAAJ&hl=fr" },
    { label: "ORCID",          url: "https://orcid.org/0009-0008-6824-3785" },
    { label: "HAL",            url: "https://cv.hal.science/edgar-chaslin" },
    { label: "ResearchGate",   url: "https://www.researchgate.net/profile/Edgar-Chaslin-3" },
    { label: "LinkedIn",       url: "https://www.linkedin.com/in/edgar-chaslin-756761171/" }
  ],

  /* ── CV GÉNÉRÉ AUTOMATIQUEMENT ──────────────────────────────────
     Aucun fichier à déposer : le bouton fabrique le CV à la volée à
     partir de tout ce qui est écrit sur cette page. Il est donc à jour
     en permanence. Le visiteur l'enregistre en PDF depuis la liseuse.  */
  cv: {
    label:     "Download CV",
    intitule:  "Curriculum Vitae",
    /* Coordonnées supplémentaires, propres au CV.
       Laisser "" pour ne pas les faire figurer.
       ⚠ Le CV est téléchargeable par n'importe qui : réfléchis avant
       d'y mettre une adresse personnelle ou un numéro de portable.   */
    telephone:    "",
    adressePerso: "",
    nationalite:  "France",
    naissance:    "1999",          /* année de naissance, ex. "1999" : l'âge est calculé */
    langues: [
      { langue: "French",  niveau: "Native" },
      { langue: "English", niveau: "B2" }
    ]
  }
};


/* Date affichee tout en bas de la page. */
const MAJ = "Last updated — August 2026";
