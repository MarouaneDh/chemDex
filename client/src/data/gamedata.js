/* ============================================================
   Chemdex data — molecules + atom palette
   Loaded as a plain script so the app works from file:// with
   no server and no fetch/CORS issues.
   ============================================================ */

// The draggable atoms available in the Lab. `valence` is shown as
// flavour info; matching is done purely on atom counts.
export const ATOMS = [
  { symbol: "H",  name: "Hydrogen",   number: 1,  valence: 1, color: "#e8edf2", text: "#1a1d22" },
  { symbol: "C",  name: "Carbon",     number: 6,  valence: 4, color: "#2b2f36", text: "#e8edf2" },
  { symbol: "N",  name: "Nitrogen",   number: 7,  valence: 5, color: "#4f7bd6", text: "#ffffff" },
  { symbol: "O",  name: "Oxygen",     number: 8,  valence: 6, color: "#e0524f", text: "#ffffff" },
  { symbol: "F",  name: "Fluorine",   number: 9,  valence: 7, color: "#7fd6c1", text: "#1a1d22" },
  { symbol: "Na", name: "Sodium",     number: 11, valence: 1, color: "#a06bd6", text: "#ffffff" },
  { symbol: "P",  name: "Phosphorus", number: 15, valence: 5, color: "#e08c3a", text: "#ffffff" },
  { symbol: "S",  name: "Sulfur",     number: 16, valence: 6, color: "#d6b94f", text: "#1a1d22" },
  { symbol: "Cl", name: "Chlorine",   number: 17, valence: 7, color: "#5fae5f", text: "#ffffff" },
  { symbol: "K",  name: "Potassium",  number: 19, valence: 1, color: "#c96fa7", text: "#ffffff" },
  { symbol: "Ca", name: "Calcium",    number: 20, valence: 2, color: "#cfd6dc", text: "#1a1d22" },
  { symbol: "Fe", name: "Iron",       number: 26, valence: 3, color: "#8a5a3b", text: "#ffffff" }
];

/* ---- Atom Tech Tree ----
   H/O/C/N are free starter atoms. Every other element begins locked and
   is earned through play: crossing a discovery milestone grants one
   "Choose Your Path" pick. Each atom opens a themed branch of chemistry.
   Adding a new element later = one ATOMS entry + one ATOM_BRANCHES entry. */
export const STARTER_ATOMS = ["H", "O", "C", "N"];
// total-discovery counts that grant a "Choose Your Path" pick. One
// entry per unlockable atom (12 total atoms − 4 starters = 8 picks).
export const ATOM_MILESTONES = [4, 9, 14, 22, 32, 45, 60, 80];
export const ATOM_BRANCHES = {
  Na: { en: "Metals & Bases",      fr: "Métaux & bases" },
  S:  { en: "Pungent Chemistry",   fr: "Chimie piquante" },
  Cl: { en: "Salts & Acids",       fr: "Sels & acides" },
  F:  { en: "Halogen Frontier",    fr: "Frontière halogène" },
  P:  { en: "Life's Phosphate",    fr: "Phosphates du vivant" },
  K:  { en: "Garden & Cell Salts", fr: "Sels du jardin & de la cellule" },
  Ca: { en: "Bones & Minerals",    fr: "Os & minéraux" },
  Fe: { en: "Iron Age Chemistry",  fr: "Chimie de l'âge du fer" }
};

