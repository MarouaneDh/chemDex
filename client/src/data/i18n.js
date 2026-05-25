/* ============================================================
   Chemdex — internationalization (English / French)
   Loaded after data.js, before app.js.
   ============================================================ */

// UI chrome strings. Values may be plain strings or functions
// (for strings that need to interpolate a value).
export const I18N = {
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
    tabSandbox:     "🧪 Sandbox",
    tabAdmin:       "🛠 Admin",
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
    relatedTitle:   "Related discoveries",
    atomLockedTease: name => `🔒 ${name} — locked`,
    atomLockedHint: "That element is locked. Discover more molecules to earn element unlocks!",
    choosePathTitle: "Choose your path",
    choosePathSub:  "Unlock an element — each one opens a new branch of chemistry.",
    choosePathPick: "Unlock",
    atomUnlockedTag: "ELEMENT UNLOCKED",
    atomOpensBranch: branch => `Opens: ${branch}`,
    atomFeaturedIn: n => n === 1 ? "In 1 molecule" : `In ${n} molecules`,
    tapContinue:    "tap to continue",
    requiresAtoms:  list => `🔒 Requires ${list}`,
    atomUnlockToast: "New element unlocked",
    account:        "Account",
    signIn:         "Sign in",
    signOut:        "Sign out",
    guest:          "Guest",
    settingsTitle:        "Settings",
    settingsLanguage:     "Language",
    settingsSound:        "Sound effects",
    settingsSoundHint:    "Plays on discoveries and rewards",
    settingsOpenAdmin:    "Open admin panel",
    soundOn:              "Turn sound on",
    soundOff:             "Turn sound off",
    authLoginTitle: "Welcome back",
    authRegisterTitle: "Create your account",
    authSub:        "Your discoveries sync across every device.",
    emailLabel:     "Email",
    passwordLabel:  "Password",
    nameLabel:      "Display name",
    authLoginCta:   "Log in",
    authRegisterCta: "Create account",
    authToRegister: "New here? Create an account",
    authToLogin:    "Already have an account? Log in",
    authBusy:       "Please wait…",
    accountSignedIn: name => `Signed in as ${name}`,
    syncOffline:    "Not signed in — progress is on this device only",
    syncSyncing:    "Syncing…",
    syncSynced:     "Progress synced to your account",
    syncError:      "Sync failed — will retry",
    passwordTooShort: "Password must be at least 8 characters",
    bragCard:       "📸 Brag card",
    cardShare:      "Share card",
    cardOwnerGuest: "Guest Chemist",
    cardDiscoveredBy: "Discovered by",
    fictionalBanner: "✦ FICTIONAL",
    originFrom:     "From",
    realScience:    "Real science",
    dangerBanner:   "☣ FORBIDDEN",
    safetyLabel:    "Safety",
    leakWhisper:    "Something's leaking from behind the wall…",
    leakBreached:   "Forbidden Shelf — tap to view",
    foundInLabel:   "Found in your fridge",
    sunlightTitle:  "🌞 Sunlight required",
    sunlightHint:   "Step outdoors and tap to activate this card.",
    sunlightActivate: "Activate in sunlight",
    sunlightReading: "Reading sunlight…",
    sunlightDone:   "☀️ Activated by sunlight",
    sunlightNotEnough: lux => `Only ${lux} lux — try outdoors in real daylight.`,
    sunlightUnsupported: "Your device can't read sunlight. Are you outside right now?",
    sunlightConfirm: "Yes, I'm in real sunlight",
    sunlightCancel: "Not really",
    sunlightToast:  amt => `☀️ +${amt} XP — your skin actually makes Vitamin D from sunlight!`,
    hazardClassesTitle: "Hazard Classes",
    hazardComplete: "Complete!",
    hazardsLabel:   "Hazards",
    filterSeparator: "·",
    evolutionTitle: "Evolution Chain",
    evolutionLocked: "Undiscovered step",
    sandboxTitle:   "Mad Science Sandbox",
    sandboxSub:     "Build anything. Name it. If it's actually real, you'll discover it.",
    sbPublishCta:   "✦ Publish",
    sbPublish:      "Publish",
    sbPublishTitle: "Name your creation",
    sbName:         "Name",
    sbNamePlaceholder: "e.g. Aerocarbium",
    sbDescription:  "Description (optional)",
    sbDescriptionPlaceholder: "What does it do? Where would you find it?",
    sbRarity:       "Rarity",
    sbNameRequired: "Give your creation a name (1–40 characters).",
    sbDescriptionTooLong: "Description is too long (max 200 characters).",
    sbAlreadyKnown: name => `That recipe is actually ${name} — already in your Dex.`,
    sbRealChemistry: name => `Wait, that's real! Auto-discovered: ${name}`,
    sbSaved:        name => `Saved "${name}" to your sandbox.`,
    sbGallery:      "Your creations",
    sbGalleryEmpty: "Nothing here yet — build something on the workbench and Publish.",
    sbViewCard:     "View brag card",
    sbDelete:       "Delete",
    sbDeleteConfirm: name => `Delete "${name}"?`,
    sbInventedTypeLabel: "✦ MAD SCIENCE INVENTION",
    sbInventedBy:   "Invented by",
    yourFriendId:   "Your friend ID",
    copy:           "Copy",
    friendsTitle:   "Friends",
    noFriendsYet:   "No friends yet — share your friend ID to add some.",
    incomingInvitesTitle: "Pending invitations",
    outgoingInvitesTitle: "Invitations you sent",
    pending:        "pending",
    accept:         "Accept",
    decline:        "Decline",
    unfriend:       "Unfriend",
    unfriendConfirm: name => `Remove ${name} from your friends?`,
    addFriend:      "+ Add a friend",
    addFriendTitle: "Add a friend",
    addFriendSub:   "Type or paste their friend ID. They'll get a pending invitation to accept.",
    friendIdLabel:  "Friend ID",
    friendIdRequired: "Enter a friend ID like ABCD-2345.",
    sendInvite:     "Send invitation",
    inviteSent:     "Invitation sent ✓",
    shareToFriendsTitle: "Send to friends",
    shareToFriendsSub: name => `Send the "${name}" brag card to one or more friends.`,
    shareNoFriends: "You have no friends yet — add some first!",
    shareNoneSelected: "Pick at least one friend.",
    shareSent:      n => `Sent to ${n} friend${n === 1 ? "" : "s"} ✓`,
    shareSendCta:   n => n === 0 ? "Send" : `Send to ${n} selected`,
    shareSendToFriends: "Send to friends",
    inboxFrom:      "From",
    inboxReceivedFromLabel: "RECEIVED FROM",
    notificationsAria: n => `${n} notification${n === 1 ? "" : "s"}`,
    chatsTitle:     "💬 Conversations",
    chatsEmpty:     "No conversations yet — open a chat from your friends list.",
    chatsNoMessagesYet: "No messages yet",
    chatYouPrefix:  "You:",
    chatOpen:       "Open chat",
    chatOpenCard:   "Open this card",
    chatEmpty:      "Say hi! Drop a message or send a discovery card.",
    chatPlaceholder: "Write a message…",
    chatSend:       "Send",
    chatReact:      "React",
    chatToggleReaction: "Tap to toggle",
    breachTitle:    "FORBIDDEN SHELF BREACHED",
    breachSub:      "Dangerous chemistry — handle with respect.",
    capsuleTitle:   "💊 Daily Capsule",
    capsuleReady:   "Pinch & squeeze to crack it open",
    capsuleNextIn:  ms => `Next capsule in ${ms}`,
    capsuleStockpile: "2 ready — pop them today!",
    capsuleEmpty:   "All popped — check back later",
    lootXP:         amt => `+${amt} XP — keep cracking!`,
    lootHint:       "🧩 Hint scroll — Atomo whispered a recipe",
    lootStabilizer: "❄️ Cryo-Stabilizer saved for a missed day",
    buddyTitle:     "Your Buddy",
    buddyStreak:    n => n === 1 ? "1-day streak" : `${n}-day streak`,
    buddyDormant:   "Find a molecule today to wake it up",
    buddyStabilizers: "Stabilizers",
    buddyNext:      n => `${n} more day${n === 1 ? "" : "s"} to evolve`,
    stagePrefix:    "Stage"
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
    tabSandbox:     "🧪 Sandbox",
    tabAdmin:       "🛠 Admin",
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
    relatedTitle:   "Découvertes liées",
    atomLockedTease: name => `🔒 ${name} — verrouillé`,
    atomLockedHint: "Cet élément est verrouillé. Découvre plus de molécules pour débloquer des éléments !",
    choosePathTitle: "Choisis ta voie",
    choosePathSub:  "Débloque un élément — chacun ouvre une nouvelle branche de la chimie.",
    choosePathPick: "Débloquer",
    atomUnlockedTag: "ÉLÉMENT DÉBLOQUÉ",
    atomOpensBranch: branch => `Ouvre : ${branch}`,
    atomFeaturedIn: n => n === 1 ? "Dans 1 molécule" : `Dans ${n} molécules`,
    tapContinue:    "touche pour continuer",
    requiresAtoms:  list => `🔒 Nécessite ${list}`,
    atomUnlockToast: "Nouvel élément débloqué",
    account:        "Compte",
    signIn:         "Se connecter",
    signOut:        "Se déconnecter",
    guest:          "Invité",
    settingsTitle:        "Réglages",
    settingsLanguage:     "Langue",
    settingsSound:        "Effets sonores",
    settingsSoundHint:    "Joue sur les découvertes et récompenses",
    settingsOpenAdmin:    "Ouvrir l'admin",
    soundOn:              "Activer le son",
    soundOff:             "Couper le son",
    authLoginTitle: "Bon retour",
    authRegisterTitle: "Crée ton compte",
    authSub:        "Tes découvertes se synchronisent sur tous tes appareils.",
    emailLabel:     "E-mail",
    passwordLabel:  "Mot de passe",
    nameLabel:      "Nom affiché",
    authLoginCta:   "Connexion",
    authRegisterCta: "Créer le compte",
    authToRegister: "Nouveau ? Crée un compte",
    authToLogin:    "Déjà un compte ? Connecte-toi",
    authBusy:       "Patiente…",
    accountSignedIn: name => `Connecté en tant que ${name}`,
    syncOffline:    "Non connecté — progression sur cet appareil seulement",
    syncSyncing:    "Synchronisation…",
    syncSynced:     "Progression synchronisée sur ton compte",
    syncError:      "Échec de synchro — nouvelle tentative",
    passwordTooShort: "Le mot de passe doit faire au moins 8 caractères",
    bragCard:       "📸 Carte à frimer",
    cardShare:      "Partager la carte",
    cardOwnerGuest: "Chimiste invité",
    cardDiscoveredBy: "Découvert par",
    fictionalBanner: "✦ FICTIF",
    originFrom:     "Origine",
    realScience:    "Vraie science",
    dangerBanner:   "☣ INTERDITE",
    safetyLabel:    "Sécurité",
    leakWhisper:    "Quelque chose fuit de derrière le mur…",
    leakBreached:   "Étagère Interdite — touche pour ouvrir",
    foundInLabel:   "Dans ton frigo",
    sunlightTitle:  "🌞 Lumière du soleil requise",
    sunlightHint:   "Sors dehors et touche pour activer cette carte.",
    sunlightActivate: "Activer au soleil",
    sunlightReading: "Lecture de la lumière…",
    sunlightDone:   "☀️ Activée par le soleil",
    sunlightNotEnough: lux => `Seulement ${lux} lux — essaie dehors en plein jour.`,
    sunlightUnsupported: "Ton appareil ne peut pas lire la lumière. Es-tu vraiment dehors ?",
    sunlightConfirm: "Oui, je suis au vrai soleil",
    sunlightCancel: "Pas vraiment",
    sunlightToast:  amt => `☀️ +${amt} XP — ta peau fabrique vraiment la vitamine D à partir du soleil !`,
    hazardClassesTitle: "Classes de danger",
    hazardComplete: "Complet !",
    hazardsLabel:   "Dangers",
    filterSeparator: "·",
    evolutionTitle: "Chaîne d'évolution",
    evolutionLocked: "Étape à découvrir",
    sandboxTitle:   "Labo des fous",
    sandboxSub:     "Construis n'importe quoi. Donne-lui un nom. Si c'est vraiment réel, tu le découvres.",
    sbPublishCta:   "✦ Publier",
    sbPublish:      "Publier",
    sbPublishTitle: "Nomme ta création",
    sbName:         "Nom",
    sbNamePlaceholder: "ex. Aérocarbium",
    sbDescription:  "Description (optionnelle)",
    sbDescriptionPlaceholder: "À quoi ça sert ? Où la trouve-t-on ?",
    sbRarity:       "Rareté",
    sbNameRequired: "Donne un nom à ta création (1 à 40 caractères).",
    sbDescriptionTooLong: "Description trop longue (max 200 caractères).",
    sbAlreadyKnown: name => `Cette recette est en fait ${name} — déjà dans ton Dex.`,
    sbRealChemistry: name => `Attends, c'est réel ! Auto-découvert : ${name}`,
    sbSaved:        name => `« ${name} » enregistré dans ton labo des fous.`,
    sbGallery:      "Tes créations",
    sbGalleryEmpty: "Rien ici — construis quelque chose sur le plan de travail et publie.",
    sbViewCard:     "Voir la carte",
    sbDelete:       "Supprimer",
    sbDeleteConfirm: name => `Supprimer « ${name} » ?`,
    sbInventedTypeLabel: "✦ INVENTION FOLLE",
    sbInventedBy:   "Inventée par",
    yourFriendId:   "Ton ID d'ami",
    copy:           "Copier",
    friendsTitle:   "Amis",
    noFriendsYet:   "Aucun ami pour l'instant — partage ton ID pour en ajouter.",
    incomingInvitesTitle: "Invitations reçues",
    outgoingInvitesTitle: "Invitations envoyées",
    pending:        "en attente",
    accept:         "Accepter",
    decline:        "Refuser",
    unfriend:       "Retirer",
    unfriendConfirm: name => `Retirer ${name} de tes amis ?`,
    addFriend:      "+ Ajouter un ami",
    addFriendTitle: "Ajouter un ami",
    addFriendSub:   "Tape ou colle son ID d'ami. Il recevra une invitation à accepter.",
    friendIdLabel:  "ID d'ami",
    friendIdRequired: "Entre un ID d'ami comme ABCD-2345.",
    sendInvite:     "Envoyer l'invitation",
    inviteSent:     "Invitation envoyée ✓",
    shareToFriendsTitle: "Envoyer à tes amis",
    shareToFriendsSub: name => `Envoie la carte « ${name} » à un ou plusieurs amis.`,
    shareNoFriends: "Tu n'as pas encore d'amis — ajoutes-en d'abord !",
    shareNoneSelected: "Choisis au moins un ami.",
    shareSent:      n => `Envoyé à ${n} ami${n === 1 ? "" : "s"} ✓`,
    shareSendCta:   n => n === 0 ? "Envoyer" : `Envoyer à ${n}`,
    shareSendToFriends: "Envoyer aux amis",
    inboxFrom:      "De",
    inboxReceivedFromLabel: "REÇUE DE",
    notificationsAria: n => `${n} notification${n === 1 ? "" : "s"}`,
    chatsTitle:     "💬 Conversations",
    chatsEmpty:     "Pas encore de conversation — ouvre un chat depuis ta liste d'amis.",
    chatsNoMessagesYet: "Aucun message",
    chatYouPrefix:  "Toi :",
    chatOpen:       "Ouvrir le chat",
    chatOpenCard:   "Ouvrir cette carte",
    chatEmpty:      "Dis salut ! Envoie un message ou une carte de découverte.",
    chatPlaceholder: "Écris un message…",
    chatSend:       "Envoyer",
    chatReact:      "Réagir",
    chatToggleReaction: "Touche pour basculer",
    breachTitle:    "ÉTAGÈRE INTERDITE OUVERTE",
    breachSub:      "Chimie dangereuse — manipule avec respect.",
    capsuleTitle:   "💊 Capsule du jour",
    capsuleReady:   "Pince et serre pour la faire éclater",
    capsuleNextIn:  ms => `Prochaine capsule dans ${ms}`,
    capsuleStockpile: "2 prêtes — éclate-les aujourd'hui !",
    capsuleEmpty:   "Toutes éclatées — reviens plus tard",
    lootXP:         amt => `+${amt} XP — continue !`,
    lootHint:       "🧩 Parchemin — Atomo a soufflé une recette",
    lootStabilizer: "❄️ Cryo-stabilisateur gardé pour un jour manqué",
    buddyTitle:     "Ton compagnon",
    buddyStreak:    n => n === 1 ? "1 jour d'affilée" : `${n} jours d'affilée`,
    buddyDormant:   "Découvre une molécule aujourd'hui pour le réveiller",
    buddyStabilizers: "Stabilisateurs",
    buddyNext:      n => `Encore ${n} jour${n === 1 ? "" : "s"} pour évoluer`,
    stagePrefix:    "Stade"
  }
};

