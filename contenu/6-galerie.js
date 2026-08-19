/* ======================================================================
   FICHIER 6 — GALERIE : les images du site

   Pour changer une image : remplacer le fichier correspondant dans le
   dossier « images » en gardant le même nom — rien d'autre a faire.
   Pour en ajouter une : copier un bloc { ... }, lui donner une « clé »
   qui n'existe pas encore et indiquer le chemin du nouveau fichier.
   cadrage:"contain" affiche l'image entière (utile pour un graphe) ;
   sans ce réglage l'image est recadrée pour remplir le cadre.

   ⚠ APRÈS AVOIR AJOUTÉ OU REMPLACÉ UNE IMAGE, lancer une fois :
         python outils/optimiser-images.py
   Ce script fabrique les versions allégées servies aux visiteurs.
   L'oublier n'affiche pas d'erreur : le site sert alors le fichier
   d'origine, simplement plus lourd.

   ── BARRE D'ÉCHELLE (facultatif) ──────────────────────────────────
   Une micrographie sans échelle est une jolie image ; avec échelle,
   c'est une donnée. Pour en afficher une dans la visionneuse plein
   écran, ajouter à un bloc :

       echelle: { texte:"5 nm", part:0.18 },

   « texte » est ce qui s'écrit sous la barre.
   « part »  est la fraction de la LARGEUR TOTALE de l'image que
              couvre cette longueur — ici, 5 nm occupent 18 % de la
              largeur de l'image.

   Comment mesurer « part » une bonne fois : ouvrir l'image dans
   ImageJ ou Gwyddion, relever la largeur totale en pixels (L) et la
   longueur en pixels correspondant à la distance choisie (l), puis
   écrire part = l / L. La barre suit ensuite le zoom toute seule.
   Sans ce réglage, aucune échelle n'est affichée.
   ====================================================================== */

const GALERIE = [
  { cle:"tem",   src: "images/tem.jpg",   technique:"STEM–HAADF",
    titre:"Atomic-resolution imaging of a BaTiO₃ epitaxial thin film",
    legende:"Atomic-resolution imaging across an LSMO(bottom)/BaTiO₃(top) interface, used for polarization and strain mapping." },

  { cle:"antenna", src: "images/antenna.jpg", technique:"Reconfigurable device",
    titre:"3D model of a meshed reconfigurable antenna",
    legende:"Meshed patch antenna integrating four interdigitated capacitors based on ferroelectric thin films for frequency reconfigurability" },

  { cle:"ceo2-growth", src: "images/ceo2-growth.jpg", technique:"Growth model",
    titre:"Growth model of a CeO₂ thin film on top of a sapphire substrate",
    legende:"Growth model illustrating the progressive dominance of the (002) crystallographic orientation over the (111) orientation in CeO₂ films grown on R-plane sapphire by RF sputtering, attributed to the lower growth rate of the (111) orientation." },

  { cle:"dme",   src: "images/dme.jpg",   technique:"Tilted-DME",
    titre:"Tilted domain matchin epitaxy (TDME) of an epitaxial film",
    legende:"Tilted Domain Matching Epitaxy of MgO films deposited on R-plane sapphire enables a drastic reduction in strain through a ~5° tilt of the MgO lattice relative to the substrate." }]
