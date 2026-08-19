/* ======================================================================
   ASSEMBLAGE — rien à modifier

   Ce fichier rassemble en un seul objet, appelé SITE, tout ce qui a été
   écrit dans les onze fichiers du dossier « contenu ». C'est le seul
   endroit qui fait le lien entre les deux dossiers.

   À gauche des deux-points : le nom utilisé par le reste du programme.
   À droite : le nom de la liste écrite dans « contenu ».
   ====================================================================== */

const SITE = {
  identite:         IDENTITE,          /* contenu/1-identite.js      */
  titres:           TITRES,            /* contenu/2-titres.js        */
  sousTitres:       SOUS_TITRES,       /* contenu/2-titres.js        */
  bio:              BIO,               /* contenu/3-a-propos.js      */
  chiffres:         CHIFFRES,          /* contenu/3-a-propos.js      */
  recherche:        RECHERCHE,         /* contenu/4-recherche.js     */
  these:            THESE,             /* contenu/5-these.js         */
  galerie:          GALERIE,           /* contenu/6-galerie.js       */
  experience:       EXPERIENCE,        /* contenu/7-parcours.js      */
  formation:        FORMATION,         /* contenu/7-parcours.js      */
  publications:     PUBLICATIONS,      /* contenu/8-publications.js  */
  distinctions:     DISTINCTIONS,      /* contenu/9-distinctions.js  */
  enseignement:     ENSEIGNEMENT,      /* contenu/10-enseignement.js */
  enseignementLieu: ENSEIGNEMENT_LIEU, /* contenu/10-enseignement.js */
  encadrement:      ENCADREMENT,       /* contenu/10-enseignement.js */
  competences:      COMPETENCES,       /* contenu/11-competences.js  */
  imagesOpt:        IMAGES_OPT,        /* contenu/12-images-optimisees.js */
  maj:              MAJ                /* contenu/1-identite.js      */
};
