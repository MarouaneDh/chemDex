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
