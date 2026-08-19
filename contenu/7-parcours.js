/* ======================================================================
   FICHIER 7 — PARCOURS : expériences professionnelles et diplômes

   Les champs « contexte », « realisations » et « acquis » ne
   s'affichent PAS sur la page : ils servent uniquement au CV généré.
   Les laisser vides ou les effacer les fait simplement disparaître.
   Dans « acquis », le tiret long — sépare l'intitulé de son détail :
   l'intitulé est mis en gras dans le CV.
   ====================================================================== */

const EXPERIENCE = [
  { periode: "Oct. 2025 — Apr. 2027", role: "Post-doctoral researcher",
    lieu: "CEA / C2N — Université Paris-Saclay, Gif-sur-Yvette, France",
    sujet: "Electrical polarization mapping in ferroelectric devices at the nanoscale.",
    detail: "Probing the local polarization in ferroelectric materials as a function of applied bias voltage and the local effective dielectric constant in dielectric materials.",
    supervision: "Jean-Baptiste Moussy (CEA), Sylvia Matzen (C2N)",
    contexte: "Nanoscale mapping of the electrical polarization of ferroelectric and dielectric thin films integrated into capacitors. The project covers the design and fabrication of advanced heterostructures combining ferroelectric and dielectric layers with floating metallic electrodes, allowing local potential and polarization measurements through reference nano-capacitors. It combines thin-film growth (ALD, MBE, PLD) with multi-scale electrical characterisation — conductive AFM, piezoresponse force microscopy and macroscopic capacitor measurements — and with operando electron holography in TEM, to image and quantitatively map charge and potential distributions inside the nano-capacitors. Carried out jointly at CEA-SPEC and C2N, with holography measurements performed at CEMES, Toulouse.",
    realisations: [
      "Fabrication of epitaxial LSMO/BTO/LSMO//STO multilayers by combined methods: pulsed laser deposition for the conductive LSMO electrodes, molecular beam epitaxy for the ferroelectric BaTiO₃ layer.",
      "Depth- and interface-resolved quantification of the strain in the BaTiO₃ layer induced by the top and bottom electrodes; unit-cell-scale quantification of the BaTiO₃ polarization by STEM, correlated with the observed structural relaxations.",
      "In progress: operando electron holography on simple LSMO/BTO/LSMO//STO stacks; fabrication of advanced heterostructures with floating electrodes; AFM, C-AFM, PFM and macroscopic dielectric measurements ahead of operando holography on these advanced stacks."
    ],
    acquis: [
      "Pulsed laser deposition — growth of LSMO thin films, optimisation of the growth parameters to reach the target structural characteristics.",
      "Molecular beam epitaxy — growth of BaTiO₃ thin films.",
      "X-ray photoemission spectroscopy — in-situ measurements, data processing with LG4X and CasaXPS.",
      "Transmission electron microscopy — high-resolution and STEM-HAADF image analysis in DigitalMicrograph; strain quantification by Geometrical Phase Analysis; electron holography to quantify charge accumulation.",
      "Blender — schematics and 3D descriptions of the heterostructures."
    ] },

  { periode: "Oct. 2022 — Sept. 2025", role: "PhD",
    lieu: "IETR UMR-6164 — Université de Rennes, Saint-Brieuc, France",
    sujet: "Dielectric-ferroelectric thin films for reconfigurable microwave devices with low visual impact.",
    detail: "Crystallographic optimization of BaTiO₃ thin films to enhance dielectric performance. Investigation of the impact of oxide seed layers on film quality. Integration of these films into reconfigurable devices.",
    supervision: "Xavier Castel, Quentin Simon, Mohamed Himdi",
    contexte: "The growing demand for multi-standard telecommunication systems calls for functional materials. Ferroelectric thin films — BaTiO₃ and doped BaTiO₃ — are ideal candidates thanks to their tunable properties, enabling reconfigurable microwave devices. The thesis optimises their dielectric performance along four axes: fine tuning of the RF sputtering parameters to improve crystalline quality; study of buffer layers enabling epitaxial growth; doping strategies to further strengthen the dielectric response; and integration of the optimised films into reconfigurable, optically transparent microwave components.",
    realisations: [
      "Optimisation of the deposition parameters of BaTiO₃ and Ba₁₋ₓSrₓTiO₃ thin films, reaching maximised dielectric properties (εr ≈ 300, tan δ ≈ 0.12 at 10 GHz).",
      "Demonstration of a 1.0 GHz frequency agility (12.2 – 13.2 GHz) on a stub resonator under a 180 V external electric field, with up to a fourfold improvement in tunability through low-concentration cerium doping.",
      "In-depth study of epitaxial buffer layers (CeO₂, MgO, MgAl₂O₄), focusing on growth mechanisms and defect propagation.",
      "Fabrication and measurement of a transparent reconfigurable antenna (up to 250 MHz agility), based on an MgO buffer layer and a cerium-doped Ba₁₋ₓSrₓTiO₃ ferroelectric layer."
    ],
    acquis: [
      "X-ray diffraction — ω–2θ and ω measurements on thin films, reciprocal space mapping in out-of-plane and in-plane modes, pole figures and φ scans, lattice parameter and strain measurement (Williamson-Hall), reflectometry.",
      "Transmission electron microscopy — high-resolution image analysis by FFT/IFFT, Geometrical Phase Analysis for lattice and strain measurement, development of a Sobel-filter method to quantify and map misorientation in the films.",
      "Atomic force microscopy — topography in contact, non-contact and tapping modes, conductive AFM and mechanical modes.",
      "RBS and PIXE — chemical composition analysis, data processing with SIMNRA 7.",
      "Device fabrication — photolithography followed by wet and/or laser etching, wire-bonding for ground-plane balancing.",
      "Device characterisation — S-parameter measurements on a probe station, extraction of dielectric properties, antenna measurements (gain, directivity) in anechoic chambers.",
      "Scientific writing and figure design — data visualisation with Python, manuscript preparation for peer-reviewed journals."
    ] },

  { periode: "May 2022 — Sept. 2022", role: "Internship",
    lieu: "GREMAN UMR-7347 — Université de Tours, Tours, France",
    sujet: "Characterization of the domain structure by impedance spectroscopy of thin films with a composition gradient.",
    detail: "Investigation of the impact of doping in (Ba,Ca)(Ti,Zr)O₃ composition on ferroelectric domain wall dynamics.",
    supervision: "Kevin Nadaud, Guillaume Nataf, Jérôme Wolfman",
    realisations: [
      "Impedance measurements quantifying domain-wall vibration and jumps under varying temperature and DC field.",
      "Confirmation of a decrease in domain-wall jumps close to the Curie temperature, and identification of discrepancies between measured vibration values and theoretical predictions."
    ],
    acquis: [
      "Impedance spectroscopy — permittivity extraction versus applied bias, C(V) and P(E) curves.",
      "Hyperbolic-law fitting to extract lattice vibration, domain-wall vibration amplitude, pinning/unpinning and threshold field.",
      "First exposure to AFM and PFM for ferroelectric domain imaging, and to Python for data processing."
    ] },

  { periode: "Jan. 2022 — May 2022", role: "Internship",
    lieu: "IETR UMR-6164 — Université de Rennes, Saint-Brieuc, France",
    sujet: "Deposition and characterization of thin films for reconfigurable microwave devices.",
    detail: "",
    supervision: "Xavier Castel, Quentin Simon",
    realisations: [
      "Commissioning of a recent multi-target RF sputtering system and identification of the key deposition parameters.",
      "Study of the combined effect of working pressure and target-substrate distance on stoichiometry, growth kinetics and film structure."
    ],
    acquis: [
      "RF sputtering — system start-up, vacuum and utility troubleshooting, oxide target conditioning, confocal multi-target configuration.",
      "XRD in parallel-beam geometry, SEM for thickness and target morphology, EDS with a semi-quantitative method to handle Ba–Ti peak overlap, UV-visible spectroscopy and Tauc plots."
    ] },

  { periode: "Mar. 2019 — June 2019", role: "Internship",
    lieu: "Murata Manufacturing Co. — Yasu, Japan",
    sujet: "Investigation of glass treatment to reduce ion dissolution in soluble glasses.",
    detail: "" }
];


const FORMATION = [
  { periode: "2021 — 2022", diplome: "Master of Research", lieu: "Université de Limoges, France",
    detail: "Materials Science and Engineering — High-Performance Ceramics." },
  { periode: "2019 — 2022", diplome: "Engineering degree", lieu: "ENSIL-ENSCI, Limoges, France",
    detail: "Industrial Ceramics." },
  { periode: "2017 — 2019", diplome: "University Institute of Technology", lieu: "Université de Rennes, Saint-Brieuc, France",
    detail: "Materials Science and Engineering." }
];
