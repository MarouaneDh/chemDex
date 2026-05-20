/* ============================================================
   Chemdex — internationalization (English / French)
   Loaded after data.js, before app.js.
   ============================================================ */

// UI chrome strings. Values may be plain strings or functions
// (for strings that need to interpolate a value).
const I18N = {
  en: {
    tagline:        "Molecule Discovery Lab",
    tabLab:         "🧪 Lab",
    tabDex:         "📖 Dex",
    atoms:          "Atoms",
    atomsHint:      "Drag an atom to the workbench — or just tap it.",
    workbench:      "Workbench",
    workbenchEmpty: "Drop or tap atoms here to build a molecule",
    formula:        "Formula:",
    combine:        "⚡ Combine",
    clear:          "Clear",
    resetProgress:  "Reset progress",
    lbReset:        "Reset",
    lbHint:         "Scroll or pinch to zoom · drag to pan",
    addAtomsFirst:  "Add some atoms first.",
    noMatch:        f => `No stable molecule has the formula ${f}. Try a different mix.`,
    alreadyKnown:   n => `That's ${n} — already in your Dex. Built it again anyway!`,
    newDiscovery:   "✨ NEW DISCOVERY",
    filterAll:      "all",
    locked:         "???",
    hint:           "Hint:",
    undiscovered:   "undiscovered",
    lockedTitle:    "Build this formula in the Lab to discover it",
    clickZoom:      "Click to zoom",
    zoomHint:       "🔍 tap image to zoom",
    imgUnavailable: "Structure image unavailable",
    removeAtom:     "Tap to remove",
    uses:           "Real-world uses",
    tier:           "tier",
    molarMass:      "Molar mass:",
    pubchemCid:     "PubChem CID:",
    inchiKey:       "InChIKey:",
    discoveredOn:   "Discovered:",
    close:          "Close",
    resetConfirm:   "Reset all discoveries? This cannot be undone.",
    tabQuests:      "🏅 Quests",
    level:          "Level",
    toNext:         "XP to next level",
    maxLevel:       "Max level reached!",
    discovered:     "Found",
    badges:         "Badges",
    missions:       "Missions",
    levelUp:        "LEVEL UP!",
    badgeEarned:    "Badge earned:",
    missionDone:    "Mission complete:",
    soundOn:        "Sound on",
    soundOff:       "Sound off",
    clueLabel:      "Clue:",
    shinyDiscovery: "✨ SHINY DISCOVERY",
    tierLocked:     n => `🔒 Unlocks at ${n} discoveries`,
    atomHint:       parts => `You'll need: ${parts}`,
    tapForMore:     "tap me for a bigger hint",
    dailyTitle:     "Today's puzzle",
    dailyHint:      "💡 Show atoms",
    dailySolved:    name => `✅ Solved today: ${name}! Come back tomorrow for a new one.`,
    dailySolvedToast: "Daily puzzle solved!",
    dailyEmpty:     "Discover a few molecules to unlock today's puzzle.",
    relatedTitle:   "Related discoveries"
  },
  fr: {
    tagline:        "Labo de découverte de molécules",
    tabLab:         "🧪 Labo",
    tabDex:         "📖 Dex",
    atoms:          "Atomes",
    atomsHint:      "Glissez un atome vers le plan de travail — ou touchez-le.",
    workbench:      "Plan de travail",
    workbenchEmpty: "Déposez ou touchez des atomes ici pour bâtir une molécule",
    formula:        "Formule :",
    combine:        "⚡ Combiner",
    clear:          "Effacer",
    resetProgress:  "Réinitialiser",
    lbReset:        "Réinit.",
    lbHint:         "Molette ou pincement pour zoomer · glisser pour déplacer",
    addAtomsFirst:  "Ajoutez d'abord des atomes.",
    noMatch:        f => `Aucune molécule stable n'a la formule ${f}. Essayez un autre mélange.`,
    alreadyKnown:   n => `C'est ${n} — déjà dans votre Dex. Reconstruite quand même !`,
    newDiscovery:   "✨ NOUVELLE DÉCOUVERTE",
    filterAll:      "tous",
    locked:         "? ? ?",
    hint:           "Indice :",
    undiscovered:   "non découvert",
    lockedTitle:    "Construisez cette formule au Labo pour la découvrir",
    clickZoom:      "Cliquez pour zoomer",
    zoomHint:       "🔍 touchez l'image pour zoomer",
    imgUnavailable: "Image de structure indisponible",
    removeAtom:     "Touchez pour retirer",
    uses:           "Utilisations concrètes",
    tier:           "palier",
    molarMass:      "Masse molaire :",
    pubchemCid:     "CID PubChem :",
    inchiKey:       "Clé InChI :",
    discoveredOn:   "Découvert :",
    close:          "Fermer",
    resetConfirm:   "Réinitialiser toutes les découvertes ? Action irréversible.",
    tabQuests:      "🏅 Quêtes",
    level:          "Niveau",
    toNext:         "XP avant le niveau suivant",
    maxLevel:       "Niveau maximum atteint !",
    discovered:     "Trouvées",
    badges:         "Badges",
    missions:       "Missions",
    levelUp:        "NIVEAU SUPÉRIEUR !",
    badgeEarned:    "Badge obtenu :",
    missionDone:    "Mission accomplie :",
    soundOn:        "Son activé",
    soundOff:       "Son coupé",
    clueLabel:      "Indice :",
    shinyDiscovery: "✨ DÉCOUVERTE BRILLANTE",
    tierLocked:     n => `🔒 Se débloque à ${n} découvertes`,
    atomHint:       parts => `Il te faut : ${parts}`,
    tapForMore:     "touche-moi pour un indice plus précis",
    dailyTitle:     "Énigme du jour",
    dailyHint:      "💡 Voir les atomes",
    dailySolved:    name => `✅ Résolue : ${name} ! Reviens demain pour une nouvelle énigme.`,
    dailySolvedToast: "Énigme du jour résolue !",
    dailyEmpty:     "Découvre quelques molécules pour débloquer l'énigme du jour.",
    relatedTitle:   "Découvertes liées"
  }
};

