/* ======================================================================
   FICHIER 10 — ENSEIGNEMENT ET ENCADREMENT D'ÉTUDIANTS
   ====================================================================== */

const ENSEIGNEMENT = [
  { titre:"Materials characterization", heures:"72 h", format:"Practical", niveau:"1st year BUT",
    resume:"Fundamental knowledge of materials characterization (metallic, polymeric, ceramic and composite materials) through TGA/DTA, Vickers hardness testing, optical microscopy and UV–visible spectroscopy." },
  { titre:"Applied physics", heures:"48 h", format:"Practical", niveau:"1st year BUT",
    resume:"Fundamental knowledge of optics and electricity." },
  { titre:"Glasses and ceramics", heures:"36 h", format:"Practical", niveau:"1st year BUT",
    resume:"Discovering the fabrication of glasses and ceramics: phosphate glasses, perovskite materials via conventional processing routes, and silica gel via sol-gel routes." },
  { titre:"Health and safety", heures:"14 h", format:"Practical", niveau:"1st year BUT",
    resume:"Fundamentals of laboratory safety, with practical application through a session involving the calcination of a composite material." },
  { titre:"Physical properties of materials", heures:"8 h", format:"Tutorial", niveau:"2nd year BUT",
    resume:"Dielectric materials and their applications, particularly through capacitance calculations." },
  { titre:"Ceramic materials", heures:"8 h", format:"Practical", niveau:"3rd year BUT",
    resume:"Fabrication and characterization of ceramic materials: borate glasses, manganese oxidation by DTA/TGA, synthesis of phosphate glasses, construction of a ternary phase diagram." }
];


/* Etablissement affiche au-dessus de la liste des enseignements. */
const ENSEIGNEMENT_LIEU = "IUT de Saint-Brieuc — Materials Science department";


const ENCADREMENT = [
  { nom:"Morgane Lebarbé", periode:"02/2025 — 07/2025", niveau:"Master 2 — Université de Technologie de Troyes, France",
    sujet:"Development and characterization of thin oxide films for reconfigurable microwave devices" },
  { nom:"Kyosuke Kanno", periode:"03/2025 — 05/2025", niveau:"Master 1 — Shibaura Institute of Technology, Japan",
    sujet:"Influence of the annealing atmosphere on the CeO2 thin film structure and properties" },
  { nom:"Juhan Lee", periode:"10/2023 — 12/2023", niveau:"Master 1 — Korea Aerospace University, Korea",
    sujet:"Thickness dependence of crystallinity of CeO2 thin films sputtered on R-cut sapphire" },
  { nom:"Heïva Chartrin-Bonnet", periode:"04/2023 — 08/2023", niveau:"Master 1 — Université de Rennes, France",
    sujet:"Tunable thin films for reconfigurable microwave devices" }
];
