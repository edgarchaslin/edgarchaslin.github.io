/* ======================================================================
   FICHIER 5 — THÈSE : résumé, mots-clés et sommaire de la liseuse

   Déposer le PDF dans le dossier « documents » sous le nom indiqué
   par « fichier ». Tant qu'il est absent, la liseuse affiche un
   message d'attente au lieu d'une erreur du navigateur.
   Le sommaire ci-dessous a été relevé directement dans les signets du
   PDF, ceux que LaTeX (hyperref) a écrits à la compilation : titres et
   numéros de page correspondent donc exactement au manuscrit.
   Les numéros sont les pages RÉELLES du PDF, couverture comprise —
   c'est-à-dire le numéro affiché par le lecteur de PDF, pas celui
   imprimé en bas de page. C'est lui qui fait sauter la liseuse au
   bon endroit.
   Un champ laissé vide ("") ne s'affiche pas.
   ====================================================================== */

const THESE = {
  fichier:       "documents/These-Edgar-Chaslin.pdf",
  titre:         "Dielectric-ferroelectric thin films for reconfigurable microwave devices with low visual impact",
  etablissement: "Université de Rennes — IETR UMR-6164, Saint-Brieuc",
  ecole:         "",                    /* ex. "École doctorale MATISSE" */
  defendue:      "October 2025",
  encadrement:   "Supervised by X. Castel, Q. Simon and M. Himdi",
  pages:         "278",
  lien:          "https://theses.hal.science/tel-05485466",   /* dépôt officiel, "" pour masquer */

  resume: [
    "This work focuses on the RF magnetron sputtering deposition of ferroelectric thin films for optically transparent and reconfigurable devices at microwaves. This study initially investigated BaTiO₃ thin films, whose limited dielectric performance led to a focus on (Ba,Sr)TiO₃ thin films. Optimization of the deposition parameters combined with ex-situ annealing enabled the manufacture of tunable films (A = 8.8%). The use of buffer layers (CeO₂, MgO, MgAl₂O₄) implemented between the sapphire substrate and the ferroelectric layer improved both crystalline quality and dielectric properties, with MgO emerging as the best solution (A = 15.6%). Further enhancement was achieved through cerium doping (0.6 mol%), leading to a record performance with a frequency tunability A = 20.6% at 10 GHz. The optimized dielectric–ferroelectric heterostructures were then implemented into a micromesh slot-loop antenna (66% optical transparency), exhibiting a frequency tunability ΔF = 250 MHz at ∼20 GHz. This work thus reinforces the ability of ferroelectric thin films in the design of optically transparent and reconfigurable devices at microwaves."
  ],

  motscles: ["BaTiO₃", "Perovskite", "Buffer layer", "Sputtering", "Epitaxy",
             "Tunable antenna", "Optical transparency"],

  chapitres: [
    { page:  19, titre: "Introduction générale" },
    { page:  23, titre: "État de l'art" },
    { page:  73, titre: "Dépôt et caractérisation des couches minces oxydes et métalliques" },
    { page: 101, titre: "Optimisation des procédés d'élaboration des couches minces de BaTiO3 et de Ba1-xSrxTiO3 pour applications en hyperfréquences" },
    { page: 139, titre: "Stratégies d'optimisation des propriétés structurales et diélectriques en hyperfréquences - Ajout d'une couche tampon" },
    { page: 195, titre: "Stratégies d'optimisation de l'agilité des couches minces par le dopage au cérium" },
    { page: 221, titre: "Antennes reconfigurables à faible impact visuel" },
    { page: 239, titre: "Conclusion générale et perspectives" },
    { page: 245, titre: "Annexes" },
    { page: 269, titre: "Fiches JCPDS" }
  ]
};