// The molecule "Dex". Matching uses the `atoms` count map, so the
// (non-Hill) formula strings are only ever shown to the player.
export const MOLECULES = [
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
  },
  {
    id: "mol_021", pubchemCid: 783, formula: "H2",
    commonName: "Hydrogen", iupacName: "Dihydrogen",
    atoms: { H: 2 },
    description: "The simplest and lightest gas in the universe. A colorless, odorless diatomic molecule that burns explosively in air to make pure water.",
    uses: ["Rocket fuel (Space Shuttle main engines)", "Ammonia synthesis (Haber process)", "Hydrogen fuel cells for clean energy", "Hydrogenating fats in food production"],
    category: "inorganic", type: "element", rarity: "common", tier: 1,
    smiles: "[H][H]", inchiKey: "UFHFLCQGNIYNRP-UHFFFAOYSA-N", molarMass: 2.016,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/783/PNG",
    funFact: "Hydrogen makes up about 75% of all the ordinary matter in the universe — it's what stars are mostly made of."
  },
  {
    id: "mol_022", pubchemCid: 947, formula: "N2",
    commonName: "Nitrogen", iupacName: "Dinitrogen",
    atoms: { N: 2 },
    description: "The colorless, odorless gas that makes up about 78% of Earth's atmosphere. Its two atoms are held together by an unusually strong triple bond.",
    uses: ["Inert atmosphere for food packaging", "Liquid nitrogen for fast freezing", "Tire inflation in aviation", "Producing ammonia for fertilizer"],
    category: "inorganic", type: "element", rarity: "common", tier: 1,
    smiles: "N#N", inchiKey: "IJGRMHOSHXDMSA-UHFFFAOYSA-N", molarMass: 28.014,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/947/PNG",
    funFact: "The N≡N triple bond is so strong that lightning is one of the few natural forces that can break it apart — which is how plants get their nitrogen."
  },
  {
    id: "mol_023", pubchemCid: 887, formula: "CH4O",
    commonName: "Methanol", iupacName: "Methanol",
    atoms: { C: 1, H: 4, O: 1 },
    description: "The simplest alcohol — colorless, flammable, and toxic if swallowed. Once called wood alcohol because it used to be made by heating wood.",
    uses: ["Solvent in laboratories", "Antifreeze in windshield washer fluid", "Fuel for racing cars (burns clean and bright)", "Biodiesel production"],
    category: "organic", type: "alcohol", rarity: "uncommon", tier: 2,
    smiles: "CO", inchiKey: "OKKJLVBELUTLKV-UHFFFAOYSA-N", molarMass: 32.042,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/887/PNG",
    funFact: "Drinking even small amounts of methanol can cause blindness — the body converts it into formaldehyde, which damages the optic nerve."
  },
  {
    id: "mol_024", pubchemCid: 402, formula: "H2S",
    commonName: "Hydrogen Sulfide", iupacName: "Hydrogen sulfide",
    atoms: { H: 2, S: 1 },
    description: "A colorless gas with the unmistakable smell of rotten eggs. Highly toxic in large doses but produced by bacteria in swamps — and in your own gut.",
    uses: ["Production of elemental sulfur and sulfuric acid", "Heavy water production for nuclear reactors", "Identifying sulfide ores in mining", "Geothermal power by-product"],
    category: "inorganic", type: "acid", rarity: "uncommon", tier: 2,
    smiles: "S", inchiKey: "RWSOTUBLDIXVET-UHFFFAOYSA-N", molarMass: 34.08,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/402/PNG",
    funFact: "Your nose can detect hydrogen sulfide at extremely low concentrations — but if it gets strong enough to numb your sense of smell, it's dangerously close to deadly."
  },
  {
    id: "mol_025", pubchemCid: 180, formula: "C3H6O",
    commonName: "Acetone", iupacName: "Propan-2-one",
    atoms: { C: 3, H: 6, O: 1 },
    description: "A colorless, fast-evaporating organic solvent with a sweet, sharp smell. Your liver naturally produces small amounts of it.",
    uses: ["Nail polish remover", "Cleaning laboratory glassware", "Producing plastics and pharmaceuticals", "Adhesive thinner and degreaser"],
    category: "organic", type: "ketone", rarity: "uncommon", tier: 2,
    smiles: "CC(=O)C", inchiKey: "CSCPPACGZOOCGX-UHFFFAOYSA-N", molarMass: 58.08,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/180/PNG",
    funFact: "People on extreme low-carb diets sometimes smell faintly of acetone — their bodies are burning fat instead of sugar and producing ketones."
  },
  {
    id: "mol_026", pubchemCid: 516892, formula: "NaHCO3",
    commonName: "Baking Soda", iupacName: "Sodium hydrogen carbonate",
    atoms: { C: 1, H: 1, Na: 1, O: 3 },
    description: "A white crystalline powder that is both a mild base and a salt. Fizzes vigorously when it meets an acid, releasing carbon dioxide.",
    uses: ["Leavening agent in baked goods", "Antacid for indigestion", "Fire extinguisher (smothers flames with CO2)", "Mild abrasive cleaner"],
    category: "inorganic", type: "base", rarity: "uncommon", tier: 2,
    smiles: "C(=O)(O)[O-].[Na+]", inchiKey: "UIIMBOGNXHQVGW-UHFFFAOYSA-M", molarMass: 84.007,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/516892/PNG",
    funFact: "Mixing baking soda with vinegar creates the classic volcano-eruption fizz — that's CO2 gas bursting out of an acid-base reaction."
  },
  {
    id: "mol_027", pubchemCid: 712, formula: "CH2O",
    commonName: "Formaldehyde", iupacName: "Methanal",
    atoms: { C: 1, H: 2, O: 1 },
    description: "The simplest aldehyde — a pungent, water-soluble gas best known as the preservative used to store biological specimens.",
    uses: ["Embalming and preserving specimens", "Manufacturing plywood and resins", "Disinfectant in medical settings", "Producing plastics like Bakelite"],
    category: "organic", type: "aldehyde", rarity: "rare", tier: 3,
    smiles: "C=O", inchiKey: "WSFSSNUMVMOOMR-UHFFFAOYSA-N", molarMass: 30.026,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/712/PNG",
    funFact: "Astronomers have detected formaldehyde in interstellar gas clouds — one of the first complex organic molecules ever found in deep space."
  },
  {
    id: "mol_028", pubchemCid: 284, formula: "CH2O2",
    commonName: "Formic Acid", iupacName: "Methanoic acid",
    atoms: { C: 1, H: 2, O: 2 },
    description: "The simplest carboxylic acid — and the chemical responsible for the burning sting of ant bites. Its name comes from the Latin word for ant.",
    uses: ["Preserving livestock feed (silage)", "Leather tanning", "Antibacterial in poultry feed", "Runway de-icer at airports"],
    category: "organic", type: "acid", rarity: "rare", tier: 3,
    smiles: "C(=O)O", inchiKey: "BDAGIHXWWSANSR-UHFFFAOYSA-N", molarMass: 46.025,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/284/PNG",
    funFact: "Some ant species spray formic acid from their abdomens as a defense — strong enough to make an attacking lizard let go fast."
  },
  {
    id: "mol_029", pubchemCid: 6325, formula: "C2H4",
    commonName: "Ethylene", iupacName: "Ethene",
    atoms: { C: 2, H: 4 },
    description: "A colorless, sweet-smelling hydrocarbon and the simplest alkene. Plants produce it as a hormone that triggers fruit to ripen.",
    uses: ["Producing polyethylene plastic (the most common plastic on Earth)", "Ripening picked fruit in storage", "Welding fuel (oxyethylene torches)", "Making antifreeze (ethylene glycol)"],
    category: "organic", type: "hydrocarbon", rarity: "rare", tier: 3,
    smiles: "C=C", inchiKey: "VGGSQFUCUMXWEO-UHFFFAOYSA-N", molarMass: 28.054,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6325/PNG",
    funFact: "Putting a ripe banana next to other fruit speeds them up — bananas release a lot of ethylene as they ripen, telling neighbors to ripen too."
  },
  {
    id: "mol_030", pubchemCid: 750, formula: "C2H5NO2",
    commonName: "Glycine", iupacName: "2-Aminoacetic acid",
    atoms: { C: 2, H: 5, N: 1, O: 2 },
    description: "The smallest of the 20 amino acids that build every protein in your body. Slightly sweet to taste — its name comes from the Greek for sweet.",
    uses: ["Protein building block in all living things", "Sweetener and flavor enhancer in food", "Inhibitory neurotransmitter in the spinal cord", "Buffer in pharmaceuticals"],
    category: "organic", type: "acid", rarity: "epic", tier: 4,
    smiles: "C(C(=O)O)N", inchiKey: "DHMQDGOQFOQNFH-UHFFFAOYSA-N", molarMass: 75.067,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/750/PNG",
    funFact: "Glycine has been detected on comets and in interstellar dust clouds — supporting the idea that the building blocks of life could have arrived from space."
  },

  /* ============================================================
     EVERYDAY EXPANSION — commonly known molecules across kitchen,
     garden, garage and biology. A mix that builds with existing
     starter atoms and introduces the new tech-tree elements
     (F, P, K, Ca, Fe).
     ============================================================ */
  {
    id: "mol_031", pubchemCid: 24823, formula: "O3",
    commonName: "Ozone", iupacName: "Trioxygen",
    atoms: { O: 3 },
    description: "A pale-blue, sharp-smelling form of oxygen. Lifesaver in the stratosphere; lung irritant at street level.",
    uses: ["Stratospheric UV shield", "Drinking-water disinfection", "Air purification", "Industrial bleaching"],
    category: "inorganic", type: "element", rarity: "uncommon", tier: 2,
    smiles: "[O-][O+]=O", inchiKey: "CBENFWSGALASAD-UHFFFAOYSA-N", molarMass: 47.998,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24823/PNG",
    funFact: "You can smell ozone after a lightning storm — the bolt rips O₂ apart and the atoms recombine into O₃."
  },
  {
    id: "mol_032", pubchemCid: 3032552, formula: "NO2",
    commonName: "Nitrogen Dioxide", iupacName: "Nitrogen dioxide",
    atoms: { N: 1, O: 2 },
    description: "A reddish-brown gas with a biting smell, the visible part of urban smog and a major lung irritant.",
    uses: ["Indicator of combustion pollution", "Rocket-propellant oxidizer (with N2O4)", "Production of nitric acid", "Chemical synthesis intermediate"],
    category: "inorganic", type: "oxide", rarity: "uncommon", tier: 2,
    smiles: "N(=O)[O]", inchiKey: "JCXJVPUVTGWSNB-UHFFFAOYSA-N", molarMass: 46.006,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/3032552/PNG",
    funFact: "The brown haze hanging over big cities on hot summer days is mostly NO₂ from car exhaust cooking in sunlight."
  },
  {
    id: "mol_033", pubchemCid: 5988, formula: "C12H22O11",
    commonName: "Sucrose", iupacName: "α-D-Glucopyranosyl-(1→2)-β-D-fructofuranoside",
    atoms: { C: 12, H: 22, O: 11 },
    description: "Plain old table sugar — a glucose and a fructose stuck together. The sweetest thing in the average pantry.",
    uses: ["Sweetener in food and drink", "Substrate for fermentation", "Preservative in jams and syrups", "Caramelization for flavor and color"],
    category: "organic", type: "sugar", rarity: "common", tier: 1,
    smiles: "OC[C@H]1O[C@@](O[C@H]2OC(CO)[C@@H](O)[C@@H](O)[C@@H]2O)(CO)[C@@H](O)[C@@H]1O",
    inchiKey: "CZMRCDWAGMRECN-UGDNZRGBSA-N", molarMass: 342.297,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5988/PNG",
    funFact: "A single sugar cube weighs about 4 g and contains roughly 7×10²¹ sucrose molecules — more than the number of stars in the visible universe."
  },
  {
    id: "mol_034", pubchemCid: 311, formula: "C6H8O7",
    commonName: "Citric Acid", iupacName: "2-Hydroxypropane-1,2,3-tricarboxylic acid",
    atoms: { C: 6, H: 8, O: 7 },
    description: "The sour zing of lemons and limes. Also the molecular hub of every cell's energy cycle — the Krebs cycle bears its name.",
    uses: ["Sour flavor in food and soft drinks", "Cleaning agent (descaling kettles)", "Preservative in canning", "Krebs-cycle intermediate in metabolism"],
    category: "organic", type: "acid", rarity: "common", tier: 1,
    smiles: "OC(=O)CC(O)(CC(=O)O)C(=O)O",
    inchiKey: "KRKNYBCHXYNGOX-UHFFFAOYSA-N", molarMass: 192.123,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/311/PNG",
    funFact: "Citric acid was once made by squeezing actual lemons. Now most of the world's supply comes from sugar fermented by the mold Aspergillus niger."
  },
  {
    id: "mol_035", pubchemCid: 612, formula: "C3H6O3",
    commonName: "Lactic Acid", iupacName: "2-Hydroxypropanoic acid",
    atoms: { C: 3, H: 6, O: 3 },
    description: "The tang in yogurt and the burn in your muscles after a hard sprint. Made when sugars ferment without oxygen.",
    uses: ["Yogurt and sourdough fermentation", "Muscle-fatigue marker", "Biodegradable PLA plastic feedstock", "Skin-care exfoliant"],
    category: "organic", type: "acid", rarity: "uncommon", tier: 2,
    smiles: "CC(O)C(=O)O", inchiKey: "JVTAAEKCZFNVCJ-UHFFFAOYSA-N", molarMass: 90.078,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/612/PNG",
    funFact: "The old story that lactic acid causes muscle soreness is half-myth — it clears within an hour. The next-day ache comes from microscopic muscle tears."
  },
  {
    id: "mol_036", pubchemCid: 1176, formula: "CH4N2O",
    commonName: "Urea", iupacName: "Carbamide",
    atoms: { C: 1, H: 4, N: 2, O: 1 },
    description: "Mammal nitrogen waste — and the first 'organic' compound ever made from inorganic ingredients, shattering 1828's idea that living things were chemically special.",
    uses: ["Nitrogen fertilizer (world's #1)", "Moisturizer in skin creams", "Diesel exhaust fluid (AdBlue)", "Resin and adhesive production"],
    category: "organic", type: "amide", rarity: "uncommon", tier: 2,
    smiles: "NC(=O)N", inchiKey: "XSQUKJJJFZCRTK-UHFFFAOYSA-N", molarMass: 60.06,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1176/PNG",
    funFact: "Friedrich Wöhler's 1828 accidental synthesis of urea from ammonium cyanate ended 'vitalism' — the belief that life-chemistry needed a living source."
  },
  {
    id: "mol_037", pubchemCid: 753, formula: "C3H8O3",
    commonName: "Glycerol", iupacName: "Propane-1,2,3-triol",
    atoms: { C: 3, H: 8, O: 3 },
    description: "A thick, sweet, syrupy liquid that's the backbone of every fat and oil. Holds onto water like nothing else.",
    uses: ["Moisturizer in cosmetics and soaps", "Sweetener and humectant in food", "Nitroglycerin precursor", "Antifreeze and e-cigarette carrier"],
    category: "organic", type: "alcohol", rarity: "common", tier: 1,
    smiles: "OCC(O)CO", inchiKey: "PEDCQBHIVMGVHV-UHFFFAOYSA-N", molarMass: 92.094,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/753/PNG",
    funFact: "Glycerol is what makes soap-makers smile — it's the by-product of saponification, and the reason handmade soaps feel softer than industrial bars."
  },
  {
    id: "mol_038", pubchemCid: 1140, formula: "C7H8",
    commonName: "Toluene", iupacName: "Methylbenzene",
    atoms: { C: 7, H: 8 },
    description: "A clear, gasoline-smelling solvent and benzene's safer cousin. The 'T' in the explosive TNT.",
    uses: ["Paint thinner and solvent", "Octane booster in gasoline", "TNT precursor", "Synthesis of polyurethane plastics"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "Cc1ccccc1", inchiKey: "YXFVVABEGXRONW-UHFFFAOYSA-N", molarMass: 92.141,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1140/PNG",
    funFact: "Toluene was first isolated from the South American tree Myroxylon balsamum — and gets its name from the Colombian town of Tolú."
  },
  {
    id: "mol_039", pubchemCid: 3776, formula: "C3H8O",
    commonName: "Isopropyl Alcohol", iupacName: "Propan-2-ol",
    atoms: { C: 3, H: 8, O: 1 },
    description: "The clear, sharp-smelling 'rubbing alcohol' in every medicine cabinet. Kills germs by ripping holes in their lipid membranes.",
    uses: ["Skin and surface disinfectant", "Cleaning electronics", "Hand-sanitizer ingredient", "Industrial solvent"],
    category: "organic", type: "alcohol", rarity: "common", tier: 1,
    smiles: "CC(C)O", inchiKey: "KFZMGEQAYNKOFK-UHFFFAOYSA-N", molarMass: 60.096,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/3776/PNG",
    funFact: "70% isopropanol kills bacteria better than 99% — the water lets the alcohol stay in contact long enough to disrupt the cell membrane."
  },
  {
    id: "mol_040", pubchemCid: 6326, formula: "C2H2",
    commonName: "Acetylene", iupacName: "Ethyne",
    atoms: { C: 2, H: 2 },
    description: "The hottest-burning common fuel gas. Its triple bond is taut as a stretched spring — let it loose, and it burns at over 3,000 °C.",
    uses: ["Oxy-acetylene welding and cutting", "Lighting in old miners' carbide lamps", "Chemical-synthesis building block", "Ripening fruit (like ethylene)"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "C#C", inchiKey: "HSFWRNGVRCDJHI-UHFFFAOYSA-N", molarMass: 26.038,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6326/PNG",
    funFact: "Drop calcium carbide into water and you get acetylene gas instantly — that's how cavers' lamps worked for a hundred years."
  },
  {
    id: "mol_041", pubchemCid: 7843, formula: "C4H10",
    commonName: "Butane", iupacName: "Butane",
    atoms: { C: 4, H: 10 },
    description: "A four-carbon gas that liquefies under modest pressure. The fuel in pocket lighters and portable camping stoves.",
    uses: ["Cigarette-lighter fuel", "Portable camping-stove canisters", "Refrigerant (R-600)", "Aerosol propellant"],
    category: "organic", type: "hydrocarbon", rarity: "common", tier: 1,
    smiles: "CCCC", inchiKey: "IJDNQMDRQITEOD-UHFFFAOYSA-N", molarMass: 58.124,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/7843/PNG",
    funFact: "Modern fridges use isobutane instead of ozone-eating Freons — a quiet swap that fixed the hole in the ozone layer."
  },
  {
    id: "mol_042", pubchemCid: 356, formula: "C8H18",
    commonName: "Octane", iupacName: "Octane",
    atoms: { C: 8, H: 18 },
    description: "The reference fuel that gives gasoline its 'octane number'. The smoother it burns, the higher the rating.",
    uses: ["Reference for gasoline-octane rating", "Component of automotive fuel", "Aviation gasoline", "Solvent in chemistry labs"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "CCCCCCCC", inchiKey: "TVMXDCGIABBOFY-UHFFFAOYSA-N", molarMass: 114.232,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/356/PNG",
    funFact: "'93 octane' gasoline at the pump doesn't mean 93% octane — it means it knocks as little as a fuel that's 93% iso-octane and 7% n-heptane."
  },
  {
    id: "mol_043", pubchemCid: 931, formula: "C10H8",
    commonName: "Naphthalene", iupacName: "Naphthalene",
    atoms: { C: 10, H: 8 },
    description: "Two fused benzene rings — the white crystals in old-fashioned mothballs. Sublimes straight from solid to gas at room temperature.",
    uses: ["Moth and pest repellent", "Coal-tar dye precursor", "Solvent in research labs", "Building block for industrial chemicals"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "c1ccc2ccccc2c1", inchiKey: "UFWIBTONFRDIAS-UHFFFAOYSA-N", molarMass: 128.174,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/931/PNG",
    funFact: "Open a drawer of grandma's woolens and that distinctive smell IS naphthalene — molecules drifting off the mothballs and into the air."
  },
  {
    id: "mol_044", pubchemCid: 6212, formula: "CHCl3",
    commonName: "Chloroform", iupacName: "Trichloromethane",
    atoms: { C: 1, H: 1, Cl: 3 },
    description: "The sweet-smelling clear liquid of Victorian crime novels. Once used to knock out surgical patients before safer drugs arrived.",
    uses: ["Lab solvent for organic chemistry", "Refrigerant precursor (R-22)", "Pharmaceutical extraction", "NMR-spectroscopy solvent"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "ClC(Cl)Cl", inchiKey: "HEDRZPFGACZZDS-UHFFFAOYSA-N", molarMass: 119.378,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6212/PNG",
    funFact: "Queen Victoria was given chloroform for the births of her last two children in the 1850s — almost single-handedly making anesthesia respectable."
  },
  {
    id: "mol_045", pubchemCid: 3283, formula: "C4H10O",
    commonName: "Diethyl Ether", iupacName: "Ethoxyethane",
    atoms: { C: 4, H: 10, O: 1 },
    description: "The classic 'ether' of 19th-century surgery — sweet-smelling, wildly flammable, and the first widely used general anesthetic.",
    uses: ["Historic surgical anesthetic", "Lab extraction solvent", "Starter fluid for diesel engines", "Refrigeration in special applications"],
    category: "organic", type: "alcohol", rarity: "uncommon", tier: 2,
    smiles: "CCOCC", inchiKey: "RTZKZFJDLAIYFH-UHFFFAOYSA-N", molarMass: 74.123,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/3283/PNG",
    funFact: "The first public ether anesthesia, on October 16, 1846, is reenacted every year in Boston as 'Ether Day' — the date is etched into a granite memorial."
  },
  {
    id: "mol_046", pubchemCid: 767, formula: "H2CO3",
    commonName: "Carbonic Acid", iupacName: "Carbonic acid",
    atoms: { H: 2, C: 1, O: 3 },
    description: "The faint sourness of fizzy water and the chemistry behind every bubble. Forms when CO₂ dissolves in water — and decomposes the moment you open the bottle.",
    uses: ["Carbonation chemistry in beverages", "Blood pH buffering", "Cave-forming weathering of limestone", "Ocean carbon storage"],
    category: "inorganic", type: "acid", rarity: "common", tier: 1,
    smiles: "OC(=O)O", inchiKey: "BVKZGUZCCUSVTD-UHFFFAOYSA-N", molarMass: 62.025,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/767/PNG",
    funFact: "Most of the 'carbonic acid' in a soda is actually still dissolved CO₂ — fewer than 1% of the molecules ever bother forming H₂CO₃."
  },
  {
    id: "mol_047", pubchemCid: 10340, formula: "Na2CO3",
    commonName: "Washing Soda", iupacName: "Sodium carbonate",
    atoms: { Na: 2, C: 1, O: 3 },
    description: "A white powder used since ancient Egypt for soap, glass, and embalming. Old-school laundry's secret weapon for grease.",
    uses: ["Glass manufacturing", "Laundry water softener", "pH control in pools", "Tanning leather"],
    category: "inorganic", type: "base", rarity: "common", tier: 1,
    smiles: "[Na+].[Na+].[O-]C(=O)[O-]",
    inchiKey: "CDBYLPFSWZWCQE-UHFFFAOYSA-L", molarMass: 105.988,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/10340/PNG",
    funFact: "The Egyptians harvested natron — natural sodium carbonate — from dry lake beds and used it to dehydrate mummies for the afterlife."
  },
  {
    id: "mol_048", pubchemCid: 23665760, formula: "NaClO",
    commonName: "Bleach", iupacName: "Sodium hypochlorite",
    atoms: { Na: 1, Cl: 1, O: 1 },
    description: "The yellow-green liquid in every laundry-room cabinet. A powerful oxidizer that strips colors and kills microbes in seconds.",
    uses: ["Household laundry whitening", "Surface disinfection", "Pool and drinking-water treatment", "Industrial pulp bleaching"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[Na+].[O-]Cl", inchiKey: "SUKJFIGYRHOWBL-UHFFFAOYSA-N", molarMass: 74.442,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/23665760/PNG",
    funFact: "Mixing bleach with ammonia makes toxic chloramines, and with vinegar makes chlorine gas — the same gas used as a WWI weapon. Never mix cleaning products."
  },
  {
    id: "mol_049", pubchemCid: 948, formula: "N2O",
    commonName: "Nitrous Oxide", iupacName: "Dinitrogen monoxide",
    atoms: { N: 2, O: 1 },
    description: "Laughing gas — a sweet-smelling anesthetic, the propellant in whipped-cream cans, and a 300×-stronger greenhouse gas than CO₂.",
    uses: ["Dental and surgical analgesia", "Whipped-cream propellant", "Rocket and racing-car oxidizer", "Atmospheric-research tracer"],
    category: "inorganic", type: "oxide", rarity: "uncommon", tier: 2,
    smiles: "N#[N+][O-]", inchiKey: "GQPLMRYTRLFLPF-UHFFFAOYSA-N", molarMass: 44.013,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/948/PNG",
    funFact: "Joseph Priestley discovered nitrous oxide in 1772, but Humphry Davy and his friends made it famous in 1799 by inhaling it at giddy 'laughing-gas parties'."
  },
  {
    id: "mol_050", pubchemCid: 1183, formula: "C8H8O3",
    commonName: "Vanillin", iupacName: "4-Hydroxy-3-methoxybenzaldehyde",
    atoms: { C: 8, H: 8, O: 3 },
    description: "The single molecule responsible for the smell and taste of vanilla. Easier to synthesize than to grow.",
    uses: ["Vanilla flavoring in food", "Perfumes and air fresheners", "Pharmaceutical flavor masking", "Chemistry-class fragrance reference"],
    category: "organic", type: "aldehyde", rarity: "uncommon", tier: 2,
    smiles: "COc1cc(C=O)ccc1O", inchiKey: "MWOOGOJBHIARFG-UHFFFAOYSA-N", molarMass: 152.149,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1183/PNG",
    funFact: "Most 'vanilla' flavoring in cheap ice cream isn't from a vanilla bean at all — it's synthetic vanillin made from wood pulp or, increasingly, from fermented sugar."
  },
  {
    id: "mol_051", pubchemCid: 1254, formula: "C10H20O",
    commonName: "Menthol", iupacName: "(1R,2S,5R)-2-Isopropyl-5-methylcyclohexan-1-ol",
    atoms: { C: 10, H: 20, O: 1 },
    description: "The chill of peppermint — a molecule that tricks your skin's cold receptors into firing without anything actually being cold.",
    uses: ["Cough drops and chest rubs", "Flavoring in toothpaste and gum", "Topical-analgesic creams", "Aromatherapy and inhalers"],
    category: "organic", type: "alcohol", rarity: "uncommon", tier: 2,
    smiles: "CC(C)C1CCC(C)CC1O", inchiKey: "NOOLISFMXDJSKH-UTLUCORTSA-N", molarMass: 156.269,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1254/PNG",
    funFact: "Menthol hijacks the TRPM8 receptor — the same one cold weather activates. That's why a menthol cough drop feels icy even at room temperature."
  },
  {
    id: "mol_052", pubchemCid: 22311, formula: "C10H16",
    commonName: "Limonene", iupacName: "(R)-(+)-Limonene",
    atoms: { C: 10, H: 16 },
    description: "The cheerful citrus oil pressed from orange peel. So safe and so fragrant it goes into everything from cleaners to perfumes.",
    uses: ["Citrus-scented cleaners and degreasers", "Flavor and fragrance in food", "Solvent replacing harsher hydrocarbons", "Plastic-recycling solvent"],
    category: "organic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "CC(=C)C1CCC(C)=CC1", inchiKey: "XMGQYMWWDOXHJM-JTQLQIEISA-N", molarMass: 136.234,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/22311/PNG",
    funFact: "Limonene comes in two mirror-image forms — the R-version smells like oranges, the S-version smells like lemons or turpentine. Same atoms, opposite hands."
  },
  {
    id: "mol_053", pubchemCid: 637511, formula: "C9H8O",
    commonName: "Cinnamaldehyde", iupacName: "(2E)-3-Phenylprop-2-enal",
    atoms: { C: 9, H: 8, O: 1 },
    description: "The molecule of cinnamon — sweet, warm, slightly spicy. Pressed from bark, sprinkled on toast.",
    uses: ["Cinnamon flavor in food", "Mouthwash and toothpaste flavoring", "Fragrance in perfumes", "Natural insecticide and fungicide"],
    category: "organic", type: "aldehyde", rarity: "uncommon", tier: 2,
    smiles: "O=C/C=C/c1ccccc1", inchiKey: "KJPRLNWUNMBNBZ-QPJJXVBHSA-N", molarMass: 132.16,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/637511/PNG",
    funFact: "Cinnamaldehyde is roughly 90% of the oil in cinnamon bark — and a few drops are powerful enough to deter ants from invading a kitchen."
  },
  {
    id: "mol_054", pubchemCid: 5429, formula: "C7H8N4O2",
    commonName: "Theobromine", iupacName: "3,7-Dimethyl-1H-purine-2,6-dione",
    atoms: { C: 7, H: 8, N: 4, O: 2 },
    description: "Caffeine's gentler cousin — the buzz in chocolate. Slower-acting than caffeine, and famously toxic to dogs.",
    uses: ["Natural component of cocoa and chocolate", "Mild stimulant and diuretic", "Veterinary cautionary case", "Asthma research"],
    category: "organic", type: "alkaloid", rarity: "rare", tier: 3,
    smiles: "Cn1cnc2c1c(=O)[nH]c(=O)n2C",
    inchiKey: "YAPQBXQYLJRXSA-UHFFFAOYSA-N", molarMass: 180.164,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5429/PNG",
    funFact: "Dogs metabolize theobromine roughly 6× slower than humans — that's why a few squares of dark chocolate can be a serious vet emergency."
  },
  {
    id: "mol_055", pubchemCid: 89594, formula: "C10H14N2",
    commonName: "Nicotine", iupacName: "(S)-3-(1-Methylpyrrolidin-2-yl)pyridine",
    atoms: { C: 10, H: 14, N: 2 },
    description: "The compound that hooks smokers — fast, fierce, and one of the most powerful natural insecticides ever discovered.",
    uses: ["Active drug in tobacco and vapes", "Nicotine-replacement patches and gum", "Historic insecticide (banned in most uses)", "Neuroscience research tool"],
    category: "organic", type: "alkaloid", rarity: "rare", tier: 3,
    smiles: "CN1CCC[C@H]1c1cccnc1", inchiKey: "SNICXCGAKADSCV-JTQLQIEISA-N", molarMass: 162.236,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/89594/PNG",
    funFact: "A drop of pure nicotine on the skin can be fatal — tobacco plants evolved it to paralyze and kill the insects that try to chew their leaves."
  },
  {
    id: "mol_056", pubchemCid: 681, formula: "C8H11NO2",
    commonName: "Dopamine", iupacName: "4-(2-Aminoethyl)benzene-1,2-diol",
    atoms: { C: 8, H: 11, N: 1, O: 2 },
    description: "The brain's 'wanting' molecule — the spark of motivation, reward, and movement. Parkinson's disease is what happens when the cells that make it die.",
    uses: ["Reward and motivation signaling", "Movement control (lost in Parkinson's)", "Heart-rate support in critical care (IV)", "Neuroscience research"],
    category: "organic", type: "alkaloid", rarity: "epic", tier: 4,
    smiles: "NCCc1ccc(O)c(O)c1", inchiKey: "VYFYYTLLBUKUHU-UHFFFAOYSA-N", molarMass: 153.181,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/681/PNG",
    funFact: "Dopamine doesn't cross the blood-brain barrier — so for Parkinson's, doctors give L-DOPA, the precursor, which the brain converts into dopamine on arrival."
  },
  {
    id: "mol_057", pubchemCid: 5202, formula: "C10H12N2O",
    commonName: "Serotonin", iupacName: "3-(2-Aminoethyl)-1H-indol-5-ol",
    atoms: { C: 10, H: 12, N: 2, O: 1 },
    description: "The mood-and-gut molecule. About 90% of your serotonin lives in your intestines, not your brain.",
    uses: ["Mood, sleep, and appetite regulation", "Target of SSRIs and antidepressants", "Gut-motility signaling", "Platelet function in clotting"],
    category: "organic", type: "alkaloid", rarity: "epic", tier: 4,
    smiles: "NCCc1c[nH]c2cc(O)ccc12", inchiKey: "QZAYGJVTTNCVMB-UHFFFAOYSA-N", molarMass: 176.219,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5202/PNG",
    funFact: "Serotonin is named for what it does to blood vessels: 'sero-tonin' = serum + tone. The mood-lifting role was discovered later."
  },
  {
    id: "mol_058", pubchemCid: 5816, formula: "C9H13NO3",
    commonName: "Adrenaline", iupacName: "(R)-4-(1-Hydroxy-2-(methylamino)ethyl)benzene-1,2-diol",
    atoms: { C: 9, H: 13, N: 1, O: 3 },
    description: "The fight-or-flight hormone. Pulse hammers, pupils widen, airways open — all in seconds, all because of this one molecule.",
    uses: ["EpiPen for anaphylactic shock", "Cardiac-arrest emergency drug", "Local-anesthetic vasoconstrictor", "Asthma rescue inhalers (historic)"],
    category: "organic", type: "alkaloid", rarity: "epic", tier: 4,
    smiles: "CNC[C@@H](O)c1ccc(O)c(O)c1", inchiKey: "UCTWMZQNUQWSLP-VIFPVBQESA-N", molarMass: 183.207,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5816/PNG",
    funFact: "An EpiPen jab into the thigh delivers adrenaline in seconds — for someone in anaphylaxis it's the difference between making it to hospital and not."
  },
  {
    id: "mol_059", pubchemCid: 5997, formula: "C27H46O",
    commonName: "Cholesterol", iupacName: "Cholest-5-en-3β-ol",
    atoms: { C: 27, H: 46, O: 1 },
    description: "The waxy steroid your body can't live without — it stiffens cell membranes and seeds every steroid hormone. Too much in your blood, though, clogs arteries.",
    uses: ["Cell-membrane stiffening", "Precursor to steroid hormones (estrogen, testosterone)", "Bile acid production", "Vitamin D synthesis precursor"],
    category: "organic", type: "alcohol", rarity: "rare", tier: 3,
    smiles: "C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C",
    inchiKey: "HVYWMOMLDIMFJA-DPAQBDIFSA-N", molarMass: 386.654,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5997/PNG",
    funFact: "Your liver makes about 80% of your blood cholesterol — diet contributes far less than 1980s public-health ads suggested."
  },
  {
    id: "mol_060", pubchemCid: 1548943, formula: "C18H27NO3",
    commonName: "Capsaicin", iupacName: "(E)-N-(4-Hydroxy-3-methoxybenzyl)-8-methylnon-6-enamide",
    atoms: { C: 18, H: 27, N: 1, O: 3 },
    description: "The molecule that makes chili peppers burn. It binds to the same receptor that detects scalding heat — tricking your tongue without raising the temperature.",
    uses: ["Defining the Scoville scale of pepper heat", "Topical pain-relief creams (arthritis)", "Pepper-spray active ingredient", "Pest deterrent for squirrels"],
    category: "organic", type: "alkaloid", rarity: "rare", tier: 3,
    smiles: "COc1cc(CNC(=O)CCCC/C=C/C(C)C)ccc1O",
    inchiKey: "YKPUWZUDDOIDPM-SOFGYWHQSA-N", molarMass: 305.418,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1548943/PNG",
    funFact: "Birds don't feel capsaicin's burn — chilies evolved their heat specifically to push mammals away while letting birds spread the seeds."
  },
  {
    id: "mol_061", pubchemCid: 1004, formula: "H3PO4",
    commonName: "Phosphoric Acid", iupacName: "Phosphoric acid",
    atoms: { H: 3, P: 1, O: 4 },
    description: "A clear syrupy acid that gives cola its bite and fertilizer its phosphate punch. Every soda you've ever sipped owes part of its tang to this molecule.",
    uses: ["Acidulant in soft drinks (cola tang)", "Rust converter for metalwork", "Fertilizer feedstock", "Etching agent for dentistry"],
    category: "inorganic", type: "acid", rarity: "common", tier: 1,
    smiles: "OP(=O)(O)O", inchiKey: "NBIIXXVUZAFLBC-UHFFFAOYSA-N", molarMass: 97.994,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1004/PNG",
    funFact: "About 90% of the world's phosphoric acid goes straight into fertilizer — without it, you couldn't feed half the planet."
  },
  {
    id: "mol_062", pubchemCid: 123286, formula: "P4",
    commonName: "White Phosphorus", iupacName: "Tetraphosphorus",
    atoms: { P: 4 },
    description: "Soft, waxy, and so reactive it glows in air and spontaneously catches fire. Stored under water for safety.",
    uses: ["Incendiary munitions (controversial)", "Production of phosphoric acid", "Match-head chemistry (now red phosphorus)", "Smoke screens"],
    category: "inorganic", type: "element", rarity: "rare", tier: 3,
    smiles: "P12P3P1P23", inchiKey: "OAICVXFJPJFONN-UHFFFAOYSA-N", molarMass: 123.895,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/123286/PNG",
    funFact: "Phosphorus was discovered by an alchemist boiling down 50 buckets of urine, looking for gold — instead he got a glowing, terrifying new element."
  },
  {
    id: "mol_063", pubchemCid: 14812, formula: "P2O5",
    commonName: "Phosphorus Pentoxide", iupacName: "Diphosphorus pentoxide",
    atoms: { P: 2, O: 5 },
    description: "A snow-white powder that snatches water out of literally anything — including the skin off your fingers if you touch it.",
    uses: ["World's most aggressive desiccant", "Dehydrating agent in chemical synthesis", "Phosphoric-acid production", "Glass and optical manufacturing"],
    category: "inorganic", type: "oxide", rarity: "rare", tier: 3,
    smiles: "O=P12OP3(=O)OP(=O)(O1)OP(=O)(O2)O3",
    inchiKey: "DLYUQMMRRRQYAE-UHFFFAOYSA-N", molarMass: 141.944,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14812/PNG",
    funFact: "Phosphorus pentoxide is so hungry for water it can pull H₂O out of sulfuric acid — turning H₂SO₄ into SO₃."
  },
  {
    id: "mol_064", pubchemCid: 4873, formula: "KCl",
    commonName: "Potassium Chloride", iupacName: "Potassium chloride",
    atoms: { K: 1, Cl: 1 },
    description: "The 'salt substitute' that tastes salty without the sodium. Essential to your cells; also the third drug in lethal injections.",
    uses: ["Low-sodium table-salt substitute", "Cardiac and IV electrolyte replacement", "Fertilizer ('potash')", "Heart-stopping drug in lethal injection"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[K+].[Cl-]", inchiKey: "WCUXLLCKKVVCTB-UHFFFAOYSA-M", molarMass: 74.551,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/4873/PNG",
    funFact: "Potassium chloride tastes 'sort of salty plus a little metallic' — which is why low-sodium salts mix it with table salt instead of replacing it outright."
  },
  {
    id: "mol_065", pubchemCid: 14797, formula: "KOH",
    commonName: "Potassium Hydroxide", iupacName: "Potassium hydroxide",
    atoms: { K: 1, O: 1, H: 1 },
    description: "Caustic potash — a strong base used to make soft (liquid) soaps, and the electrolyte inside alkaline batteries.",
    uses: ["Liquid-soap manufacture", "Alkaline-battery electrolyte", "Biodiesel production", "Lab pH titration standard"],
    category: "inorganic", type: "base", rarity: "uncommon", tier: 2,
    smiles: "[K+].[OH-]", inchiKey: "KWYUFKZDYYNOTN-UHFFFAOYSA-M", molarMass: 56.106,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14797/PNG",
    funFact: "Bar soap is sodium-based; liquid soap is potassium-based — KOH makes a softer salt of fatty acids that stays pourable."
  },
  {
    id: "mol_066", pubchemCid: 24434, formula: "KNO3",
    commonName: "Saltpeter", iupacName: "Potassium nitrate",
    atoms: { K: 1, N: 1, O: 3 },
    description: "The white crystal that turned medieval Europe upside down — the oxidizer in gunpowder. Also cures bacon and feeds fields.",
    uses: ["Gunpowder oxidizer (75% of black powder)", "Solid-rocket propellant component", "Bacon and salami curing", "Stump-removal product"],
    category: "inorganic", type: "salt", rarity: "uncommon", tier: 2,
    smiles: "[K+].[O-][N+]([O-])=O", inchiKey: "FGIUAXJPYTZDNR-UHFFFAOYSA-N", molarMass: 101.103,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24434/PNG",
    funFact: "Medieval saltpeter farmers harvested it from soaked piles of manure and urine — a stinky business that nonetheless decided the fate of empires."
  },
  {
    id: "mol_067", pubchemCid: 10112, formula: "CaCO3",
    commonName: "Calcium Carbonate", iupacName: "Calcium carbonate",
    atoms: { Ca: 1, C: 1, O: 3 },
    description: "Chalk, limestone, marble, eggshells, seashells, and the white inside a Tums tablet — all the same molecule.",
    uses: ["Chalkboards and antacids", "Cement and limestone construction", "Calcium dietary supplement", "Paper and paint filler"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[Ca+2].[O-]C(=O)[O-]", inchiKey: "VTYYLEPIZMXCLO-UHFFFAOYSA-L", molarMass: 100.087,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/10112/PNG",
    funFact: "The White Cliffs of Dover are 100 million years of microscopic algae skeletons — pure calcium carbonate, piled hundreds of meters thick."
  },
  {
    id: "mol_068", pubchemCid: 14778, formula: "CaO",
    commonName: "Quicklime", iupacName: "Calcium oxide",
    atoms: { Ca: 1, O: 1 },
    description: "What you get when you burn limestone — a hungry white solid that hisses and steams when it meets water.",
    uses: ["Cement and mortar production", "Steelmaking flux", "Soil pH correction in farming", "Water and sewage treatment"],
    category: "inorganic", type: "oxide", rarity: "uncommon", tier: 2,
    smiles: "[O-2].[Ca+2]", inchiKey: "ODINCKMPIJJUCX-UHFFFAOYSA-N", molarMass: 56.077,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14778/PNG",
    funFact: "Quicklime + water releases enough heat to boil eggs — self-heating military rations use the same reaction to warm a meal in 10 minutes."
  },
  {
    id: "mol_069", pubchemCid: 14777, formula: "Ca(OH)2",
    commonName: "Slaked Lime", iupacName: "Calcium hydroxide",
    atoms: { Ca: 1, O: 2, H: 2 },
    description: "Mix quicklime with water and you get this — a chalky base used for everything from mortar to corn tortillas.",
    uses: ["Mortar and plaster", "Tortilla nixtamalization (Mexican cuisine)", "Sewage and water treatment", "Skin-care depilatory creams"],
    category: "inorganic", type: "base", rarity: "uncommon", tier: 2,
    smiles: "[OH-].[OH-].[Ca+2]", inchiKey: "AXCZMVOFGPJBDE-UHFFFAOYSA-L", molarMass: 74.093,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14777/PNG",
    funFact: "Mesoamericans soaked corn in slaked-lime water 3,500 years ago — without realizing it, they were unlocking niacin and preventing the pellagra epidemics that hit Europe."
  },
  {
    id: "mol_070", pubchemCid: 5284359, formula: "CaCl2",
    commonName: "Calcium Chloride", iupacName: "Calcium chloride",
    atoms: { Ca: 1, Cl: 2 },
    description: "The white pellets thrown on icy sidewalks — and the desiccant that keeps your jerky packets dry.",
    uses: ["De-icing roads and sidewalks", "Dust control on dirt roads", "Sports-drink electrolyte", "Food firming agent (tofu, pickles)"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[Cl-].[Cl-].[Ca+2]", inchiKey: "UXVMQQNJUSDDNG-UHFFFAOYSA-L", molarMass: 110.984,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5284359/PNG",
    funFact: "Calcium chloride drops the melting point of ice down to about -29 °C — much further than table salt, which is why airports use it."
  },
  {
    id: "mol_071", pubchemCid: 24497, formula: "CaSO4",
    commonName: "Gypsum", iupacName: "Calcium sulfate",
    atoms: { Ca: 1, S: 1, O: 4 },
    description: "The soft mineral inside every wall in your house. Powdered, baked, and rehydrated, it sets in minutes — plaster of Paris.",
    uses: ["Drywall and plasterboard", "Plaster casts for broken bones", "Cement set-time regulator", "Tofu coagulant"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[Ca+2].[O-]S(=O)(=O)[O-]", inchiKey: "OSGAYBCDTDRGGQ-UHFFFAOYSA-L", molarMass: 136.139,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24497/PNG",
    funFact: "'Plaster of Paris' is named for Montmartre, where huge gypsum deposits were mined to plaster Parisian walls for centuries."
  },
  {
    id: "mol_072", pubchemCid: 24617, formula: "CaF2",
    commonName: "Fluorite", iupacName: "Calcium fluoride",
    atoms: { Ca: 1, F: 2 },
    description: "Glassy crystals that fluoresce under UV — and gave the phenomenon its name. Industry's main source of fluorine.",
    uses: ["Source of all industrial fluorine", "UV-transparent optical lenses", "Steelmaking flux", "Hydrofluoric-acid feedstock"],
    category: "inorganic", type: "salt", rarity: "uncommon", tier: 2,
    smiles: "[F-].[F-].[Ca+2]", inchiKey: "WUKWITHWXAAZEY-UHFFFAOYSA-L", molarMass: 78.075,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24617/PNG",
    funFact: "The word 'fluorescence' was coined in 1852 for the eerie blue glow of fluorite crystals under UV light — the mineral named the phenomenon."
  },
  {
    id: "mol_073", pubchemCid: 518696, formula: "Fe2O3",
    commonName: "Rust", iupacName: "Iron(III) oxide",
    atoms: { Fe: 2, O: 3 },
    description: "The red-brown crumble that eats cars and bridges — iron returning to the mineral form it came from.",
    uses: ["Red pigment (rouge, paint, makeup)", "Magnetic-tape and disk coating (γ-form)", "Iron-ore source", "Thermite reaction (with aluminum)"],
    category: "inorganic", type: "oxide", rarity: "common", tier: 1,
    smiles: "O=[Fe]O[Fe]=O", inchiKey: "JEIPFZHSYJVQDO-UHFFFAOYSA-N", molarMass: 159.687,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/518696/PNG",
    funFact: "Mars looks red because its entire surface is dusted with iron oxide — the same chemistry that ruins a forgotten bicycle in your back yard."
  },
  {
    id: "mol_074", pubchemCid: 14788, formula: "FeS2",
    commonName: "Pyrite", iupacName: "Iron(II) disulfide",
    atoms: { Fe: 1, S: 2 },
    description: "Fool's gold — brassy yellow cubes that fooled prospectors for centuries. Strikes sparks if you smack it against steel.",
    uses: ["Sulfuric-acid production (historic)", "Sulfur source for industry", "Lithium-battery cathode", "Specimen jewelry and decoration"],
    category: "inorganic", type: "salt", rarity: "uncommon", tier: 2,
    smiles: "S=[Fe]=S", inchiKey: "NIFLFHGRMQKJDM-UHFFFAOYSA-N", molarMass: 119.975,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14788/PNG",
    funFact: "Many California gold-rush 'gold' samples were actually pyrite — fool's gold. Real gold is soft enough to dent with a fingernail; pyrite isn't."
  },
  {
    id: "mol_075", pubchemCid: 24380, formula: "FeCl3",
    commonName: "Iron(III) Chloride", iupacName: "Iron(III) chloride",
    atoms: { Fe: 1, Cl: 3 },
    description: "Black crystals that turn yellow-brown in water. Photoengravers etch circuit boards with it; water plants use it to clean sewage.",
    uses: ["Etching copper PCB circuit boards", "Sewage and drinking-water flocculant", "Synthetic-chemistry catalyst", "Wood preservation"],
    category: "inorganic", type: "salt", rarity: "uncommon", tier: 2,
    smiles: "Cl[Fe](Cl)Cl", inchiKey: "RBTARNINKXHZNM-UHFFFAOYSA-K", molarMass: 162.204,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24380/PNG",
    funFact: "DIY electronics hobbyists eat through copper boards with ferric chloride to make their own circuits — the same chemistry that's used industrially worldwide."
  },
  {
    id: "mol_076", pubchemCid: 14917, formula: "HF",
    commonName: "Hydrofluoric Acid", iupacName: "Hydrogen fluoride",
    atoms: { H: 1, F: 1 },
    description: "A weak acid by pH — but the only one that can eat through glass. Sneaks through skin and goes straight for the bones.",
    uses: ["Etching glass and silicon chips", "Cleaning stainless-steel parts", "Fluorocarbon synthesis (refrigerants, Teflon)", "Oil-refinery alkylation"],
    category: "inorganic", type: "acid", rarity: "rare", tier: 3,
    smiles: "F", inchiKey: "KRHYYFGTRYWZRS-UHFFFAOYSA-N", molarMass: 20.006,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14917/PNG",
    funFact: "HF burns can feel painless at first, then attack the calcium in your bones hours later — antidote tubes of calcium gluconate gel live in every silicon-fab medical kit."
  },
  {
    id: "mol_077", pubchemCid: 5235, formula: "NaF",
    commonName: "Sodium Fluoride", iupacName: "Sodium fluoride",
    atoms: { Na: 1, F: 1 },
    description: "The fluoride in your toothpaste — and in most public water supplies. Hardens tooth enamel against acid.",
    uses: ["Toothpaste cavity-fighter", "Public-water fluoridation", "Steel-pickling additive", "Pesticide (historical)"],
    category: "inorganic", type: "salt", rarity: "common", tier: 1,
    smiles: "[F-].[Na+]", inchiKey: "PUZPDOWCWNUUKD-UHFFFAOYSA-M", molarMass: 41.988,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5235/PNG",
    funFact: "Adding ~1 ppm fluoride to drinking water was named by the CDC as one of the ten greatest public-health achievements of the 20th century."
  },
  {
    id: "mol_078", pubchemCid: 17358, formula: "SF6",
    commonName: "Sulfur Hexafluoride", iupacName: "Sulfur hexafluoride",
    atoms: { S: 1, F: 6 },
    description: "A heavy, inert gas — five times denser than air. Inhale a little and your voice drops to a comic basso profundo.",
    uses: ["Electrical-grid insulator in switchgear", "Magnesium smelting cover gas", "Reference greenhouse gas in climate science", "Voice-changing party trick"],
    category: "inorganic", type: "element", rarity: "rare", tier: 3,
    smiles: "FS(F)(F)(F)(F)F", inchiKey: "SFZCNBIFKDRMGX-UHFFFAOYSA-N", molarMass: 146.055,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/17358/PNG",
    funFact: "SF₆ is 23,500× more potent than CO₂ as a greenhouse gas — a single leak from a power substation can equal years of car emissions."
  },
  {
    id: "mol_079", pubchemCid: 24524, formula: "F2",
    commonName: "Fluorine", iupacName: "Difluorine",
    atoms: { F: 2 },
    description: "A pale-yellow gas, the most reactive element on the periodic table. It will burn water, glass, even concrete.",
    uses: ["Uranium enrichment (UF6 process)", "Fluorocarbon plastic production", "Industrial pharmaceutical synthesis", "Rocket-oxidizer research"],
    category: "inorganic", type: "element", rarity: "rare", tier: 3,
    smiles: "FF", inchiKey: "PXGOKWXKJXAPGV-UHFFFAOYSA-N", molarMass: 37.997,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24524/PNG",
    funFact: "Several 19th-century chemists died trying to isolate fluorine. Henri Moissan finally cracked it in 1886 — and won a Nobel Prize for the feat."
  },
  {
    id: "mol_080", pubchemCid: 6392, formula: "CF4",
    commonName: "Tetrafluoromethane", iupacName: "Carbon tetrafluoride",
    atoms: { C: 1, F: 4 },
    description: "The fluorine version of methane — completely non-flammable, almost completely inert, and a refrigerant for ultra-cold systems.",
    uses: ["Plasma-etching of silicon chips", "Low-temperature refrigerant (R-14)", "Electronics-industry cleaning gas", "Atmospheric-chemistry tracer"],
    category: "inorganic", type: "hydrocarbon", rarity: "uncommon", tier: 2,
    smiles: "FC(F)(F)F", inchiKey: "TXEYQDLBPFQVAA-UHFFFAOYSA-N", molarMass: 88.004,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6392/PNG",
    funFact: "CF₄ persists in the atmosphere for over 50,000 years — once you release it, it's not going anywhere on a human timescale."
  },

  /* ============================================================
     THE MYTH VAULT — fictional substances from pop culture and
     historical scientific dead-ends. Discoverable by combinations
     real chemistry doesn't allow (large clusters of one element,
     impossible salts). Every card flips to an Origin panel.
     ============================================================ */
  {
    id: "mol_myth_001", pubchemCid: null, formula: "Na6",
    commonName: "Kryptonite", iupacName: "Hexasodium glow-crystal",
    atoms: { Na: 6 },
    description: "A fluorescent green crystal radiating an unknown alpha frequency. Said to weaken visitors from a faraway dying star — but on our workbench it just glows.",
    uses: ["Disabling super-powered visitors", "A reliable plot device since 1943", "Cosplay prop centerpiece", "Glow-in-the-dark Halloween rock"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-KRYPTONITE-0000-X", molarMass: 137.94,
    structureImage: null,
    funFact: "Kryptonite first appeared in a 1943 Superman radio drama — the writers needed a plot device so the voice actor could take a vacation."
  },
  {
    id: "mol_myth_002", pubchemCid: null, formula: "C13",
    commonName: "Adamantium", iupacName: "Tridecacarbon untameable",
    atoms: { C: 13 },
    description: "A virtually indestructible alloy of dense carbon clusters. Real hard alloys exist — none are unbreakable, but a kid can dream.",
    uses: ["Skeletal reinforcement", "Claws of legend", "Comic-book MacGuffin", "Sci-fi armor plating"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-ADAMANTIUM-000-X", molarMass: 156.13,
    structureImage: null,
    funFact: "In Wolverine's 1974 debut his claws were bone — adamantium was bonded onto his skeleton later, retconning him into the metal claw character we know."
  },
  {
    id: "mol_myth_003", pubchemCid: null, formula: "NaSCl",
    commonName: "Mithril", iupacName: "Sodium-sulfur-chloride filigree",
    atoms: { Na: 1, S: 1, Cl: 1 },
    description: "A silvery, feather-light metal stronger than steel — a single chainmail shirt of it could turn a cave troll's spear.",
    uses: ["Chainmail for hobbits", "Elven jewelry", "Fantasy-game ore drop", "Forging legendary blades"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-MITHRIL-00000-X", molarMass: 94.51,
    structureImage: null,
    funFact: "Tolkien coined 'mithril' from his invented Sindarin language — it roughly means 'grey-glitter'."
  },
  {
    id: "mol_myth_004", pubchemCid: null, formula: "C4Na4",
    commonName: "Vibranium", iupacName: "Tetrasodium tetracarbide",
    atoms: { Na: 4, C: 4 },
    description: "A meteor-borne metal that drinks kinetic energy and re-emits it as vibration. The signature ore of a hidden African nation.",
    uses: ["Energy-dampening shields", "Sound-proofing fictional cities", "Heroic vibrations", "Marvel box-office returns"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-VIBRANIUM-0000-X", molarMass: 139.99,
    structureImage: null,
    funFact: "Vibranium debuted in Daredevil #13 (1966), three years before Wakanda's first comic appearance — the metal predates the country it now defines."
  },
  {
    id: "mol_myth_005", pubchemCid: null, formula: "★Un★",
    commonName: "Unobtanium", iupacName: "All-element wishstone",
    atoms: { H: 1, C: 1, N: 1, O: 1, Na: 1, S: 1, Cl: 1 },
    description: "A room-temperature superconductor with negative mass and a perfect lattice. Engineers have wanted this since the 1950s. Still waiting.",
    uses: ["Floating cities", "Anti-gravity engines", "Plot resolution", "Holy grail of materials science"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-UNOBTANIUM-000-X", molarMass: 142.86,
    structureImage: null,
    funFact: "'Unobtainium' was 1950s engineering slang for any material the team wished existed. James Cameron leaned into the joke for Avatar (2009)."
  },
  {
    id: "mol_myth_006", pubchemCid: null, formula: "Na2",
    commonName: "Dilithium", iupacName: "Disodium warp-lattice",
    atoms: { Na: 2 },
    description: "A crystalline matrix that regulates a matter–antimatter reaction in a warp drive. Cracked dilithium leaves a starship dead in the water.",
    uses: ["Warp-core regulation", "Faster-than-light travel", "Star Trek bottle episodes", "Trade currency in the Klingon Empire"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-DILITHIUM-0000-X", molarMass: 45.98,
    structureImage: null,
    funFact: "Real dilithium (Li₂) exists as a fleeting two-atom gas — Star Trek borrowed the name purely for its sci-fi ring."
  },
  {
    id: "mol_myth_007", pubchemCid: null, formula: "C3S6",
    commonName: "Tiberium", iupacName: "Trisulfur tricarbon spire",
    atoms: { S: 6, C: 3 },
    description: "An alien crystalline weed that grows by converting whatever it touches into more of itself. Beautiful, lucrative, and deeply unwise to harvest barehanded.",
    uses: ["Powering tiberium-age weaponry", "Strategy-game resource", "Atmospheric contamination", "Slow-motion world-ending"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-TIBERIUM-00000-X", molarMass: 228.41,
    structureImage: null,
    funFact: "Westwood Studios named tiberium after the Roman emperor Tiberius — they wanted something sci-fi-Latin to anchor the whole Command & Conquer universe."
  },
  {
    id: "mol_myth_008", pubchemCid: null, formula: "Na5",
    commonName: "Naquadah", iupacName: "Pentasodium gate-ore",
    atoms: { Na: 5 },
    description: "An incredibly dense superconducting ore — the structural material of every Stargate. Worth fighting over.",
    uses: ["Building Stargates", "Reactor fuel for advanced civilizations", "Black-market currency", "Plot fuel for ten seasons of TV"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-NAQUADAH-00000-X", molarMass: 114.95,
    structureImage: null,
    funFact: "Naquadah was invented mid-Stargate-SG-1's first season to retroactively explain why Stargates have such immense mass — the writers needed an excuse."
  },
  {
    id: "mol_myth_009", pubchemCid: null, formula: "N5O5",
    commonName: "Element Zero", iupacName: "Pentanitrogen pentoxide (eezo)",
    atoms: { N: 5, O: 5 },
    description: "A glittery blue dust that, when current is passed through it, bends the mass of nearby objects. The whole Mass Effect universe runs on it.",
    uses: ["Faster-than-light starships", "Biotic powers", "Mini black-hole party tricks", "Galactic economies"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-EEZO-000000000-X", molarMass: 150.04,
    structureImage: null,
    funFact: "Mass Effect's writers picked 'element zero' to evoke an undiscovered slot in the periodic table — atomic number 0 isn't real chemistry, but it sounds plausible."
  },
  {
    id: "mol_myth_010", pubchemCid: null, formula: "H5O2",
    commonName: "Phlogiston", iupacName: "The fire substance",
    atoms: { H: 5, O: 2 },
    description: "The 'fire element' that 17th-century chemists believed flowed out of anything that burned. A perfectly respectable theory in 1700 — and a textbook example of being wrong.",
    uses: ["Explaining combustion (badly)", "Pre-Lavoisier chemistry textbooks", "A reminder that science self-corrects", "Steampunk world-building"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-PHLOGISTON-000-X", molarMass: 37.04,
    structureImage: null,
    funFact: "Phlogiston theory ruled chemistry for over a century until Lavoisier's 1777 discovery of oxygen burned it down — literally rewriting what combustion meant."
  },

  /* ----- Myth Vault — wave 2 ----- */
  {
    id: "mol_myth_011", pubchemCid: null, formula: "CO8",
    commonName: "Carbonite", iupacName: "Octoxide carbon block",
    atoms: { C: 1, O: 8 },
    description: "A super-cooled metal alloy that flash-freezes a smuggler in mid-pose. Survives space transit, looks great mounted on a Hutt's wall.",
    uses: ["Encasing bounty-hunter trophies", "Deep-space cargo preservation", "Intimidating wall art", "Jabba's home decor"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-CARBONITE-0000-X", molarMass: 140.01,
    structureImage: null,
    funFact: "Real 'carbonite' is a real calcium-carbide-based explosive — Star Wars picked the name purely for its alien-tech ring."
  },
  {
    id: "mol_myth_012", pubchemCid: null, formula: "H9",
    commonName: "Cavorite", iupacName: "Nonatomic hydrogen lift",
    atoms: { H: 9 },
    description: "A pale powder that screens objects from gravity. Pop a cavorite blind in your window and your Victorian house starts climbing toward the Moon.",
    uses: ["Antigravity boats to the Moon", "Lifting Victorian gentlemen", "Steampunk levitation rigs", "Suspect physics demonstrations"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-CAVORITE-00000-X", molarMass: 9.07,
    structureImage: null,
    funFact: "H.G. Wells's The First Men in the Moon (1901) predates Einstein's general relativity by 14 years — cavorite was respectable hard sci-fi at the time."
  },
  {
    id: "mol_myth_013", pubchemCid: null, formula: "C5H5N5O5",
    commonName: "Aether", iupacName: "Pentacosmic quintessence",
    atoms: { H: 5, C: 5, N: 5, O: 5 },
    description: "The mythic fifth element that ancient cosmologies believed filled the heavens beyond air, earth, water, and fire. Banished from physics by Michelson and Morley in 1887.",
    uses: ["Filling the celestial spheres", "Carrying light through the vacuum (incorrectly)", "Anchoring medieval cosmology", "Modern New Age branding"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-AETHER-000000000-X", molarMass: 215.21,
    structureImage: null,
    funFact: "The 1887 Michelson–Morley experiment famously found no evidence for a luminiferous aether — opening the door to special relativity 18 years later."
  },
  {
    id: "mol_myth_014", pubchemCid: null, formula: "Na7O",
    commonName: "Felix Felicis", iupacName: "Heptasodium luck dram",
    atoms: { Na: 7, O: 1 },
    description: "A potion of liquid gold that grants the drinker a perfect day. Brewed over six months in a cauldron of patience, and very firmly banned from school exams.",
    uses: ["Bottling luck", "Narratively contrived victories", "Terrible decisions, executed perfectly", "School-exam contraband"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-FELIXFELICIS-0-X", molarMass: 177.05,
    structureImage: null,
    funFact: "J.K. Rowling has joked that if Felix Felicis existed in the real world, 'we'd all be drinking it.' The potion debuts in Half-Blood Prince (2005)."
  },
  {
    id: "mol_myth_015", pubchemCid: null, formula: "C7S7",
    commonName: "Materia", iupacName: "Carbon-sulfur lifestream gem",
    atoms: { C: 7, S: 7 },
    description: "A crystallized condensate of a planet's lifestream. Slot a green orb into a sword to cast Fire; slot one into a body, and you crack the world.",
    uses: ["Magic spells, socketed into weapons", "Jewelry-grade gemstone", "World-ending plot device", "Mako reactor exhaust"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-MATERIA-000000-X", molarMass: 308.49,
    structureImage: null,
    funFact: "Materia was Final Fantasy VII's elegant fix to the series' classic spell-grinding problem — you customize a character's whole magic loadout by socketing gems."
  },
  {
    id: "mol_myth_016", pubchemCid: null, formula: "C11H11",
    commonName: "Melange", iupacName: "Undecacarbon undecahydride (spice)",
    atoms: { C: 11, H: 11 },
    description: "A cinnamon-tinted addictive substance harvested from sandworm secretions. Stains the eyes blue, expands consciousness, and folds space for Guild Navigators.",
    uses: ["Faster-than-light navigation", "Prescient visions", "Interstellar economic chokehold", "Life-extension at any cost"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-MELANGE-000000-X", molarMass: 143.21,
    structureImage: null,
    funFact: "Frank Herbert based Dune's spice on real-world oil dependency — written in 1965 during a Middle East oil boom he saw as eerily prophetic."
  },
  {
    id: "mol_myth_017", pubchemCid: null, formula: "C3Na3S3",
    commonName: "Orichalcum", iupacName: "Tricarbon trisodium trisulfide",
    atoms: { C: 3, Na: 3, S: 3 },
    description: "The mythical gold-copper alloy that gilded the temples of Atlantis. Possibly real and lost; possibly never real and Plato was simply spinning a beautiful story.",
    uses: ["Atlantean temple cladding", "Final Fantasy crafting material", "Video-game currency", "Archaeology mysteries"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-ORICHALCUM-0000-X", molarMass: 201.13,
    structureImage: null,
    funFact: "In 2015, divers off Sicily recovered 39 ingots of a copper-zinc-lead alloy from a 600 BC shipwreck — some classicists argue this was real 'orichalcum.'"
  },
  {
    id: "mol_myth_018", pubchemCid: null, formula: "C11",
    commonName: "Carbonadium", iupacName: "Undecacarbon irradiated alloy",
    atoms: { C: 11 },
    description: "A radioactive cousin of adamantium — slightly less indestructible, slightly more carcinogenic. Used when a storyline needs Wolverine to actually struggle.",
    uses: ["Bonding metal to characters who heal too well", "Plot device for nerfing Wolverine", "Low-budget adamantium", "Comic-book hand-waving"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-CARBONADIUM-000-X", molarMass: 132.13,
    structureImage: null,
    funFact: "Carbonadium debuted in X-Men #4 (1991) as the substance keeping Omega Red's tentacles flexible — Marvel needed something exactly less amazing than adamantium."
  },
  {
    id: "mol_myth_019", pubchemCid: null, formula: "C9Na9",
    commonName: "Inertron", iupacName: "Nonacarbon nonasodium hide",
    atoms: { C: 9, Na: 9 },
    description: "A 25th-century alloy that is utterly impenetrable and weightless. Wraps spacecraft, soldiers' armor, and the floating city of Niagara.",
    uses: ["Spaceship hulls in the year 2419", "Body armor for everyone", "Lifting platforms for entire cities", "Comic-strip world-building"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-INERTRON-00000-X", molarMass: 315.07,
    structureImage: null,
    funFact: "Inertron predates adamantium by 40 years — Philip Francis Nowlan invented it for Buck Rogers's first appearance in 1928."
  },
  {
    id: "mol_myth_020", pubchemCid: null, formula: "H8O8",
    commonName: "Lazarus Pit", iupacName: "Octahydrogen octoxide elixir",
    atoms: { H: 8, O: 8 },
    description: "A bubbling green fluid in a stone basin that resurrects the dead and reverses aging — at the cost of a moment of madness for each dunk.",
    uses: ["Resurrecting Ra's al Ghul (repeatedly)", "Dramatic comeback storylines", "Regrettable cosmetics", "Gotham villain spa days"],
    category: "myth", type: "fictional", rarity: "epic", tier: 5,
    smiles: null, inchiKey: "FICTIONAL-LAZARUSPIT-000-X", molarMass: 136.10,
    structureImage: null,
    funFact: "Lazarus Pits debuted in Batman #232 (1971). Ra's al Ghul has been resurrected so many times across DC continuity that the writers semi-officially rationed him to once a year."
  },

  /* ============================================================
     THE FORBIDDEN SHELF — real compounds, real danger.
     Sealed behind a blast door until the player taps the Leak.
     Recipes are "cursed": Combine returns no match until breach.
     Educational picks (WWI gases, Nobel-era explosives, classic
     poisons) — the same chemistry a teenager meets in history class.
     ============================================================ */
  {
    id: "mol_forbidden_001", pubchemCid: 768, formula: "HCN",
    commonName: "Hydrogen Cyanide", iupacName: "Formonitrile",
    atoms: { H: 1, C: 1, N: 1 },
    description: "A faint-almond-scented gas that blocks cells from using oxygen. Lethal in minutes at concentrations smaller than a dust particle.",
    uses: ["Industrial mining solvent (gold extraction)", "Industrial fumigation, historically", "Chemical warfare, banned 1925", "Forensic toxicology reference"],
    category: "forbidden", type: "toxin", rarity: "epic", tier: 6,
    smiles: "C#N", inchiKey: "LELOWRISYMNNSU-UHFFFAOYSA-N", molarMass: 27.03,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/768/PNG",
    safety: {
      en: "Lethal at parts per million. Only ever handled in sealed fume hoods.",
      fr: "Mortel à quelques parties par million. Ne se manipule qu'en sorbonne scellée."
    },
    funFact: "Roughly 5% of people genetically can't smell hydrogen cyanide at all — a chilling quirk of olfactory genetics."
  },
  {
    id: "mol_forbidden_002", pubchemCid: 9321, formula: "N2H4",
    commonName: "Hydrazine", iupacName: "Diazane",
    atoms: { H: 4, N: 2 },
    description: "An oily, ammonia-stinking liquid that ignites on contact with the right metals. Powerful rocket propellant — and a slow carcinogen even in trace exposure.",
    uses: ["Spacecraft attitude-control thrusters", "Boiler-water oxygen scavenger", "Pharmaceutical precursor", "Foaming agent in some plastics"],
    category: "forbidden", type: "toxin", rarity: "epic", tier: 6,
    smiles: "NN", inchiKey: "OAKJQQAXSVQMHS-UHFFFAOYSA-N", molarMass: 32.05,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/9321/PNG",
    safety: {
      en: "Carcinogenic and explosive. Handled only in full PPE and inert atmospheres.",
      fr: "Cancérogène et explosif. Manipulé en EPI complet, sous atmosphère inerte."
    },
    funFact: "Apollo's lunar module ran on hydrazine — a single tank let it land on the Moon AND lift off again."
  },
  {
    id: "mol_forbidden_003", pubchemCid: 6375, formula: "CH3NO2",
    commonName: "Nitromethane", iupacName: "Nitromethane",
    atoms: { C: 1, H: 3, N: 1, O: 2 },
    description: "A clear, sweet-smelling liquid burned in drag-racing engines and machined into shaped charges. Detonates if confined and hit.",
    uses: ["Top-fuel drag-racing", "Industrial solvent", "Mining and demolition charges", "Model-engine fuel"],
    category: "forbidden", type: "explosive", rarity: "epic", tier: 6,
    smiles: "C[N+](=O)[O-]", inchiKey: "LYGJENNIWJXYER-UHFFFAOYSA-N", molarMass: 61.04,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6375/PNG",
    safety: {
      en: "Stable in storage; explosive under shock or strong base contamination.",
      fr: "Stable au stockage ; explosif sous choc ou en contact avec une base forte."
    },
    funFact: "The 1995 Oklahoma City bombing used a nitromethane–fertilizer mix. After it, the U.S. tightened bulk-purchase reporting on both compounds."
  },
  {
    id: "mol_forbidden_004", pubchemCid: 24526, formula: "Cl2",
    commonName: "Chlorine Gas", iupacName: "Dichlorine",
    atoms: { Cl: 2 },
    description: "A yellow-green choking gas that, in your lungs, becomes hydrochloric acid. First weapon of mass destruction released on the WWI Western Front.",
    uses: ["Municipal water disinfection", "PVC plastic manufacture", "Industrial bleaching", "Chemical warfare, Ypres 1915"],
    category: "forbidden", type: "choking", rarity: "epic", tier: 6,
    smiles: "ClCl", inchiKey: "KZBUYRJDOAKODT-UHFFFAOYSA-N", molarMass: 70.91,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/24526/PNG",
    safety: {
      en: "Heavier than air — pools in trenches and basements. Even dilute exposure burns lungs.",
      fr: "Plus lourd que l'air — s'accumule dans tranchées et caves. Même dilué, il brûle les poumons."
    },
    funFact: "Trace chlorine in tap water (~1 ppm) keeps a billion people from waterborne disease — the same molecule that killed at Ypres saves more lives than almost any other."
  },
  {
    id: "mol_forbidden_005", pubchemCid: 6371, formula: "COCl2",
    commonName: "Phosgene", iupacName: "Carbonyl dichloride",
    atoms: { C: 1, O: 1, Cl: 2 },
    description: "A colorless gas that smells faintly of fresh-cut hay — and dissolves lung tissue hours after a single breath. Responsible for ~80% of WWI gas deaths.",
    uses: ["Polycarbonate-plastic manufacture", "Pharmaceutical synthesis", "Pesticide intermediate", "Chemical warfare, WWI"],
    category: "forbidden", type: "choking", rarity: "epic", tier: 6,
    smiles: "O=C(Cl)Cl", inchiKey: "YGYAWVDWMABLBF-UHFFFAOYSA-N", molarMass: 98.92,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6371/PNG",
    safety: {
      en: "Delayed-action: symptoms hit hours after exposure. Even tiny leaks demand immediate evacuation.",
      fr: "Action retardée : symptômes des heures plus tard. La moindre fuite impose l'évacuation."
    },
    funFact: "Still produced industrially today — at over a million tons a year — almost entirely to make polycarbonate plastics like the lens in your eyeglasses."
  },
  {
    id: "mol_forbidden_006", pubchemCid: 8376, formula: "C7H5N3O6",
    commonName: "TNT", iupacName: "2,4,6-Trinitrotoluene",
    atoms: { C: 7, H: 5, N: 3, O: 6 },
    description: "Pale yellow crystals that look like sugar and detonate on demand — but won't go off if you drop, burn, or shoot them. Stable enough to be standard military explosive for over a century.",
    uses: ["Standard military explosive", "Mining demolitions", "Energy unit (1 ton TNT ≈ 4.18 GJ)", "Shock-wave research"],
    category: "forbidden", type: "explosive", rarity: "epic", tier: 6,
    smiles: "Cc1c(cc(cc1[N+](=O)[O-])[N+](=O)[O-])[N+](=O)[O-]",
    inchiKey: "SPSSULHKWOKEEL-UHFFFAOYSA-N", molarMass: 227.13,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/8376/PNG",
    safety: {
      en: "Surprisingly safe to handle — but a detonator turns 1 kg into a measured 4.18 megajoules.",
      fr: "Étonnamment manipulable — mais 1 kg vaut 4,18 mégajoules sous détonateur."
    },
    funFact: "Atomic-bomb yields are measured in 'kilotons of TNT' precisely because TNT's energy per kilogram is so well-characterized (4.184 megajoules)."
  },
  {
    id: "mol_forbidden_007", pubchemCid: 4510, formula: "C3H5N3O9",
    commonName: "Nitroglycerin", iupacName: "1,2,3-Propanetriyl trinitrate",
    atoms: { C: 3, H: 5, N: 3, O: 9 },
    description: "An oily clear liquid so unstable a sneeze used to set it off — until Alfred Nobel mixed it into dynamite. Today it's a prescription heart medicine.",
    uses: ["Dynamite (Nobel's 1867 patent)", "Heart-attack vasodilator", "Demolition charges", "Smokeless gunpowder"],
    category: "forbidden", type: "explosive", rarity: "epic", tier: 6,
    smiles: "C(C(CO[N+](=O)[O-])O[N+](=O)[O-])O[N+](=O)[O-]",
    inchiKey: "SNIOPGDIGTZGOP-UHFFFAOYSA-N", molarMass: 227.09,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/4510/PNG",
    safety: {
      en: "Shock-sensitive when pure. Diluted into kieselguhr it becomes dynamite — and angina patients carry diluted tablets in their pocket.",
      fr: "Sensible aux chocs à l'état pur. Diluée dans la silice elle devient dynamite — et les patients cardiaques en ont des comprimés en poche."
    },
    funFact: "The same molecule that killed Nobel's brother also funded the Nobel Prize — Alfred set up the prize after a French paper mistakenly published his obituary as 'the merchant of death'."
  },
  {
    id: "mol_forbidden_008", pubchemCid: 6954, formula: "C6H3N3O7",
    commonName: "Picric Acid", iupacName: "2,4,6-Trinitrophenol",
    atoms: { C: 6, H: 3, N: 3, O: 7 },
    description: "Bright yellow crystals once used to dye silk — until chemists realized they were also a more powerful explosive than TNT. Now an old-lab nightmare: dry, aged picric acid is shock-sensitive enough to detonate on touch.",
    uses: ["Yellow textile dye (now banned)", "WWI artillery shells", "Antiseptic for burns, historically", "Hazardous-waste case study"],
    category: "forbidden", type: "explosive", rarity: "epic", tier: 6,
    smiles: "c1c(cc(c(c1[N+](=O)[O-])O)[N+](=O)[O-])[N+](=O)[O-]",
    inchiKey: "OXNIZHLAWKMVMX-UHFFFAOYSA-N", molarMass: 229.10,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6954/PNG",
    safety: {
      en: "Wet and stable, dry and lethal. Every chemistry teacher has heard the story of the bomb-squad call from a forgotten high-school stockroom.",
      fr: "Humide : stable. Sec : mortel. Toute prof de chimie connaît l'histoire du démineur appelé pour un lycée."
    },
    funFact: "France's WWI shells were stuffed with picric acid (codenamed 'mélinite'). When the Halifax explosion of 1917 went off, it briefly held the record for the largest non-nuclear blast in history."
  },
  {
    id: "mol_forbidden_009", pubchemCid: 10461, formula: "C4H8Cl2S",
    commonName: "Mustard Gas", iupacName: "Bis(2-chloroethyl) sulfide",
    atoms: { C: 4, H: 8, Cl: 2, S: 1 },
    description: "An oily yellow-brown liquid that blisters skin, blinds eyes, and burns lungs on contact. The chemical weapon that defined 'chemical weapon' — and still leaks from a hundred-year-old Belgian and French farm fields.",
    uses: ["Chemical warfare (banned, Geneva Protocol 1925)", "Reluctant cancer-drug ancestor (mechlorethamine)", "Decontamination training", "Cautionary history"],
    category: "forbidden", type: "choking", rarity: "epic", tier: 6,
    smiles: "C(CCl)SCCCl", inchiKey: "QKSKPIVNLNLAAV-UHFFFAOYSA-N", molarMass: 159.08,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/10461/PNG",
    safety: {
      en: "Persistent in soil for decades. Belgian farmers still occasionally unearth WWI shells leaking it.",
      fr: "Persistant dans le sol pendant des décennies. Les fermiers belges déterrent encore parfois des obus qui en fuient."
    },
    funFact: "Studying mustard-gas victims in WWI led to the first modern chemotherapy — the same DNA-damaging mechanism that killed soldiers also stops cancer cells from dividing."
  },
  {
    id: "mol_forbidden_010", pubchemCid: 8929, formula: "NaCN",
    commonName: "Sodium Cyanide", iupacName: "Sodium cyanide",
    atoms: { Na: 1, C: 1, N: 1 },
    description: "A white powder used to extract gold from rock — and the classic mystery-novel poison. A pinch is fatal within minutes.",
    uses: ["Gold mining (cyanide-leach process)", "Electroplating", "Industrial fumigation", "Forensic toxicology reference"],
    category: "forbidden", type: "toxin", rarity: "epic", tier: 6,
    smiles: "[C-]#N.[Na+]", inchiKey: "MNWBNISUBARLIT-UHFFFAOYSA-N", molarMass: 49.01,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/8929/PNG",
    safety: {
      en: "Reacts with weak acid (even stomach acid) to release hydrogen cyanide gas.",
      fr: "Réagit avec un acide faible (même celui de l'estomac) pour libérer du cyanure d'hydrogène."
    },
    funFact: "Modern gold mining produces about 90% of the world's gold via dilute sodium-cyanide leach — a tightly regulated industry with strict tailings rules after several historic dam failures."
  },

  /* ============================================================
     THE VITAMIN FAMILY — real, friendly chemistry your body needs
     every day. The wholesome counterweight to the Forbidden Shelf:
     a warm-glowing wing with a Found-in-Your-Fridge food list, and
     a Vitamin D3 sunlight easter egg that asks the player to step
     outdoors (real ambient-light sensor, honor-system fallback).
     ============================================================ */
  {
    id: "mol_vit_001", pubchemCid: 54670067, formula: "C6H8O6",
    commonName: "Vitamin C", iupacName: "L-Ascorbic acid",
    atoms: { C: 6, H: 8, O: 6 },
    description: "The molecule that prevents scurvy. Your body can't make it — every gram has to come from your diet.",
    uses: ["Collagen synthesis", "Iron absorption from plant foods", "Antioxidant in cells", "Curing scurvy in sailors since 1747"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "OCC(O)C1OC(=O)C(O)=C1O",
    inchiKey: "CIWBSHSKHKDKBQ-JLAZNSOCSA-N", molarMass: 176.12,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/54670067/PNG",
    foundIn: {
      en: ["Oranges & citrus", "Bell peppers", "Strawberries", "Broccoli", "Kiwi"],
      fr: ["Oranges & agrumes", "Poivrons", "Fraises", "Brocoli", "Kiwi"]
    },
    funFact: "Humans, guinea pigs, and most monkeys are among the rare mammals that CAN'T make Vitamin C — we have a broken gene for the final enzyme. Scurvy is the price of that mutation."
  },
  {
    id: "mol_vit_002", pubchemCid: 5280795, formula: "C27H44O",
    commonName: "Vitamin D3", iupacName: "Cholecalciferol",
    atoms: { C: 27, H: 44, O: 1 },
    description: "The 'sunshine vitamin' — your skin literally photosynthesizes it when UVB hits a cholesterol precursor. Take this card outdoors to activate it.",
    uses: ["Calcium absorption", "Bone density", "Immune-cell signaling", "Mood regulation in northern winters"],
    category: "vitamin", type: "fat-soluble", rarity: "epic", tier: 4,
    sunlightSpecial: true,
    smiles: "CC(C)CCCC(C)C1CCC2C1(CCCC2=CC=C3CC(CCC3=C)O)C",
    inchiKey: "QYSXJUFSXHHAJI-XFEUOLMDSA-N", molarMass: 384.64,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5280795/PNG",
    foundIn: {
      en: ["Direct sunlight on skin", "Fatty fish (salmon, sardines)", "Egg yolks", "Fortified milk", "Cod liver oil"],
      fr: ["Lumière directe sur la peau", "Poissons gras (saumon, sardines)", "Jaunes d'œuf", "Lait enrichi", "Huile de foie de morue"]
    },
    funFact: "Your skin's 7-dehydrocholesterol catches UVB photons and rearranges itself into Vitamin D₃ — one of the only photochemical reactions humans run on themselves."
  },
  {
    id: "mol_vit_003", pubchemCid: 445354, formula: "C20H30O",
    commonName: "Vitamin A", iupacName: "all-trans-Retinol",
    atoms: { C: 20, H: 30, O: 1 },
    description: "The night-vision vitamin. Your retina converts it into retinal — the molecule that physically changes shape when a photon hits it, letting you see.",
    uses: ["Low-light vision (retinal pigment)", "Skin and mucous-membrane health", "Immune cells", "Embryonic development"],
    category: "vitamin", type: "fat-soluble", rarity: "rare", tier: 4,
    smiles: "CC1=C(C(CCC1)(C)C)C=CC(=CC=CC(=CCO)C)C",
    inchiKey: "FPIPGXGPPPQFEQ-OVSJKPMPSA-N", molarMass: 286.45,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/445354/PNG",
    foundIn: {
      en: ["Liver", "Egg yolks", "Dairy fat", "Carrots & sweet potatoes (as β-carotene)", "Dark leafy greens"],
      fr: ["Foie", "Jaunes d'œuf", "Matière grasse laitière", "Carottes & patates douces (β-carotène)", "Légumes-feuilles sombres"]
    },
    funFact: "WWII Britain told the public that RAF pilots' night-vision came from eating carrots — actually a cover story to hide their new radar. Carrots really do help with night vision; just not enough to spot a Heinkel."
  },
  {
    id: "mol_vit_004", pubchemCid: 14985, formula: "C29H50O2",
    commonName: "Vitamin E", iupacName: "α-Tocopherol",
    atoms: { C: 29, H: 50, O: 2 },
    description: "Your fat-storage antioxidant. It sits inside cell membranes and intercepts free-radical chains before they shred the lipid bilayer.",
    uses: ["Membrane antioxidant", "Skincare formulations", "Prevention of polyunsaturated-fat rancidity", "Cardiovascular research"],
    category: "vitamin", type: "fat-soluble", rarity: "rare", tier: 4,
    smiles: "CC1=C(C2=C(CCC(O2)(C)CCCC(C)CCCC(C)CCCC(C)C)C(=C1O)C)C",
    inchiKey: "GVJHHUAWPYXKBD-IEOSBIPESA-N", molarMass: 430.71,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/14985/PNG",
    foundIn: {
      en: ["Almonds & sunflower seeds", "Vegetable oils", "Avocado", "Spinach & swiss chard", "Wheat germ"],
      fr: ["Amandes & graines de tournesol", "Huiles végétales", "Avocat", "Épinards & bettes", "Germes de blé"]
    },
    funFact: "Eight different chemical forms of Vitamin E exist; α-tocopherol is the one your liver preferentially keeps. The others get exported back out in bile within hours."
  },
  {
    id: "mol_vit_005", pubchemCid: 6037, formula: "C19H19N7O6",
    commonName: "Folic Acid", iupacName: "Folate (Vitamin B9)",
    atoms: { C: 19, H: 19, N: 7, O: 6 },
    description: "The build-new-cells vitamin. Especially critical in the first weeks of pregnancy — neural-tube defects drop sharply when expectant mothers have enough.",
    uses: ["DNA synthesis & repair", "Red-blood-cell production", "Neural-tube development", "Prevention of megaloblastic anemia"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "C1=CC(=CC=C1C(=O)NC(CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N",
    inchiKey: "OVBPIULPVIDEAO-LBPRGKRZSA-N", molarMass: 441.40,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/6037/PNG",
    foundIn: {
      en: ["Dark leafy greens (spinach, kale)", "Beans & lentils", "Asparagus", "Citrus fruit", "Fortified breads & cereals"],
      fr: ["Légumes-feuilles sombres (épinards, chou kale)", "Haricots & lentilles", "Asperges", "Agrumes", "Pains & céréales enrichis"]
    },
    funFact: "'Folate' comes from foliage — first isolated from spinach in 1941. The US flour-fortification program (1998) cut neural-tube birth defects by roughly 30% nationwide within a few years."
  },
  {
    id: "mol_vit_006", pubchemCid: 1054, formula: "C8H11NO3",
    commonName: "Vitamin B6", iupacName: "Pyridoxine",
    atoms: { C: 8, H: 11, N: 1, O: 3 },
    description: "Your amino-acid Swiss Army knife. B6 (as pyridoxal phosphate) is the cofactor for more than 140 enzymes — almost every reaction that moves a nitrogen.",
    uses: ["Amino-acid metabolism", "Neurotransmitter synthesis (serotonin, dopamine)", "Hemoglobin production", "Glycogen breakdown"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "CC1=NC=C(C(=C1O)CO)CO",
    inchiKey: "LXNHXLLTXMVWPM-UHFFFAOYSA-N", molarMass: 169.18,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1054/PNG",
    foundIn: {
      en: ["Poultry & fish", "Potatoes & sweet potatoes", "Bananas", "Chickpeas", "Fortified cereals"],
      fr: ["Volaille & poisson", "Pommes de terre & patates douces", "Bananes", "Pois chiches", "Céréales enrichies"]
    },
    funFact: "B6 holds the record for the most enzyme reactions of any single vitamin cofactor — over 140 known. Most of them shuffle the amino-group between proteins and energy intermediates."
  },
  {
    id: "mol_vit_007", pubchemCid: 5284607, formula: "C31H46O2",
    commonName: "Vitamin K1", iupacName: "Phylloquinone",
    atoms: { C: 31, H: 46, O: 2 },
    description: "The blood-clotting vitamin — without it, even a small cut would not stop. Made by plants in their chloroplasts.",
    uses: ["Activates clotting factors (II, VII, IX, X)", "Bone-mineralization signaling", "Antidote for warfarin overdose", "Newborn injection at birth"],
    category: "vitamin", type: "fat-soluble", rarity: "rare", tier: 4,
    smiles: "CC1=C(C(=O)c2ccccc2C1=O)CC=C(C)CCCC(C)CCCC(C)CCCC(C)C",
    inchiKey: "MBWXNTAXLNYFJB-NKFFZRIASA-N", molarMass: 450.70,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/5284607/PNG",
    foundIn: {
      en: ["Kale & spinach", "Broccoli & Brussels sprouts", "Parsley & basil", "Green tea leaves", "Soybean oil"],
      fr: ["Chou kale & épinards", "Brocoli & choux de Bruxelles", "Persil & basilic", "Feuilles de thé vert", "Huile de soja"]
    },
    funFact: "The K stands for 'Koagulation' — Danish biochemist Henrik Dam named it in 1929 after noticing chicks on fat-free diets bled to death. He shared the 1943 Nobel Prize for the discovery."
  },
  {
    id: "mol_vit_008", pubchemCid: 493570, formula: "C17H20N4O6",
    commonName: "Riboflavin", iupacName: "Vitamin B2",
    atoms: { C: 17, H: 20, N: 4, O: 6 },
    description: "The bright neon-yellow vitamin. Your body uses it to build FAD and FMN — the energy-shuttle cofactors at the center of every breath you take.",
    uses: ["Energy metabolism (FAD/FMN cofactors)", "Red-blood-cell maintenance", "Eye and skin health", "Bright yellow food coloring (E101)"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "Cc1cc2nc3c(=O)[nH]c(=O)n(c3n(c2cc1C)CC(O)C(O)C(O)CO)",
    inchiKey: "AUNGANRZJHBGPY-SCRDCRAPSA-N", molarMass: 376.36,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/493570/PNG",
    foundIn: {
      en: ["Milk & yogurt", "Eggs", "Almonds", "Lean beef", "Mushrooms"],
      fr: ["Lait & yaourt", "Œufs", "Amandes", "Bœuf maigre", "Champignons"]
    },
    funFact: "Riboflavin is the bright yellow in your multivitamin — and the reason your pee turns electric-yellow afterwards. Your body excretes whatever it can't immediately use."
  },
  {
    id: "mol_vit_009", pubchemCid: 938, formula: "C6H5NO2",
    commonName: "Niacin", iupacName: "Nicotinic acid (Vitamin B3)",
    atoms: { C: 6, H: 5, N: 1, O: 2 },
    description: "Your NAD/NADP factory. Niacin builds the cofactors that carry the high-energy electrons your mitochondria burn — basically the wire of cellular respiration.",
    uses: ["NAD+/NADP+ cofactor synthesis", "Cholesterol-lowering high-dose therapy", "Skin-flushing 'niacin flush'", "Bread flour fortification"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "c1cc(cnc1)C(=O)O",
    inchiKey: "PVNIIMVLHYAWGP-UHFFFAOYSA-N", molarMass: 123.11,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/938/PNG",
    foundIn: {
      en: ["Tuna & salmon", "Chicken & turkey", "Peanuts", "Brown rice", "Mushrooms"],
      fr: ["Thon & saumon", "Poulet & dinde", "Cacahuètes", "Riz complet", "Champignons"]
    },
    funFact: "Niacin deficiency causes pellagra — the historic 'four D's': dermatitis, diarrhea, dementia, death. Eradicated in the US in the 1940s by fortifying bread flour with niacin."
  },
  {
    id: "mol_vit_010", pubchemCid: 171548, formula: "C10H16N2O3S",
    commonName: "Biotin", iupacName: "Vitamin B7",
    atoms: { C: 10, H: 16, N: 2, O: 3, S: 1 },
    description: "The hair-and-nails vitamin — though more importantly, your body's CO₂ carrier in fatty-acid and amino-acid metabolism.",
    uses: ["Fatty-acid synthesis cofactor", "Gluconeogenesis", "Skin, hair, and nail health (popular supplement)", "Lab tagging via the biotin-streptavidin bond"],
    category: "vitamin", type: "water-soluble", rarity: "rare", tier: 4,
    smiles: "C1[C@H]2[C@@H]([C@@H](S1)CCCCC(=O)O)NC(=O)N2",
    inchiKey: "YBJHBAHKTGYVGT-ZKWXMUAHSA-N", molarMass: 244.31,
    structureImage: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/171548/PNG",
    foundIn: {
      en: ["Egg yolks (cooked)", "Almonds & walnuts", "Sweet potatoes", "Salmon", "Sunflower seeds"],
      fr: ["Jaunes d'œuf (cuits)", "Amandes & noix", "Patates douces", "Saumon", "Graines de tournesol"]
    },
    funFact: "Raw egg whites BLOCK biotin absorption — they contain avidin, which binds biotin so tightly it's used in molecular biology as one of the strongest non-covalent bonds known. Cook the eggs."
  }
];

/* The Origin Card — for each myth molecule, where the fiction comes
   from and a line on the real science it riffs on. Shown in the modal
   under a "FICTIONAL" banner so kids can tell fiction from chemistry. */
export const MOL_ORIGIN = {
  mol_myth_001: {
    source: { en: "Superman radio drama (1943)", fr: "Feuilleton radio Superman (1943)" },
    scienceNote: {
      en: "Riffs on real radioactive minerals. Uranium ore can fluoresce green under UV — but it doesn't, alas, weaken aliens.",
      fr: "Inspiré de vrais minéraux radioactifs. Le minerai d'uranium fluoresce en vert sous UV — mais il n'affaiblit aucun alien."
    }
  },
  mol_myth_002: {
    source: { en: "Avengers #66 (Marvel, 1969)", fr: "Avengers #66 (Marvel, 1969)" },
    scienceNote: {
      en: "Named after 'adamant' from Greek myth — 'untameable'. Real hard alloys exist (osmium, tungsten carbide), but nothing is indestructible.",
      fr: "Du mot grec « adamas » — « indomptable ». De vrais alliages très durs existent (osmium, carbure de tungstène), mais rien n'est indestructible."
    }
  },
  mol_myth_003: {
    source: { en: "The Lord of the Rings — J.R.R. Tolkien (1954)", fr: "Le Seigneur des Anneaux — J.R.R. Tolkien (1954)" },
    scienceNote: {
      en: "Tolkien imagined a silver-like metal stronger than steel and feather-light. Real titanium is the closest match — silver-grey, light, and tough.",
      fr: "Tolkien imaginait un métal argenté plus solide que l'acier et léger comme une plume. Le titane est le plus proche dans la vraie chimie."
    }
  },
  mol_myth_004: {
    source: { en: "Daredevil #13 (Marvel, 1966)", fr: "Daredevil #13 (Marvel, 1966)" },
    scienceNote: {
      en: "An energy-absorbing metal. Real metamaterials can absorb specific wavelengths, but no real solid drinks impact force the way vibranium does.",
      fr: "Un métal qui absorbe l'énergie. Les vrais métamatériaux absorbent certaines longueurs d'onde, mais aucun solide ne boit les chocs comme le vibranium."
    }
  },
  mol_myth_005: {
    source: { en: "Sci-fi engineering slang, popularised by Avatar (2009)", fr: "Argot d'ingénieur, popularisé par Avatar (2009)" },
    scienceNote: {
      en: "Engineers used 'unobtainium' as a wink for any material the team wished existed. Real room-temperature superconductors remain materials science's holy grail.",
      fr: "Mot-clin d'œil des ingénieurs pour tout matériau dont on rêve. Les vrais supraconducteurs à température ambiante restent le Graal de la science des matériaux."
    }
  },
  mol_myth_006: {
    source: { en: "Star Trek (1967)", fr: "Star Trek (1967)" },
    scienceNote: {
      en: "Real dilithium (Li₂) is a real two-atom gas-phase molecule — fleeting and unspectacular. Star Trek borrowed the name for its sci-fi ring.",
      fr: "Le vrai dilithium (Li₂) est une molécule gazeuse de deux atomes — fugace et banale. Star Trek a emprunté le nom pour sa sonorité futuriste."
    }
  },
  mol_myth_007: {
    source: { en: "Command & Conquer (Westwood Studios, 1995)", fr: "Command & Conquer (Westwood Studios, 1995)" },
    scienceNote: {
      en: "A crystalline 'lifeform' that converts matter to more of itself. Real crystals grow in lattices — but they don't eat tanks.",
      fr: "Un cristal « vivant » qui transforme la matière en lui-même. Les vrais cristaux poussent en réseau — mais ne dévorent pas les blindés."
    }
  },
  mol_myth_008: {
    source: { en: "Stargate SG-1 (1997)", fr: "Stargate SG-1 (1997)" },
    scienceNote: {
      en: "A super-dense ore. Real osmium is the densest stable element on Earth — but it doesn't unlock wormholes, sorry.",
      fr: "Un minerai super-dense. L'osmium est l'élément stable le plus dense sur Terre — mais il n'ouvre aucun trou de ver, désolé."
    }
  },
  mol_myth_009: {
    source: { en: "Mass Effect (BioWare, 2007)", fr: "Mass Effect (BioWare, 2007)" },
    scienceNote: {
      en: "Said to bend mass. Real physics has 'effective mass' for electrons in solids — a clever borrowing of a legitimate idea.",
      fr: "Censé courber la masse. La vraie physique parle de « masse effective » pour les électrons dans les solides — un emprunt astucieux."
    }
  },
  mol_myth_010: {
    source: { en: "J.J. Becher's theory (1667)", fr: "Théorie de J.J. Becher (1667)" },
    scienceNote: {
      en: "Phlogiston theory dominated chemistry for over a century. Lavoisier's 1777 discovery of oxygen ended it — the textbook case of science self-correcting.",
      fr: "La théorie du phlogistique a régné sur la chimie pendant plus d'un siècle. La découverte de l'oxygène par Lavoisier en 1777 y a mis fin — l'exemple type d'une science qui se corrige."
    }
  },

  /* ----- Wave 2 ----- */
  mol_myth_011: {
    source: { en: "Star Wars: The Empire Strikes Back (1980)", fr: "Star Wars : L'Empire contre-attaque (1980)" },
    scienceNote: {
      en: "Real cryopreservation freezes biological tissue, but no real material 'flash-freezes' a person in seconds without lethal ice damage.",
      fr: "La vraie cryoconservation gèle les tissus, mais aucun matériau réel ne « surcongèle » quelqu'un en quelques secondes sans dégâts létaux."
    }
  },
  mol_myth_012: {
    source: { en: "H.G. Wells — The First Men in the Moon (1901)", fr: "H.G. Wells — Les Premiers Hommes dans la Lune (1901)" },
    scienceNote: {
      en: "Anti-gravity remains hypothetical. Einstein's general relativity ties gravity to mass-energy — you can't simply 'shield' against it.",
      fr: "L'antigravité reste hypothétique. La relativité générale d'Einstein lie la gravité à la masse-énergie — impossible de la « blinder »."
    }
  },
  mol_myth_013: {
    source: { en: "Aristotle's Physics (~350 BC), medieval alchemy", fr: "Physique d'Aristote (~350 av. J.-C.), alchimie médiévale" },
    scienceNote: {
      en: "Once believed to be the medium through which light travels. Real physics replaced it with electromagnetic fields — light needs no medium.",
      fr: "Longtemps cru être le milieu où voyage la lumière. La physique l'a remplacé par les champs électromagnétiques — la lumière n'a besoin d'aucun support."
    }
  },
  mol_myth_014: {
    source: { en: "Harry Potter and the Half-Blood Prince — J.K. Rowling (2005)", fr: "Harry Potter et le Prince de sang-mêlé — J.K. Rowling (2005)" },
    scienceNote: {
      en: "No chemical confers 'luck'. Psychology shows belief in luck does increase confidence and risk-taking — so the placebo half is real.",
      fr: "Aucun composé chimique ne donne « de la chance ». La psychologie montre que croire à sa chance augmente la confiance — la moitié placebo est bien réelle."
    }
  },
  mol_myth_015: {
    source: { en: "Final Fantasy VII (Square, 1997)", fr: "Final Fantasy VII (Square, 1997)" },
    scienceNote: {
      en: "Real crystals grow atom-by-atom in lattices. Piezoelectric crystals can convert mechanical force into electricity — the closest real magic.",
      fr: "Les vrais cristaux croissent atome par atome en réseau. Les cristaux piézoélectriques convertissent la force en électricité — la magie la plus proche."
    }
  },
  mol_myth_016: {
    source: { en: "Frank Herbert — Dune (1965)", fr: "Frank Herbert — Dune (1965)" },
    scienceNote: {
      en: "Real psychoactives (caffeine, THC, LSD) alter perception, but none let you fold space. Saffron is the closest real 'spice worth more than gold.'",
      fr: "Les vraies substances psychoactives modifient la perception, mais aucune ne plie l'espace. Le safran est l'« épice plus chère que l'or » la plus proche."
    }
  },
  mol_myth_017: {
    source: { en: "Plato — Critias (~360 BC)", fr: "Platon — Critias (~360 av. J.-C.)" },
    scienceNote: {
      en: "Real brass is a copper-zinc alloy known to the Romans. Bronze-age ingots recovered off Sicily in 2015 are the best candidate for what Plato meant.",
      fr: "Le vrai laiton est un alliage cuivre-zinc connu des Romains. Des lingots de l'âge du bronze retrouvés en Sicile en 2015 sont les meilleurs candidats au sens platonicien."
    }
  },
  mol_myth_018: {
    source: { en: "X-Men #4 (Marvel, 1991)", fr: "X-Men #4 (Marvel, 1991)" },
    scienceNote: {
      en: "Real radioactive metals (uranium, plutonium) are dense and structural. None grant healing-factor immunity, alas.",
      fr: "Les vrais métaux radioactifs (uranium, plutonium) sont denses et structurels. Aucun ne neutralise un facteur de guérison, hélas."
    }
  },
  mol_myth_019: {
    source: { en: "Buck Rogers — Philip Francis Nowlan (1928–29)", fr: "Buck Rogers — Philip Francis Nowlan (1928–29)" },
    scienceNote: {
      en: "Real aerogel is the lightest engineered solid — but it's brittle, not impenetrable. Genuinely weightless structural materials remain fiction.",
      fr: "Le vrai aérogel est le solide artificiel le plus léger — mais il est cassant. Un matériau structurel vraiment sans masse reste de la fiction."
    }
  },
  mol_myth_020: {
    source: { en: "Batman #232 (DC, 1971)", fr: "Batman #232 (DC, 1971)" },
    scienceNote: {
      en: "Real hot springs contain dissolved minerals and microbes. They won't bring you back to life, but they can help with arthritis.",
      fr: "Les vraies sources chaudes contiennent minéraux et microbes. Elles ne ressuscitent personne, mais elles soulagent l'arthrite."
    }
  }
};

// Curated chemistry-meaningful neighbors per molecule. The relationships
// are precursors / products / conjugate pairs / family members — they're
// the chains a curious player would naturally want to follow.
export const RELATED = {
  mol_001: ["mol_012", "mol_011"],   // water → peroxide (reactive cousin), O2 (electrolysis)
  mol_002: ["mol_001", "mol_013"],   // CO2 → water (carbonic acid), CO (incomplete combustion)
  mol_003: ["mol_014", "mol_015"],   // NaCl → HCl + NaOH (acid + base → salt + water)
  mol_004: ["mol_029", "mol_002"],   // methane → ethylene (single vs double bond), CO2 (combustion)
  mol_005: ["mol_017", "mol_008"],   // ethanol → acetic acid (oxidation = vinegar!), glucose (fermentation source)
  mol_006: ["mol_019", "mol_022"],   // NH3 → HNO3 (Ostwald process), N2 (its source via Haber)
  mol_007: ["mol_020", "mol_019"],   // H2SO4 → SO2 (precursor), HNO3 (sister strong acid)
  mol_008: ["mol_002", "mol_030"],   // glucose → CO2 (respiration), glycine (fellow biomolecule)
  mol_009: ["mol_017", "mol_010"],   // aspirin → acetic acid (acetyl source), caffeine (fellow OTC)
  mol_010: ["mol_006", "mol_009"],   // caffeine → NH3 (N-containing kin), aspirin (fellow OTC)
  mol_011: ["mol_021", "mol_012"],   // O2 → H2 (combine to make water!), peroxide
  mol_012: ["mol_001", "mol_011"],   // H2O2 → water + O2 (decomposition products)
  mol_013: ["mol_002", "mol_004"],   // CO → CO2 (full combustion), methane (fuel source)
  mol_014: ["mol_003", "mol_015"],   // HCl → NaCl (salt), NaOH (neutralization partner)
  mol_015: ["mol_014", "mol_006"],   // NaOH → HCl (neutralization partner), NH3 (fellow base)
  mol_016: ["mol_004", "mol_018"],   // benzene → methane, propane (hydrocarbon family)
  mol_017: ["mol_028", "mol_026"],   // acetic acid → formic acid (smaller cousin), baking soda (the vinegar+soda fizz!)
  mol_018: ["mol_004", "mol_016"],   // propane → methane, benzene
  mol_019: ["mol_007", "mol_006"],   // HNO3 → H2SO4 (sister acid), NH3 (precursor)
  mol_020: ["mol_007", "mol_024"],   // SO2 → H2SO4 (oxidation), H2S (sulfur family)
  mol_021: ["mol_001", "mol_011"],   // H2 → water (electrolysis), O2 (combine to make water)
  mol_022: ["mol_006", "mol_019"],   // N2 → NH3 (Haber), HNO3 (lightning fixes N2)
  mol_023: ["mol_005", "mol_027"],   // methanol → ethanol (sister alcohol), formaldehyde (oxidation product)
  mol_024: ["mol_020", "mol_001"],   // H2S → SO2 (oxidation), water (sister hydride)
  mol_025: ["mol_023", "mol_027"],   // acetone → methanol (common solvent), formaldehyde (sister carbonyl)
  mol_026: ["mol_017", "mol_015"],   // baking soda → acetic acid (fizz!), NaOH (sister sodium base)
  mol_027: ["mol_023", "mol_025"],   // formaldehyde → methanol (parent alcohol), acetone (sister carbonyl)
  mol_028: ["mol_017", "mol_027"],   // formic acid → acetic acid (bigger cousin), formaldehyde (parent aldehyde)
  mol_029: ["mol_004", "mol_016"],   // ethylene → methane (saturated cousin), benzene (aromatic step up)
  mol_030: ["mol_017", "mol_006"]    // glycine → acetic acid (carboxylic root), NH3 (amine root)
};