// Atom names in French (English names live in data.js).
const ATOM_NAMES_FR = {
  H: "Hydrogène", C: "Carbone", N: "Azote", O: "Oxygène",
  Na: "Sodium",   S: "Soufre",  Cl: "Chlore"
};

// Soft "level 1" hint copy, picked by molecule type. Reveals the family,
// not the atoms — leaves the player room to puzzle it out.
const TYPE_NUDGES = {
  oxide:          { en: "I'm thinking of something with oxygen attached…",       fr: "Je pense à quelque chose avec de l'oxygène attaché…" },
  salt:           { en: "How about a salt? You'd taste it in the sea.",          fr: "Et un sel ? Tu en goûterais dans la mer." },
  hydrocarbon:    { en: "Try a fuel — just carbon and hydrogen.",                fr: "Essaie un combustible — du carbone et de l'hydrogène, c'est tout." },
  alcohol:        { en: "An alcohol! Its name usually ends in -ol.",             fr: "Un alcool ! Son nom finit souvent par -ol." },
  acid:           { en: "Let's build an acid — sharp and sour!",                 fr: "Construisons un acide — piquant et acide !" },
  base:           { en: "A base — the opposite of an acid.",                     fr: "Une base — l'opposé d'un acide." },
  sugar:          { en: "Something sweet — the fuel cells burn for energy.",     fr: "Quelque chose de sucré — le carburant des cellules." },
  pharmaceutical: { en: "A medicine — check your pharmacy shelf!",               fr: "Un médicament — regarde dans la pharmacie !" },
  alkaloid:       { en: "A plant chemical that wakes you up or calms you…",      fr: "Une molécule végétale qui réveille ou calme…" },
  element:        { en: "Just one kind of atom — but how many of them?",         fr: "Un seul type d'atome — mais combien ?" },
  peroxide:       { en: "A close cousin of water — but more reactive.",          fr: "Un proche cousin de l'eau — mais plus réactif." },
  ketone:         { en: "A sharp-smelling solvent — handy in nail care.",        fr: "Un solvant à l'odeur piquante — utile pour les ongles." },
  aldehyde:       { en: "Carbon meets oxygen with a double bond — sharp stuff.", fr: "Carbone et oxygène par double liaison — substance piquante." }
};

// Category / type / rarity terms — French only (English = the key itself).
const TERMS_FR = {
  // categories
  inorganic: "inorganique", organic: "organique",
  // types
  oxide: "oxyde", salt: "sel", hydrocarbon: "hydrocarbure", alcohol: "alcool",
  base: "base", acid: "acide", sugar: "sucre", pharmaceutical: "médicament",
  alkaloid: "alcaloïde", element: "élément", peroxide: "peroxyde",
  ketone: "cétone", aldehyde: "aldéhyde",
  // rarities
  common: "commun", uncommon: "peu commun", rare: "rare", epic: "épique"
};