// Atom names in French (English names live in data.js).
export const ATOM_NAMES_FR = {
  H: "Hydrogène", C: "Carbone", N: "Azote", O: "Oxygène",
  Na: "Sodium",   S: "Soufre",  Cl: "Chlore"
};

// Soft "level 1" hint copy, picked by molecule type. Reveals the family,
// not the atoms — leaves the player room to puzzle it out.
export const TYPE_NUDGES = {
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
export const TERMS_FR = {
  // categories
  inorganic: "inorganique", organic: "organique", myth: "mythe", forbidden: "interdite",
  vitamin: "vitamine",
  // types
  oxide: "oxyde", salt: "sel", hydrocarbon: "hydrocarbure", alcohol: "alcool",
  base: "base", acid: "acide", sugar: "sucre", pharmaceutical: "médicament",
  alkaloid: "alcaloïde", element: "élément", peroxide: "peroxyde",
  ketone: "cétone", aldehyde: "aldéhyde", fictional: "fictionnel",
  toxin: "toxine", explosive: "explosif", choking: "gaz suffocant",
  "water-soluble": "hydrosoluble", "fat-soluble": "liposoluble",
  // rarities
  common: "commun", uncommon: "peu commun", rare: "rare", epic: "épique"
};

// French translations of the molecule content, keyed by molecule id.
export const MOL_FR = {
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
  },

  /* ----- Myth Vault ----- */
  mol_myth_001: {
    commonName: "Kryptonite", iupacName: "Cristal luminescent à six sodiums",
    description: "Un cristal vert fluorescent qui émet une fréquence alpha inconnue. Censé affaiblir les visiteurs d'une étoile mourante — sur notre paillasse, il se contente de briller.",
    uses: ["Neutraliser les visiteurs super-puissants", "Le ressort dramatique fiable depuis 1943", "Pièce maîtresse de costume", "Caillou fluorescent d'Halloween"],
    funFact: "La kryptonite est née dans un feuilleton radio Superman de 1943 — les scénaristes avaient besoin d'une excuse pour laisser partir le doubleur en vacances."
  },
  mol_myth_002: {
    commonName: "Adamantium", iupacName: "Treize-carbone indomptable",
    description: "Un alliage quasi indestructible de grappes de carbone très denses. De vrais alliages très durs existent — aucun n'est incassable, mais on a le droit de rêver.",
    uses: ["Renforcement squelettique", "Griffes de légende", "Ressort scénaristique BD", "Blindage de science-fiction"],
    funFact: "Lors des débuts de Wolverine en 1974, ses griffes étaient en os — l'adamantium a été ajouté plus tard pour transformer le personnage en celui que l'on connaît."
  },
  mol_myth_003: {
    commonName: "Mithril", iupacName: "Filigrane sodium-soufre-chlore",
    description: "Un métal argenté plus solide que l'acier et léger comme une plume — une seule cotte de mailles en mithril peut détourner la lance d'un troll des cavernes.",
    uses: ["Cottes de mailles pour hobbits", "Bijoux elfiques", "Minerai légendaire des jeux", "Forge des lames mythiques"],
    funFact: "Tolkien a inventé « mithril » dans sa langue sindarine ; le mot signifie en gros « gris-scintillant »."
  },
  mol_myth_004: {
    commonName: "Vibranium", iupacName: "Tétracarbure de tétrasodium",
    description: "Un métal d'origine météoritique qui boit l'énergie cinétique et la restitue en vibrations. Le minerai signature d'une nation africaine secrète.",
    uses: ["Boucliers anti-énergie", "Insonorisation de cités fictives", "Vibrations héroïques", "Recettes du box-office Marvel"],
    funFact: "Le vibranium apparaît dans Daredevil #13 (1966), trois ans avant la première apparition du Wakanda — le métal précède le pays qui le définit aujourd'hui."
  },
  mol_myth_005: {
    commonName: "Unobtanium", iupacName: "Pierre-vœu tous-éléments",
    description: "Un supraconducteur à température ambiante à masse négative et au réseau cristallin parfait. Les ingénieurs en rêvent depuis les années 1950. Ils attendent encore.",
    uses: ["Cités flottantes", "Moteurs antigravité", "Résoudre l'intrigue", "Le Graal des matériaux"],
    funFact: "« Unobtanium » était de l'argot d'ingénieur des années 1950 pour tout matériau dont rêve l'équipe. James Cameron a appuyé le clin d'œil dans Avatar (2009)."
  },
  mol_myth_006: {
    commonName: "Dilithium", iupacName: "Treillis warp à deux sodiums",
    description: "Un cristal qui régule la réaction matière-antimatière d'un moteur warp. Un dilithium fendu laisse un vaisseau à la dérive.",
    uses: ["Régulation du cœur warp", "Voyage supraluminique", "Épisodes huis-clos de Star Trek", "Monnaie d'échange klingonne"],
    funFact: "Le vrai dilithium (Li₂) existe comme molécule gazeuse fugace à deux atomes — Star Trek n'a emprunté que le nom, pour son côté futuriste."
  },
  mol_myth_007: {
    commonName: "Tibérium", iupacName: "Flèche tricarbone-hexasoufre",
    description: "Un cristal extraterrestre qui pousse en transformant tout ce qu'il touche en lui-même. Magnifique, lucratif, et déconseillé à mains nues.",
    uses: ["Armement de l'âge du tibérium", "Ressource stratégique en jeu", "Contamination atmosphérique", "Fin du monde au ralenti"],
    funFact: "Westwood Studios a nommé le tibérium d'après l'empereur romain Tibère — il leur fallait quelque chose de latino-futuriste pour ancrer l'univers Command & Conquer."
  },
  mol_myth_008: {
    commonName: "Naquadah", iupacName: "Minerai de Porte à cinq sodiums",
    description: "Un minerai supraconducteur d'une densité incroyable — le matériau de chaque Porte des Étoiles. Vaut la peine de se battre pour lui.",
    uses: ["Construction des Stargates", "Combustible de réacteurs avancés", "Monnaie de contrebande", "Carburant scénaristique sur dix saisons"],
    funFact: "Le naquadah a été inventé en cours de saison 1 de Stargate SG-1 pour expliquer rétroactivement la masse colossale des Portes — les scénaristes avaient besoin d'une excuse."
  },
  mol_myth_009: {
    commonName: "Élément Zéro", iupacName: "Pentaoxyde de pentazote (eezo)",
    description: "Une poussière bleue scintillante qui, traversée par un courant, courbe la masse des objets proches. Tout l'univers de Mass Effect tourne grâce à elle.",
    uses: ["Vaisseaux supraluminiques", "Pouvoirs biotiques", "Mini trous noirs sur commande", "Économies galactiques"],
    funFact: "Les scénaristes de Mass Effect ont choisi « élément zéro » pour évoquer une case manquante du tableau périodique — le numéro atomique 0 n'existe pas, mais ça sonne crédible."
  },
  mol_myth_010: {
    commonName: "Phlogistique", iupacName: "La substance du feu",
    description: "L'« élément du feu » que les chimistes du XVIIᵉ siècle croyaient s'échapper de tout ce qui brûle. Une théorie parfaitement respectable en 1700 — et un manuel d'erreur scientifique.",
    uses: ["Expliquer la combustion (mal)", "Manuels de chimie pré-Lavoisier", "Rappeler que la science se corrige", "Construction d'univers steampunk"],
    funFact: "La théorie du phlogistique a dominé la chimie pendant plus d'un siècle. La découverte de l'oxygène par Lavoisier en 1777 y a mis fin — réécrivant littéralement ce qu'est la combustion."
  },

  /* ----- Myth Vault — wave 2 ----- */
  mol_myth_011: {
    commonName: "Carbonite", iupacName: "Bloc de carbone à huit oxygènes",
    description: "Un alliage métallique surcongelé qui fige un contrebandier en pleine pose. Survit au voyage spatial, du plus bel effet sur un mur de Hutt.",
    uses: ["Encadrer les trophées de chasseur de primes", "Conservation de cargaison interstellaire", "Décoration murale intimidante", "Intérieur chez Jabba"],
    funFact: "Le vrai « carbonite » est un explosif à base de carbure de calcium — Star Wars n'a gardé que le nom pour sa sonorité techno-alien."
  },
  mol_myth_012: {
    commonName: "Cavorite", iupacName: "Voile d'hydrogène à neuf atomes",
    description: "Une poudre pâle qui isole les objets de la gravité. Glissez un store de cavorite à votre fenêtre, et votre maison victorienne s'élève vers la Lune.",
    uses: ["Vaisseaux antigravité vers la Lune", "Lever des gentlemen victoriens", "Lévitation steampunk", "Démonstrations de physique suspectes"],
    funFact: "Les Premiers Hommes dans la Lune (1901) précèdent de 14 ans la relativité générale d'Einstein — la cavorite passait alors pour de la hard SF respectable."
  },
  mol_myth_013: {
    commonName: "Éther", iupacName: "Quintessence pentacosmique",
    description: "Le cinquième élément mythique que les cosmologies anciennes croyaient remplir les cieux au-delà de l'air, la terre, l'eau et le feu. Banni de la physique par Michelson et Morley en 1887.",
    uses: ["Remplir les sphères célestes", "Porter la lumière dans le vide (à tort)", "Ancrer la cosmologie médiévale", "Marketing New Age contemporain"],
    funFact: "L'expérience Michelson-Morley de 1887 n'a trouvé aucune trace d'éther luminifère — ouvrant la voie à la relativité restreinte dix-huit ans plus tard."
  },
  mol_myth_014: {
    commonName: "Felix Felicis", iupacName: "Goutte de chance à sept sodiums",
    description: "Une potion dorée qui offre au buveur une journée parfaite. Brassée pendant six mois dans un chaudron de patience, et très fermement interdite aux examens.",
    uses: ["Mettre la chance en bouteille", "Victoires narratives invraisemblables", "Mauvaises décisions, parfaitement exécutées", "Contrebande aux examens scolaires"],
    funFact: "J.K. Rowling a plaisanté qu'en vrai, « on en boirait tous ». Le philtre apparaît dans Le Prince de sang-mêlé (2005)."
  },
  mol_myth_015: {
    commonName: "Materia", iupacName: "Gemme de Flux à carbone-soufre",
    description: "Un condensat cristallisé du Flux Vital d'une planète. Insérée dans une épée, l'orbe verte lance des sorts ; insérée dans un corps, elle peut briser le monde.",
    uses: ["Sorts insérés dans les armes", "Pierre précieuse de joaillerie", "Ressort de fin du monde", "Résidu de réacteur Mako"],
    funFact: "La materia est la réponse élégante de Final Fantasy VII au grind de sorts traditionnel — toute la magie d'un personnage se personnalise en sertissant des gemmes."
  },
  mol_myth_016: {
    commonName: "Mélange", iupacName: "Undécacarbone undécahydrure (épice)",
    description: "Une substance cannelle addictive récoltée dans les sécrétions des vers des sables. Bleuit les yeux, ouvre la conscience et plie l'espace pour les Navigateurs de la Guilde.",
    uses: ["Navigation supraluminique", "Visions prescientes", "Mainmise économique interstellaire", "Prolongation de vie à tout prix"],
    funFact: "Frank Herbert s'est inspiré de la dépendance au pétrole — écrit en 1965 pendant un boom moyen-oriental qu'il jugeait étrangement prophétique."
  },
  mol_myth_017: {
    commonName: "Orichalque", iupacName: "Tricarbone-trisodium-trisulfure",
    description: "L'alliage doré-cuivré mythique qui revêtait les temples de l'Atlantide. Peut-être réel et perdu ; peut-être jamais réel et Platon racontait simplement une belle histoire.",
    uses: ["Habillage des temples atlantes", "Matériau d'artisanat dans les RPG", "Monnaie de jeu vidéo", "Mystères d'archéologie"],
    funFact: "En 2015, des plongeurs au large de la Sicile ont remonté 39 lingots d'un alliage cuivre-zinc-plomb d'une épave de 600 av. J.-C. — certains classicistes y voient le vrai « orichalque »."
  },
  mol_myth_018: {
    commonName: "Carbonadium", iupacName: "Alliage undécacarbone irradié",
    description: "Un cousin radioactif de l'adamantium — un peu moins indestructible, un peu plus cancérigène. Sert quand un scénario exige que Wolverine galère vraiment.",
    uses: ["Lier du métal aux personnages qui guérissent trop bien", "Affaiblir Wolverine pour le drame", "Adamantium de bas budget", "Justifications hand-waving"],
    funFact: "Le carbonadium fait ses débuts dans X-Men #4 (1991) comme matériau gardant les tentacules d'Omega Red flexibles — Marvel avait besoin d'« exactement moins génial que l'adamantium »."
  },
  mol_myth_019: {
    commonName: "Inertron", iupacName: "Cuir nonacarbone-nonasodium",
    description: "Un alliage du XXVᵉ siècle absolument impénétrable et sans poids. Recouvre vaisseaux, armures, et la cité flottante de Niagara.",
    uses: ["Coques de vaisseaux en l'an 2419", "Armures pour tous", "Plates-formes portantes de cités entières", "Construction d'univers BD"],
    funFact: "L'inertron précède l'adamantium de 40 ans — Philip Francis Nowlan l'a inventé pour la première apparition de Buck Rogers en 1928."
  },
  mol_myth_020: {
    commonName: "Puits de Lazare", iupacName: "Élixir octahydrogène octoxyde",
    description: "Un fluide vert bouillonnant dans un bassin de pierre qui ressuscite les morts et inverse le vieillissement — au prix d'un moment de folie à chaque plongée.",
    uses: ["Ressusciter Ra's al Ghul (encore et encore)", "Retours dramatiques", "Cosmétiques regrettables", "Cures thermales pour vilains gothamites"],
    funFact: "Les Puits de Lazare apparaissent dans Batman #232 (1971). Ra's al Ghul a été ressuscité tant de fois que les scénaristes le rationnent désormais à une fois par an."
  },

  /* ----- Forbidden Shelf ----- */
  mol_forbidden_001: {
    commonName: "Cyanure d'hydrogène", iupacName: "Formonitrile",
    description: "Un gaz à l'odeur légère d'amande qui empêche les cellules d'utiliser l'oxygène. Mortel en quelques minutes à des concentrations plus petites qu'un grain de poussière.",
    uses: ["Extraction industrielle de l'or", "Fumigation industrielle, historiquement", "Arme chimique, interdite en 1925", "Référence en toxicologie médico-légale"],
    funFact: "Environ 5 % des personnes ne peuvent pas du tout sentir le cyanure d'hydrogène — un caprice glaçant de la génétique olfactive."
  },
  mol_forbidden_002: {
    commonName: "Hydrazine", iupacName: "Diazane",
    description: "Un liquide huileux à odeur d'ammoniaque qui s'enflamme au contact des bons métaux. Puissant propulseur de fusée — et cancérogène à doses minimes.",
    uses: ["Propulseurs d'attitude des engins spatiaux", "Capteur d'oxygène dans l'eau des chaudières", "Précurseur pharmaceutique", "Agent moussant pour certains plastiques"],
    funFact: "Le module lunaire d'Apollo carburait à l'hydrazine — un seul réservoir lui permettait de se poser sur la Lune ET de redécoller."
  },
  mol_forbidden_003: {
    commonName: "Nitrométhane", iupacName: "Nitrométhane",
    description: "Un liquide clair à l'odeur sucrée brûlé dans les moteurs de dragsters et coulé en charges creuses. Détone confiné et heurté.",
    uses: ["Carburant Top-Fuel en dragster", "Solvant industriel", "Charges minières et démolition", "Combustible de moteurs miniatures"],
    funFact: "L'attentat d'Oklahoma City de 1995 utilisait un mélange nitrométhane-engrais. Les achats en gros des deux composants sont surveillés aux États-Unis depuis."
  },
  mol_forbidden_004: {
    commonName: "Chlore", iupacName: "Dichlore",
    description: "Un gaz jaune-vert suffocant qui, dans tes poumons, se transforme en acide chlorhydrique. Première arme de destruction massive lâchée sur le front occidental en 1915.",
    uses: ["Désinfection de l'eau municipale", "Fabrication du PVC", "Blanchiment industriel", "Arme chimique, Ypres 1915"],
    funFact: "La trace de chlore dans ton eau du robinet (~1 ppm) protège un milliard de gens des maladies hydriques — la même molécule qui a tué à Ypres sauve plus de vies que presque toute autre."
  },
  mol_forbidden_005: {
    commonName: "Phosgène", iupacName: "Dichlorure de carbonyle",
    description: "Un gaz incolore à l'odeur faible de foin coupé — qui dissout les tissus pulmonaires des heures après une seule inspiration. Responsable d'environ 80 % des morts par gaz de la Grande Guerre.",
    uses: ["Fabrication du polycarbonate", "Synthèse pharmaceutique", "Intermédiaire pour pesticides", "Arme chimique, 1914-1918"],
    funFact: "Toujours produit industriellement aujourd'hui — plus d'un million de tonnes par an — presque entièrement pour fabriquer les plastiques polycarbonates de tes verres de lunettes."
  },
  mol_forbidden_006: {
    commonName: "TNT", iupacName: "2,4,6-Trinitrotoluène",
    description: "Des cristaux jaunes pâles qui ressemblent à du sucre et détonent sur commande — mais ne sautent ni quand on les laisse tomber, ni quand on les brûle ou les tire. Explosif militaire standard depuis plus d'un siècle.",
    uses: ["Explosif militaire de référence", "Démolition minière", "Unité d'énergie (1 t TNT ≈ 4,18 GJ)", "Recherche sur les ondes de choc"],
    funFact: "Les bombes atomiques sont mesurées en « kilotonnes de TNT » précisément parce que l'énergie par kilogramme du TNT est si bien caractérisée (4,184 mégajoules)."
  },
  mol_forbidden_007: {
    commonName: "Nitroglycérine", iupacName: "Trinitrate de propan-1,2,3-triyle",
    description: "Un liquide huileux clair si instable qu'un éternuement suffisait à l'allumer — jusqu'à ce qu'Alfred Nobel la stabilise en dynamite. Aujourd'hui aussi un médicament pour le cœur.",
    uses: ["Dynamite (brevet Nobel 1867)", "Vasodilatateur cardiaque", "Charges de démolition", "Poudre sans fumée"],
    funFact: "La molécule qui a tué le frère de Nobel a aussi financé le prix Nobel — Alfred l'a créé après qu'un journal français a publié par erreur sa nécrologie comme « le marchand de la mort »."
  },
  mol_forbidden_008: {
    commonName: "Acide picrique", iupacName: "2,4,6-Trinitrophénol",
    description: "Des cristaux jaune vif jadis utilisés pour teindre la soie — jusqu'à ce que les chimistes réalisent qu'ils étaient aussi plus puissants que le TNT. Aujourd'hui, cauchemar des vieux labos : sec et vieilli, il détone au toucher.",
    uses: ["Teinture textile jaune (aujourd'hui interdite)", "Obus d'artillerie de la Grande Guerre", "Antiseptique pour brûlures, historiquement", "Cas d'école pour les déchets dangereux"],
    funFact: "Les obus français de 1914-1918 étaient bourrés d'acide picrique (nom de code « mélinite »). L'explosion d'Halifax en 1917 a brièvement détenu le record de la plus grande déflagration non nucléaire de l'histoire."
  },
  mol_forbidden_009: {
    commonName: "Gaz moutarde", iupacName: "Sulfure de bis(2-chloroéthyle)",
    description: "Un liquide huileux jaune-brun qui cloque la peau, aveugle les yeux et brûle les poumons au contact. L'arme chimique qui a défini « arme chimique » — et qui suinte encore des obus belges et français centenaires.",
    uses: ["Arme chimique (interdite, Protocole de Genève 1925)", "Ancêtre réticent de la chimiothérapie (mécloréthamine)", "Entraînement à la décontamination", "Avertissement historique"],
    funFact: "L'étude des victimes du gaz moutarde de 1914-1918 a conduit à la première chimiothérapie moderne — le même mécanisme ADN qui tuait les soldats stoppe les cellules cancéreuses."
  },
  mol_forbidden_010: {
    commonName: "Cyanure de sodium", iupacName: "Cyanure de sodium",
    description: "Une poudre blanche utilisée pour extraire l'or de la roche — et le poison classique des romans policiers. Une pincée tue en quelques minutes.",
    uses: ["Lixiviation aurifère en mine", "Électroplaquage", "Fumigation industrielle", "Référence en toxicologie médico-légale"],
    funFact: "L'extraction moderne de l'or produit environ 90 % de l'or mondial par lixiviation au cyanure de sodium dilué — industrie strictement réglementée depuis plusieurs ruptures de digues historiques."
  },

  /* ----- Vitamin Family ----- */
  mol_vit_001: {
    commonName: "Vitamine C", iupacName: "Acide L-ascorbique",
    description: "La molécule qui prévient le scorbut. Ton corps ne sait pas la fabriquer — chaque gramme doit venir de ton alimentation.",
    uses: ["Synthèse du collagène", "Absorption du fer végétal", "Antioxydant cellulaire", "Guérit le scorbut des marins depuis 1747"],
    funFact: "Les humains, les cochons d'Inde et la plupart des singes sont parmi les rares mammifères incapables de fabriquer la vitamine C — un gène cassé pour l'enzyme finale. Le scorbut est le prix de cette mutation."
  },
  mol_vit_002: {
    commonName: "Vitamine D3", iupacName: "Cholécalciférol",
    description: "La « vitamine du soleil » — ta peau la photosynthétise vraiment quand les UVB frappent un précurseur de cholestérol. Sors cette carte dehors pour l'activer.",
    uses: ["Absorption du calcium", "Densité osseuse", "Signalisation immunitaire", "Régulation de l'humeur en hiver"],
    funFact: "Le 7-déhydrocholestérol de ta peau capte un photon UVB et se réarrange en vitamine D₃ — une des seules réactions photochimiques que les humains font sur eux-mêmes."
  },
  mol_vit_003: {
    commonName: "Vitamine A", iupacName: "Rétinol tout-trans",
    description: "La vitamine de la vision nocturne. Ta rétine la convertit en rétinal — la molécule qui change physiquement de forme quand un photon la frappe.",
    uses: ["Vision en faible luminosité (rétinal)", "Santé de la peau et des muqueuses", "Cellules immunitaires", "Développement embryonnaire"],
    funFact: "Pendant la Seconde Guerre, la propagande britannique attribuait la vision nocturne des pilotes de la RAF aux carottes — c'était une couverture pour cacher leur nouveau radar."
  },
  mol_vit_004: {
    commonName: "Vitamine E", iupacName: "α-Tocophérol",
    description: "Ton antioxydant dans les graisses. Elle se loge dans les membranes cellulaires et intercepte les radicaux libres avant qu'ils n'endommagent la bicouche lipidique.",
    uses: ["Antioxydant membranaire", "Cosmétiques", "Empêche le rancissement des graisses polyinsaturées", "Recherche cardiovasculaire"],
    funFact: "Huit formes chimiques différentes de vitamine E existent ; ton foie ne garde préférentiellement que l'α-tocophérol. Les autres repartent dans la bile en quelques heures."
  },
  mol_vit_005: {
    commonName: "Acide folique", iupacName: "Folate (vitamine B9)",
    description: "La vitamine qui construit les nouvelles cellules. Critique dans les premières semaines de grossesse — les anomalies du tube neural chutent quand les futures mamans en consomment assez.",
    uses: ["Synthèse et réparation de l'ADN", "Production de globules rouges", "Développement du tube neural", "Prévention de l'anémie mégaloblastique"],
    funFact: "« Folate » vient de feuillage — isolée pour la première fois dans des épinards en 1941. L'enrichissement de la farine aux États-Unis (1998) a réduit les anomalies du tube neural d'environ 30 % en quelques années."
  },
  mol_vit_006: {
    commonName: "Vitamine B6", iupacName: "Pyridoxine",
    description: "Ton couteau suisse des acides aminés. La B6 (en pyridoxal phosphate) est le cofacteur de plus de 140 enzymes — presque chaque réaction qui déplace un azote.",
    uses: ["Métabolisme des acides aminés", "Synthèse de neurotransmetteurs (sérotonine, dopamine)", "Production d'hémoglobine", "Décomposition du glycogène"],
    funFact: "La B6 détient le record du plus grand nombre de réactions enzymatiques pour un cofacteur vitaminique unique — plus de 140 connues."
  },
  mol_vit_007: {
    commonName: "Vitamine K1", iupacName: "Phylloquinone",
    description: "La vitamine de la coagulation — sans elle, même une petite coupure ne s'arrêterait pas. Fabriquée par les plantes dans leurs chloroplastes.",
    uses: ["Activation des facteurs de coagulation (II, VII, IX, X)", "Signalisation osseuse", "Antidote du surdosage à la warfarine", "Injection néonatale à la naissance"],
    funFact: "Le K vient de « Koagulation » — le biochimiste danois Henrik Dam l'a nommée en 1929. Il a partagé le prix Nobel 1943 pour cette découverte."
  },
  mol_vit_008: {
    commonName: "Riboflavine", iupacName: "Vitamine B2",
    description: "La vitamine jaune néon brillant. Ton corps en fait du FAD et du FMN — les cofacteurs navettes d'énergie au cœur de chaque respiration.",
    uses: ["Métabolisme énergétique (FAD/FMN)", "Maintenance des globules rouges", "Santé des yeux et de la peau", "Colorant alimentaire jaune (E101)"],
    funFact: "La riboflavine est le jaune vif de ton complément multivitaminé — et la raison pour laquelle ton urine devient jaune fluo après. Le corps excrète ce qu'il n'utilise pas tout de suite."
  },
  mol_vit_009: {
    commonName: "Niacine", iupacName: "Acide nicotinique (vitamine B3)",
    description: "Ton usine à NAD/NADP. La niacine fabrique les cofacteurs qui transportent les électrons à haute énergie que tes mitochondries brûlent.",
    uses: ["Synthèse des cofacteurs NAD+/NADP+", "Thérapie hypocholestérolémiante à forte dose", "« Flush » cutané", "Enrichissement de la farine"],
    funFact: "Une carence en niacine cause la pellagre — historiquement les « quatre D » : diarrhée, dermatite, démence, décès. Éradiquée aux États-Unis dans les années 1940 grâce à l'enrichissement de la farine."
  },
  mol_vit_010: {
    commonName: "Biotine", iupacName: "Vitamine B7",
    description: "La vitamine des cheveux et des ongles — mais surtout, le porteur de CO₂ de ton corps dans le métabolisme des acides gras et des acides aminés.",
    uses: ["Cofacteur de synthèse des acides gras", "Néoglucogenèse", "Santé peau, cheveux, ongles (complément populaire)", "Marquage moléculaire avec la streptavidine"],
    funFact: "Les blancs d'œuf CRUS bloquent l'absorption de biotine — ils contiennent de l'avidine, qui lie la biotine si fortement qu'elle sert en biologie moléculaire comme l'une des liaisons non covalentes les plus solides connues. Cuis tes œufs."
  }
};
