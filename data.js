/* ============================================================
   Chemdex data — molecules + atom palette
   Loaded as a plain script so the app works from file:// with
   no server and no fetch/CORS issues.
   ============================================================ */

// The draggable atoms available in the Lab. `valence` is shown as
// flavour info; matching is done purely on atom counts.
const ATOMS = [
  { symbol: "H",  name: "Hydrogen", number: 1,  valence: 1, color: "#e8edf2", text: "#1a1d22" },
  { symbol: "C",  name: "Carbon",   number: 6,  valence: 4, color: "#2b2f36", text: "#e8edf2" },
  { symbol: "N",  name: "Nitrogen", number: 7,  valence: 5, color: "#4f7bd6", text: "#ffffff" },
  { symbol: "O",  name: "Oxygen",   number: 8,  valence: 6, color: "#e0524f", text: "#ffffff" },
  { symbol: "Na", name: "Sodium",   number: 11, valence: 1, color: "#a06bd6", text: "#ffffff" },
  { symbol: "S",  name: "Sulfur",   number: 16, valence: 6, color: "#d6b94f", text: "#1a1d22" },
  { symbol: "Cl", name: "Chlorine", number: 17, valence: 7, color: "#5fae5f", text: "#ffffff" }
];

// The molecule "Dex". Matching uses the `atoms` count map, so the
// (non-Hill) formula strings are only ever shown to the player.
const MOLECULES = [
  {
    id: "mol_001", pubchemCid: 962, formula: "H2O",
    commonName: "Water", iupacName: "Oxidane",
    atoms: { H: 2, O: 1 },
    description: "A polar inorganic compound that is at room temperature a tasteless and odorless liquid. It is essential for all known forms of life.",
    uses: ["Drinking and hydration", "Solvent in chemical reactions", "Cooling agent in industry", "Agriculture and irrigation"],
    category: "inorganic", type: "oxide", rarity: "common", tier: 1,
    smiles: "O", inchiKey: "XLYOFNOQVPJJNP-UHFFFAOYSA-N", molarMass: 18.015,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/962/PNG",
    funFact: "Water is one of the few substances that is less dense as a solid than as a liquid, which is why ice floats."
  },
  {
    id: "mol_002", pubchemCid: 280, formula: "CO2",
    commonName: "Carbon Dioxide", iupacName: "Carbon dioxide",
    atoms: { C: 1, O: 2 },
    description: "A colorless gas with a density about 53% higher than that of dry air. It is a trace gas in Earth's atmosphere.",
    uses: ["Carbonation of beverages", "Fire extinguishers", "Plant photosynthesis", "Dry ice for refrigeration"],
    category: "inorganic", type: "oxide", rarity: "common", tier: 1,
    smiles: "O=C=O", inchiKey: "CURLTUGMZLYLDI-UHFFFAOYSA-N", molarMass: 44.009,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/280/PNG",
    funFact: "Humans exhale about 1 kg of CO2 per day."
  },
  {
    id: "mol_003", pubchemCid: 5234, formula: "NaCl",
    commonName: "Table Salt", iupacName: "Sodium chloride",
    atoms: { Na: 1, Cl: 1 },
    description: "An ionic compound representing the salinity of seawater and the extracellular fluid of many multicellular organisms.",
    uses: ["Food seasoning and preservation", "De-icing roads", "Industrial chemical production", "Medical saline solutions"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[Na+].[Cl-]", inchiKey: "FAPWRFPIFSIZLT-UHFFFAOYSA-M", molarMass: 58.44,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5234/PNG",
    funFact: "The phrase 'worth your salt' comes from Roman times when soldiers were sometimes paid in salt."
  },
  {
    id: "mol_004", pubchemCid: 297, formula: "CH4",
    commonName: "Methane", iupacName: "Methane",
    atoms: { C: 1, H: 4 },
    description: "The simplest hydrocarbon and main component of natural gas. A potent greenhouse gas.",
    uses: ["Natural gas fuel for heating", "Electricity generation", "Rocket propellant", "Hydrogen production"],
    category: "organic", type: "hydrocarbon", rarity: "common", tier: 1,
    smiles: "C", inchiKey: "VNWKTOKETHGBQD-UHFFFAOYSA-N", molarMass: 16.043,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/297/PNG",
    funFact: "Methane is roughly 25 times more effective than CO2 at trapping heat in the atmosphere."
  },
  {
    id: "mol_005", pubchemCid: 702, formula: "C2H6O",
    commonName: "Ethanol", iupacName: "Ethan-1-ol",
    atoms: { C: 2, H: 6, O: 1 },
    description: "An organic compound and the type of alcohol found in alcoholic beverages. A volatile, flammable, colorless liquid.",
    uses: ["Alcoholic beverages", "Fuel additive (E10, E85)", "Antiseptic and disinfectant", "Solvent in perfumes and medicines"],
    category: "organic", type: "alcohol", rarity: "uncommon", tier: 2,
    smiles: "CCO", inchiKey: "LFQSCWFLJHTTHZ-UHFFFAOYSA-N", molarMass: 46.069,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/702/PNG",
    funFact: "Ethanol has been produced by humans for at least 9,000 years through fermentation."
  },
  {
    id: "mol_006", pubchemCid: 222, formula: "NH3",
    commonName: "Ammonia", iupacName: "Azane",
    atoms: { N: 1, H: 3 },
    description: "A colorless gas with a characteristic pungent smell. It is a common nitrogenous waste and a precursor to many fertilizers.",
    uses: ["Fertilizer production", "Household cleaning products", "Refrigeration", "Textile and plastics manufacturing"],
    category: "inorganic", type: "base", rarity: "uncommon", tier: 2,
    smiles: "N", inchiKey: "QGZKDVFQNNGYKY-UHFFFAOYSA-N", molarMass: 17.031,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/222/PNG",
    funFact: "The Haber-Bosch process for making ammonia feeds roughly half the world's population by enabling synthetic fertilizers."
  },
  {
    id: "mol_007", pubchemCid: 1118, formula: "H2SO4",
    commonName: "Sulfuric Acid", iupacName: "Sulfuric acid",
    atoms: { H: 2, S: 1, O: 4 },
    description: "A highly corrosive strong mineral acid. Often called 'oil of vitriol' historically. One of the most produced industrial chemicals.",
    uses: ["Fertilizer manufacturing", "Car battery electrolyte", "Ore processing and metal refining", "Chemical synthesis"],
    category: "inorganic", type: "acid", rarity: "rare", tier: 3,
    smiles: "OS(=O)(=O)O", inchiKey: "QAOWNCQODCNURD-UHFFFAOYSA-N", molarMass: 98.079,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1118/PNG",
    funFact: "Sulfuric acid production is sometimes used as an indicator of a nation's industrial strength."
  },
  {
    id: "mol_008", pubchemCid: 5793, formula: "C6H12O6",
    commonName: "Glucose", iupacName: "(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal",
    atoms: { C: 6, H: 12, O: 6 },
    description: "A simple sugar and the most abundant monosaccharide. It is the primary source of energy for living organisms.",
    uses: ["Primary energy source for cells", "Medical IV solutions", "Food sweetener", "Fermentation for biofuels"],
    category: "organic", type: "sugar", rarity: "rare", tier: 3,
    smiles: "OCC(O)C(O)C(O)C(O)C=O", inchiKey: "WQZGKKKJIJFFOK-GASJEMHNSA-N", molarMass: 180.156,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5793/PNG",
    funFact: "Your brain consumes about 120 grams of glucose per day, roughly 60% of your body's total glucose use at rest."
  },
  {
    id: "mol_009", pubchemCid: 2244, formula: "C9H8O4",
    commonName: "Aspirin", iupacName: "2-Acetoxybenzoic acid",
    atoms: { C: 9, H: 8, O: 4 },
    description: "A medication used to reduce pain, fever, or inflammation. Also used long-term at low doses to help prevent heart attacks and strokes.",
    uses: ["Pain relief (analgesic)", "Fever reduction (antipyretic)", "Anti-inflammatory treatment", "Blood clot prevention"],
    category: "organic", type: "pharmaceutical", rarity: "epic", tier: 4,
    smiles: "CC(=O)OC1=CC=CC=C1C(=O)O", inchiKey: "BSYNRYMUTXBXSQ-UHFFFAOYSA-N", molarMass: 180.158,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244/PNG",
    funFact: "Aspirin was first synthesized by Felix Hoffmann at Bayer in 1897, derived from compounds in willow bark used medicinally for thousands of years."
  },
  {
    id: "mol_010", pubchemCid: 2519, formula: "C8H10N4O2",
    commonName: "Caffeine", iupacName: "1,3,7-Trimethylpurine-2,6-dione",
    atoms: { C: 8, H: 10, N: 4, O: 2 },
    description: "A central nervous system stimulant of the methylxanthine class. The world's most widely consumed psychoactive drug.",
    uses: ["Stimulant in coffee, tea, and energy drinks", "Medication for headaches and drowsiness", "Treatment for apnea in premature infants", "Performance enhancement in athletics"],
    category: "organic", type: "alkaloid", rarity: "epic", tier: 4,
    smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", inchiKey: "RYYVLZVUVIJVGH-UHFFFAOYSA-N", molarMass: 194.194,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2519/PNG",
    funFact: "Caffeine is naturally produced by plants as a pesticide — it paralyzes and kills insects that try to feed on them."
  },
  {
    id: "mol_011", pubchemCid: 977, formula: "O2",
    commonName: "Oxygen", iupacName: "Molecular oxygen",
    atoms: { O: 2 },
    description: "A diatomic gas making up about 21% of Earth's atmosphere. It is essential for respiration in most living organisms and for combustion.",
    uses: ["Medical oxygen therapy", "Steelmaking and metal cutting", "Combustion and welding", "Life support systems"],
    category: "inorganic", type: "element", rarity: "common", tier: 1,
    smiles: "O=O", inchiKey: "MYMOFIZGZYHOMD-UHFFFAOYSA-N", molarMass: 31.998,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/977/PNG",
    funFact: "Earth's oxygen-rich air was created by photosynthetic cyanobacteria over billions of years — an event called the Great Oxidation."
  },
  {
    id: "mol_012", pubchemCid: 784, formula: "H2O2",
    commonName: "Hydrogen Peroxide", iupacName: "Hydrogen peroxide",
    atoms: { H: 2, O: 2 },
    description: "A pale blue liquid slightly more viscous than water. It is the simplest peroxide and a powerful oxidizing agent.",
    uses: ["Antiseptic and disinfectant", "Bleaching of paper and textiles", "Rocket propellant", "Wastewater treatment"],
    category: "inorganic", type: "peroxide", rarity: "uncommon", tier: 2,
    smiles: "OO", inchiKey: "MHAJPDPJQMAIIY-UHFFFAOYSA-N", molarMass: 34.014,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/784/PNG",
    funFact: "Concentrated hydrogen peroxide was used as a rocket monopropellant and even powered early experimental jetpacks."
  },
  {
    id: "mol_013", pubchemCid: 281, formula: "CO",
    commonName: "Carbon Monoxide", iupacName: "Carbon monoxide",
    atoms: { C: 1, O: 1 },
    description: "A colorless, odorless and toxic gas produced by the incomplete combustion of carbon-containing fuels.",
    uses: ["Industrial reducing agent", "Metal ore refining", "Methanol and chemical synthesis", "Component of syngas fuel"],
    category: "inorganic", type: "oxide", rarity: "uncommon", tier: 2,
    smiles: "[C-]#[O+]", inchiKey: "UGFAIRIUMAVXCW-UHFFFAOYSA-N", molarMass: 28.010,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/281/PNG",
    funFact: "Carbon monoxide is dangerous because it binds to hemoglobin about 200 times more strongly than oxygen does."
  },
  {
    id: "mol_014", pubchemCid: 313, formula: "HCl",
    commonName: "Hydrochloric Acid", iupacName: "Hydrogen chloride",
    atoms: { H: 1, Cl: 1 },
    description: "A strong acid formed when hydrogen chloride gas dissolves in water. It is also a major component of gastric acid.",
    uses: ["Steel pickling and cleaning", "pH control in industry", "Household cleaning products", "Food and additive processing"],
    category: "inorganic", type: "acid", rarity: "uncommon", tier: 2,
    smiles: "Cl", inchiKey: "VEXZGXHMUGYJMC-UHFFFAOYSA-N", molarMass: 36.458,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/313/PNG",
    funFact: "Your stomach makes hydrochloric acid strong enough to corrode metal, and rebuilds its lining every few days to avoid digesting itself."
  },
  {
    id: "mol_015", pubchemCid: 14798, formula: "NaOH",
    commonName: "Sodium Hydroxide", iupacName: "Sodium hydroxide",
    atoms: { Na: 1, O: 1, H: 1 },
    description: "A caustic white solid, also known as lye or caustic soda. It is a highly versatile and widely used strong base.",
    uses: ["Soap and detergent manufacture", "Drain and oven cleaners", "Paper and pulp production", "Food processing"],
    category: "inorganic", type: "base", rarity: "uncommon", tier: 2,
    smiles: "[OH-].[Na+]", inchiKey: "HEMHJVSKTPXQMS-UHFFFAOYSA-M", molarMass: 39.997,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14798/PNG",
    funFact: "Sodium hydroxide is used to cure olives and to give soft pretzels their distinctive shiny brown crust."
  },
  {
    id: "mol_016", pubchemCid: 241, formula: "C6H6",
    commonName: "Benzene", iupacName: "Benzene",
    atoms: { C: 6, H: 6 },
    description: "A colorless, sweet-smelling aromatic hydrocarbon. Its symmetric six-carbon ring is the archetype of aromatic chemistry.",
    uses: ["Precursor for plastics and resins", "Production of styrene and nylon", "Industrial solvent", "Gasoline component"],
    category: "organic", type: "hydrocarbon", rarity: "rare", tier: 3,
    smiles: "C1=CC=CC=C1", inchiKey: "UHOVQNZJYSORNB-UHFFFAOYSA-N", molarMass: 78.114,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/241/PNG",
    funFact: "Chemist August Kekulé said the ring structure of benzene came to him in a daydream of a snake biting its own tail."
  },
  {
    id: "mol_017", pubchemCid: 176, formula: "C2H4O2",
    commonName: "Acetic Acid", iupacName: "Acetic acid",
    atoms: { C: 2, H: 4, O: 2 },
    description: "The acid that gives vinegar its sour taste and pungent smell. It is the simplest carboxylic acid after formic acid.",
    uses: ["Vinegar and food flavoring", "Production of PET plastic", "Solvent in chemical industry", "Descaling agent"],
    category: "organic", type: "acid", rarity: "uncommon", tier: 2,
    smiles: "CC(=O)O", inchiKey: "QTBSBXVTEAMEQO-UHFFFAOYSA-N", molarMass: 60.052,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/176/PNG",
    funFact: "Pure, water-free acetic acid is called 'glacial' because it freezes into ice-like crystals just below room temperature."
  },
  {
    id: "mol_018", pubchemCid: 6334, formula: "C3H8",
    commonName: "Propane", iupacName: "Propane",
    atoms: { C: 3, H: 8 },
    description: "A three-carbon alkane, normally a gas but easily liquefied for storage and transport as liquefied petroleum gas (LPG).",
    uses: ["Barbecue and heating fuel", "Portable camping stoves", "Engine fuel (autogas)", "Refrigerant"],
    category: "organic", type: "hydrocarbon", rarity: "common", tier: 1,
    smiles: "CCC", inchiKey: "ATUOYWHBWRKTHZ-UHFFFAOYSA-N", molarMass: 44.097,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6334/PNG",
    funFact: "Propane is stored as a pressurized liquid but boils into gas at about -42 °C the instant it is released."
  },
  {
    id: "mol_019", pubchemCid: 944, formula: "HNO3",
    commonName: "Nitric Acid", iupacName: "Nitric acid",
    atoms: { H: 1, N: 1, O: 3 },
    description: "A highly corrosive strong mineral acid. Aged samples turn yellow as dissolved nitrogen oxides accumulate.",
    uses: ["Fertilizer production", "Explosives manufacturing", "Metal etching and refining", "Rocket oxidizer"],
    category: "inorganic", type: "acid", rarity: "rare", tier: 3,
    smiles: "O[N+](=O)[O-]", inchiKey: "GRYLNZFGIOXLOG-UHFFFAOYSA-N", molarMass: 63.012,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/944/PNG",
    funFact: "A mix of nitric and hydrochloric acid is called 'aqua regia' — royal water — because it can dissolve gold and platinum."
  },
  {
    id: "mol_020", pubchemCid: 1119, formula: "SO2",
    commonName: "Sulfur Dioxide", iupacName: "Sulfur dioxide",
    atoms: { S: 1, O: 2 },
    description: "A toxic gas with a sharp, irritating odor, released by volcanoes and the burning of sulfur-containing fuels.",
    uses: ["Wine and dried-fruit preservative", "Bleaching agent", "Production of sulfuric acid", "Refrigerant"],
    category: "inorganic", type: "oxide", rarity: "uncommon", tier: 2,
    smiles: "O=S=O", inchiKey: "RAHZWNYVWXNFOC-UHFFFAOYSA-N", molarMass: 64.066,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1119/PNG",
    funFact: "Sulfur dioxide lofted by large volcanic eruptions can cool the entire planet by reflecting sunlight back into space."
  }
];