// French translations of the molecule content, keyed by molecule id.
const MOL_FR = {
  mol_001: {
    commonName: "Eau", iupacName: "Oxidane",
    description: "Un composé inorganique polaire qui est, à température ambiante, un liquide insipide et inodore. Il est essentiel à toutes les formes de vie connues.",
    uses: ["Boisson et hydratation", "Solvant dans les réactions chimiques", "Agent de refroidissement industriel", "Agriculture et irrigation"],
    funFact: "L'eau est l'une des rares substances moins denses à l'état solide qu'à l'état liquide, c'est pourquoi la glace flotte."
  },
  mol_002: {
    commonName: "Dioxyde de carbone", iupacName: "Dioxyde de carbone",
    description: "Un gaz incolore dont la densité est environ 53 % supérieure à celle de l'air sec. C'est un gaz à l'état de trace dans l'atmosphère terrestre.",
    uses: ["Gazéification des boissons", "Extincteurs d'incendie", "Photosynthèse des plantes", "Glace sèche pour la réfrigération"],
    funFact: "Les humains expirent environ 1 kg de CO2 par jour."
  },
  mol_003: {
    commonName: "Sel de table", iupacName: "Chlorure de sodium",
    description: "Un composé ionique représentant la salinité de l'eau de mer et du liquide extracellulaire de nombreux organismes pluricellulaires.",
    uses: ["Assaisonnement et conservation des aliments", "Déneigement des routes", "Production chimique industrielle", "Solutions salines médicales"],
    funFact: "L'expression « valoir son sel » remonte à l'époque romaine, où les soldats étaient parfois payés en sel."
  },
  mol_004: {
    commonName: "Méthane", iupacName: "Méthane",
    description: "L'hydrocarbure le plus simple et le composant principal du gaz naturel. Un puissant gaz à effet de serre.",
    uses: ["Combustible (gaz naturel) pour le chauffage", "Production d'électricité", "Propergol pour fusées", "Production d'hydrogène"],
    funFact: "Le méthane est environ 25 fois plus efficace que le CO2 pour piéger la chaleur dans l'atmosphère."
  },
  mol_005: {
    commonName: "Éthanol", iupacName: "Éthan-1-ol",
    description: "Un composé organique et le type d'alcool présent dans les boissons alcoolisées. Un liquide volatil, inflammable et incolore.",
    uses: ["Boissons alcoolisées", "Additif pour carburant (E10, E85)", "Antiseptique et désinfectant", "Solvant dans les parfums et médicaments"],
    funFact: "L'éthanol est produit par les humains depuis au moins 9 000 ans grâce à la fermentation."
  },
  mol_006: {
    commonName: "Ammoniac", iupacName: "Azane",
    description: "Un gaz incolore à l'odeur âcre caractéristique. C'est un déchet azoté courant et un précurseur de nombreux engrais.",
    uses: ["Production d'engrais", "Produits d'entretien ménager", "Réfrigération", "Fabrication de textiles et de plastiques"],
    funFact: "Le procédé Haber-Bosch de fabrication de l'ammoniac nourrit environ la moitié de la population mondiale en permettant les engrais de synthèse."
  },
  mol_007: {
    commonName: "Acide sulfurique", iupacName: "Acide sulfurique",
    description: "Un acide minéral fort et très corrosif, historiquement appelé « huile de vitriol ». L'un des produits chimiques industriels les plus produits.",
    uses: ["Fabrication d'engrais", "Électrolyte de batterie automobile", "Traitement des minerais et raffinage des métaux", "Synthèse chimique"],
    funFact: "La production d'acide sulfurique sert parfois d'indicateur de la puissance industrielle d'un pays."
  },
  mol_008: {
    commonName: "Glucose", iupacName: "(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal",
    description: "Un sucre simple et le monosaccharide le plus abondant. C'est la principale source d'énergie des organismes vivants.",
    uses: ["Principale source d'énergie des cellules", "Solutions intraveineuses médicales", "Édulcorant alimentaire", "Fermentation pour les biocarburants"],
    funFact: "Votre cerveau consomme environ 120 grammes de glucose par jour, soit près de 60 % de la consommation totale de glucose de votre corps au repos."
  },
  mol_009: {
    commonName: "Aspirine", iupacName: "Acide 2-acétoxybenzoïque",
    description: "Un médicament utilisé pour réduire la douleur, la fièvre ou l'inflammation. Également utilisé à faible dose sur le long terme pour aider à prévenir les crises cardiaques et les AVC.",
    uses: ["Soulagement de la douleur (analgésique)", "Réduction de la fièvre (antipyrétique)", "Traitement anti-inflammatoire", "Prévention des caillots sanguins"],
    funFact: "L'aspirine a été synthétisée pour la première fois par Felix Hoffmann chez Bayer en 1897, à partir de composés de l'écorce de saule utilisée en médecine depuis des millénaires."
  },
  mol_010: {
    commonName: "Caféine", iupacName: "1,3,7-triméthylpurine-2,6-dione",
    description: "Un stimulant du système nerveux central de la classe des méthylxanthines. La drogue psychoactive la plus consommée au monde.",
    uses: ["Stimulant dans le café, le thé et les boissons énergisantes", "Médicament contre les maux de tête et la somnolence", "Traitement de l'apnée chez les prématurés", "Amélioration des performances sportives"],
    funFact: "La caféine est naturellement produite par les plantes comme pesticide — elle paralyse et tue les insectes qui tentent de s'en nourrir."
  },
  mol_011: {
    commonName: "Oxygène", iupacName: "Dioxygène",
    description: "Un gaz diatomique constituant environ 21 % de l'atmosphère terrestre. Il est essentiel à la respiration de la plupart des organismes vivants et à la combustion.",
    uses: ["Oxygénothérapie médicale", "Sidérurgie et découpe des métaux", "Combustion et soudage", "Systèmes de survie"],
    funFact: "L'air riche en oxygène de la Terre a été créé par des cyanobactéries photosynthétiques sur des milliards d'années — un événement appelé la Grande Oxydation."
  },
  mol_012: {
    commonName: "Peroxyde d'hydrogène", iupacName: "Peroxyde d'hydrogène",
    description: "Un liquide bleu pâle légèrement plus visqueux que l'eau. C'est le peroxyde le plus simple et un puissant agent oxydant.",
    uses: ["Antiseptique et désinfectant", "Blanchiment du papier et des textiles", "Propergol pour fusées", "Traitement des eaux usées"],
    funFact: "Le peroxyde d'hydrogène concentré a été utilisé comme monergol de fusée et a même propulsé les premiers jetpacks expérimentaux."
  },
  mol_013: {
    commonName: "Monoxyde de carbone", iupacName: "Monoxyde de carbone",
    description: "Un gaz incolore, inodore et toxique produit par la combustion incomplète de combustibles carbonés.",
    uses: ["Agent réducteur industriel", "Raffinage des minerais métalliques", "Synthèse du méthanol et de produits chimiques", "Composant du gaz de synthèse"],
    funFact: "Le monoxyde de carbone est dangereux car il se lie à l'hémoglobine environ 200 fois plus fortement que l'oxygène."
  },
  mol_014: {
    commonName: "Acide chlorhydrique", iupacName: "Chlorure d'hydrogène",
    description: "Un acide fort formé lorsque le chlorure d'hydrogène gazeux se dissout dans l'eau. C'est aussi un composant majeur du suc gastrique.",
    uses: ["Décapage et nettoyage de l'acier", "Régulation du pH dans l'industrie", "Produits de nettoyage ménagers", "Transformation des aliments"],
    funFact: "Votre estomac fabrique un acide chlorhydrique assez fort pour corroder le métal, et reconstruit sa paroi tous les quelques jours pour éviter de se digérer lui-même."
  },
  mol_015: {
    commonName: "Hydroxyde de sodium", iupacName: "Hydroxyde de sodium",
    description: "Un solide blanc caustique, également appelé soude caustique. C'est une base forte très polyvalente et largement utilisée.",
    uses: ["Fabrication de savons et de détergents", "Déboucheurs et nettoyants pour four", "Production de papier et de pâte à papier", "Transformation des aliments"],
    funFact: "L'hydroxyde de sodium est utilisé pour préparer les olives et pour donner aux bretzels mous leur croûte brune brillante caractéristique."
  },
  mol_016: {
    commonName: "Benzène", iupacName: "Benzène",
    description: "Un hydrocarbure aromatique incolore à l'odeur sucrée. Son cycle symétrique à six carbones est l'archétype de la chimie aromatique.",
    uses: ["Précurseur des plastiques et des résines", "Production de styrène et de nylon", "Solvant industriel", "Composant de l'essence"],
    funFact: "Le chimiste August Kekulé affirma que la structure cyclique du benzène lui était apparue dans une rêverie d'un serpent se mordant la queue."
  },
  mol_017: {
    commonName: "Acide acétique", iupacName: "Acide acétique",
    description: "L'acide qui donne au vinaigre son goût aigre et son odeur piquante. C'est l'acide carboxylique le plus simple après l'acide formique.",
    uses: ["Vinaigre et arôme alimentaire", "Production de plastique PET", "Solvant dans l'industrie chimique", "Agent détartrant"],
    funFact: "L'acide acétique pur, sans eau, est dit « glacial » car il gèle en cristaux semblables à de la glace juste en dessous de la température ambiante."
  },
  mol_018: {
    commonName: "Propane", iupacName: "Propane",
    description: "Un alcane à trois carbones, normalement gazeux mais facilement liquéfié pour le stockage et le transport sous forme de gaz de pétrole liquéfié (GPL).",
    uses: ["Combustible pour barbecue et chauffage", "Réchauds de camping portatifs", "Carburant pour moteurs (autogaz)", "Réfrigérant"],
    funFact: "Le propane est stocké sous forme de liquide sous pression mais bout en gaz à environ -42 °C dès qu'il est libéré."
  },
  mol_019: {
    commonName: "Acide nitrique", iupacName: "Acide nitrique",
    description: "Un acide minéral fort et très corrosif. Les échantillons vieillis jaunissent à mesure que les oxydes d'azote dissous s'accumulent.",
    uses: ["Production d'engrais", "Fabrication d'explosifs", "Gravure et raffinage des métaux", "Oxydant pour fusées"],
    funFact: "Un mélange d'acide nitrique et d'acide chlorhydrique est appelé « eau régale » — eau royale — car il peut dissoudre l'or et le platine."
  },
  mol_020: {
    commonName: "Dioxyde de soufre", iupacName: "Dioxyde de soufre",
    description: "Un gaz toxique à l'odeur âcre et irritante, libéré par les volcans et la combustion de combustibles soufrés.",
    uses: ["Conservateur du vin et des fruits secs", "Agent de blanchiment", "Production d'acide sulfurique", "Réfrigérant"],
    funFact: "Le dioxyde de soufre projeté par les grandes éruptions volcaniques peut refroidir la planète entière en réfléchissant la lumière du soleil vers l'espace."
  },
  mol_021: {
    commonName: "Hydrogène", iupacName: "Dihydrogène",
    description: "Le gaz le plus simple et le plus léger de l'univers. Une molécule diatomique incolore et inodore qui brûle de façon explosive dans l'air pour former de l'eau pure.",
    uses: ["Carburant pour fusées (moteurs principaux de la navette spatiale)", "Synthèse de l'ammoniac (procédé Haber)", "Piles à combustible pour énergie propre", "Hydrogénation des graisses dans l'alimentation"],
    funFact: "L'hydrogène constitue environ 75 % de toute la matière ordinaire de l'univers — c'est ce dont sont principalement faites les étoiles."
  },
  mol_022: {
    commonName: "Azote", iupacName: "Diazote",
    description: "Le gaz incolore et inodore qui constitue environ 78 % de l'atmosphère terrestre. Ses deux atomes sont reliés par une triple liaison particulièrement forte.",
    uses: ["Atmosphère inerte pour l'emballage alimentaire", "Azote liquide pour congélation rapide", "Gonflage des pneus en aéronautique", "Production d'ammoniac pour engrais"],
    funFact: "La triple liaison N≡N est si forte que la foudre est l'une des rares forces naturelles capables de la rompre — c'est ainsi que les plantes obtiennent leur azote."
  },
  mol_023: {
    commonName: "Méthanol", iupacName: "Méthanol",
    description: "L'alcool le plus simple — incolore, inflammable et toxique en cas d'ingestion. Autrefois appelé alcool de bois car on le produisait en chauffant du bois.",
    uses: ["Solvant en laboratoire", "Antigel pour lave-glace", "Carburant pour voitures de course (combustion propre et lumineuse)", "Production de biodiesel"],
    funFact: "Boire même de petites quantités de méthanol peut rendre aveugle — le corps le transforme en formaldéhyde, qui endommage le nerf optique."
  },
  mol_024: {
    commonName: "Sulfure d'hydrogène", iupacName: "Sulfure d'hydrogène",
    description: "Un gaz incolore à l'odeur caractéristique d'œuf pourri. Très toxique à forte dose, mais produit par les bactéries des marécages — et même dans tes propres intestins.",
    uses: ["Production de soufre élémentaire et d'acide sulfurique", "Production d'eau lourde pour réacteurs nucléaires", "Identification des minerais sulfurés", "Sous-produit de la géothermie"],
    funFact: "Ton nez détecte le sulfure d'hydrogène à des concentrations extrêmement faibles — mais s'il devient assez fort pour anesthésier ton odorat, il est dangereusement proche du seuil mortel."
  },
  mol_025: {
    commonName: "Acétone", iupacName: "Propan-2-one",
    description: "Un solvant organique incolore à l'évaporation rapide et à l'odeur sucrée et piquante. Ton foie en produit naturellement de petites quantités.",
    uses: ["Dissolvant pour vernis à ongles", "Nettoyage de la verrerie de laboratoire", "Production de plastiques et de médicaments", "Diluant à colle et dégraissant"],
    funFact: "Les personnes suivant un régime très pauvre en glucides peuvent dégager une légère odeur d'acétone — leur corps brûle des graisses au lieu du sucre et fabrique des cétones."
  },
  mol_026: {
    commonName: "Bicarbonate de soude", iupacName: "Hydrogénocarbonate de sodium",
    description: "Une poudre cristalline blanche qui est à la fois une base douce et un sel. Effervesce vigoureusement au contact d'un acide en libérant du dioxyde de carbone.",
    uses: ["Levure chimique pour pâtisseries", "Antiacide contre les troubles digestifs", "Extincteur (étouffe les flammes par CO2)", "Nettoyant abrasif doux"],
    funFact: "Mélanger du bicarbonate avec du vinaigre crée la fameuse éruption volcanique mousseuse — c'est du CO2 gazeux qui jaillit d'une réaction acide-base."
  },
  mol_027: {
    commonName: "Formaldéhyde", iupacName: "Méthanal",
    description: "L'aldéhyde le plus simple — un gaz piquant soluble dans l'eau, surtout connu comme conservateur des spécimens biologiques.",
    uses: ["Embaumement et conservation de spécimens", "Fabrication de contreplaqué et de résines", "Désinfectant en milieu médical", "Production de plastiques comme la Bakélite"],
    funFact: "Les astronomes ont détecté du formaldéhyde dans des nuages de gaz interstellaires — l'une des premières molécules organiques complexes jamais trouvées dans l'espace lointain."
  },
  mol_028: {
    commonName: "Acide formique", iupacName: "Acide méthanoïque",
    description: "L'acide carboxylique le plus simple — et la substance responsable de la brûlure des piqûres de fourmi. Son nom vient du latin signifiant fourmi.",
    uses: ["Conservation des fourrages (ensilage)", "Tannage du cuir", "Antibactérien dans l'alimentation animale", "Dégivrage des pistes d'aéroport"],
    funFact: "Certaines fourmis projettent de l'acide formique depuis leur abdomen pour se défendre — assez puissant pour faire lâcher prise à un lézard attaquant."
  },
  mol_029: {
    commonName: "Éthylène", iupacName: "Éthène",
    description: "Un hydrocarbure incolore à l'odeur sucrée et le plus simple des alcènes. Les plantes le produisent comme hormone déclenchant le mûrissement des fruits.",
    uses: ["Production du polyéthylène (le plastique le plus courant sur Terre)", "Mûrissement des fruits récoltés en entrepôt", "Carburant de soudage (chalumeaux oxyéthylène)", "Fabrication d'antigel (éthylène glycol)"],
    funFact: "Mettre une banane mûre à côté d'autres fruits accélère leur mûrissement — les bananes libèrent beaucoup d'éthylène en mûrissant, signalant aux voisines de mûrir aussi."
  },
  mol_030: {
    commonName: "Glycine", iupacName: "Acide 2-aminoacétique",
    description: "Le plus petit des 20 acides aminés qui composent toutes les protéines de ton corps. Légèrement sucrée au goût — son nom vient du grec signifiant doux.",
    uses: ["Brique élémentaire des protéines du vivant", "Édulcorant et exhausteur de goût alimentaire", "Neurotransmetteur inhibiteur dans la moelle épinière", "Tampon pharmaceutique"],
    funFact: "La glycine a été détectée sur des comètes et dans des nuages interstellaires — soutenant l'idée que les briques élémentaires du vivant pourraient venir de l'espace."
  }
};
