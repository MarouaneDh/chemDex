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
    resetConfirm:   "Reset all discoveries? This cannot be undone."
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
    resetConfirm:   "Réinitialiser toutes les découvertes ? Action irréversible."
  }
};

// Atom names in French (English names live in data.js).
const ATOM_NAMES_FR = {
  H: "Hydrogène", C: "Carbone", N: "Azote", O: "Oxygène",
  Na: "Sodium",   S: "Soufre",  Cl: "Chlore"
};

// Category / type / rarity terms — French only (English = the key itself).
const TERMS_FR = {
  // categories
  inorganic: "inorganique", organic: "organique",
  // types
  oxide: "oxyde", salt: "sel", hydrocarbon: "hydrocarbure", alcohol: "alcool",
  base: "base", acid: "acide", sugar: "sucre", pharmaceutical: "médicament",
  alkaloid: "alcaloïde", element: "élément", peroxide: "peroxyde",
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
  }
};
