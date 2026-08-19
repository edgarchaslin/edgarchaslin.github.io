/* ======================================================================
   DÉMARRAGE — rien à modifier

   Dernier fichier chargé. La page vient d'être construite : il ne reste
   qu'à mettre en route la liseuse de thèse, le bouton « Download CV »,
   l'apparition des sections au défilement, le suivi de l'onglet actif,
   le repli de la colonne de gauche et la visionneuse d'images.
   ====================================================================== */

demarrerLiseuse();

const cvbtn = document.getElementById("cvbtn");
if (cvbtn) cvbtn.addEventListener("click", ouvrirCV);

activerReveal(".rev");
activerNav(".topbar a");
activerColonne();
activerLightbox();
