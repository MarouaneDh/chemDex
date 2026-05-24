/* ============================================================
   Chemdex data — molecules + atom palette
   Loaded as a plain script so the app works from file:// with
   no server and no fetch/CORS issues.
   ============================================================ */

// The draggable atoms available in the Lab. `valence` is shown as
// flavour info; matching is done purely on atom counts.
export const ATOMS = [
  { symbol: "H",  name: "Hydrogen", number: 1,  valence: 1, color: "#e8edf2", text: "#1a1d22" },
  { symbol: "C",  name: "Carbon",   number: 6,  valence: 4, color: "#2b2f36", text: "#e8edf2" },
  { symbol: "N",  name: "Nitrogen", number: 7,  valence: 5, color: "#4f7bd6", text: "#ffffff" },
  { symbol: "O",  name: "Oxygen",   number: 8,  valence: 6, color: "#e0524f", text: "#ffffff" },
  { symbol: "Na", name: "Sodium",   number: 11, valence: 1, color: "#a06bd6", text: "#ffffff" },
  { symbol: "S",  name: "Sulfur",   number: 16, valence: 6, color: "#d6b94f", text: "#1a1d22" },
  { symbol: "Cl", name: "Chlorine", number: 17, valence: 7, color: "#5fae5f", text: "#ffffff" }
];

/* ---- Atom Tech Tree ----
   H/O/C/N are free starter atoms. Every other element begins locked and
   is earned through play: crossing a discovery milestone grants one
   "Choose Your Path" pick. Each atom opens a themed branch of chemistry.
   Adding a new element later = one ATOMS entry + one ATOM_BRANCHES entry. */
export const STARTER_ATOMS = ["H", "O", "C", "N"];
export const ATOM_MILESTONES = [4, 9, 14];   // total-discovery counts that grant a pick
export const ATOM_BRANCHES = {
  Na: { en: "Metals & Bases",    fr: "Métaux & bases" },
  S:  { en: "Pungent Chemistry", fr: "Chimie piquante" },
  Cl: { en: "Salts & Acids",     fr: "Sels & acides" }
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
