/* ============================================================
   Game content — badges, missions, mascot lines, the XP table
   and the daily-puzzle picker. Ported from the vanilla game.js.

   The badge `check` and mission `progress` callbacks are pure:
   they take a `stats` bundle (see buildStats) instead of reading
   globals, so GameContext can evaluate them at any time.

   This module is catalog-agnostic — every function that needs to
   iterate molecules or atoms takes them as parameters. Callers
   pull them from useCatalog() and pass them in.
   ============================================================ */

import { TIER_UNLOCK } from "./progression.js";

/* ---------- XP economy ---------- */
export const MISSION_XP = 100;
export const BADGE_XP = 60;
export const DAILY_XP = 150;

// XP for a discovery — bigger tiers pay more, shiny doubles it.
export function discoveryXP(m, shiny) {
  return (40 + m.tier * 20) * (shiny ? 2 : 1);
}

/* ---------- collection stats ----------
   One bundle of derived counts, rebuilt from the discoveries map
   whenever badges / missions need re-evaluating. */
export function buildStats({ discoveries, unlockedAtoms, molecules, atoms }) {
  const mols = molecules || [];
  const allAtomSyms = (atoms || []).map((a) => a.symbol);
  const found = mols.filter((m) => discoveries[m.id]);
  // atoms unlocked beyond the four free starters (H, O, C, N) — the
  // count of "Choose Your Path" picks the player has actually spent.
  const STARTERS = new Set(["H", "O", "C", "N"]);
  const earnedAtoms = (unlockedAtoms || []).filter((s) => !STARTERS.has(s));
  return {
    count: found.length,
    total: mols.length,
    shiny: found.filter((m) => discoveries[m.id]?.shiny).length,
    byType: (type) => found.filter((m) => m.type === type).length,
    byCat: (cat) => found.filter((m) => m.category === cat).length,
    totalType: (type) => mols.filter((m) => m.type === type).length,
    totalCat: (cat) => mols.filter((m) => m.category === cat).length,
    tierCount: (tier) => found.filter((m) => m.tier === tier).length,
    tierAtLeast: (tier) => found.filter((m) => m.tier >= tier).length,
    allAtoms: allAtomSyms.every((s) => unlockedAtoms.includes(s)),
    // atom-branch helpers — used by phosphate/iron/calcium/... badges
    withAtom: (sym) => found.filter((m) => m.atoms[sym]).length,
    totalWithAtom: (sym) => mols.filter((m) => m.atoms[sym]).length,
    unlockedAtomCount: (unlockedAtoms || []).length,
    earnedAtomCount: earnedAtoms.length,
  };
}

/* ---------- badges — earned once, checked after every discovery ---------- */
export const BADGES = [
  { id: "first",       icon: "🔬", en: "First Find",         fr: "Première trouvaille",      check: (s) => s.count >= 1 },
  { id: "five",        icon: "🧪", en: "Apprentice",         fr: "Apprenti",                 check: (s) => s.count >= 5 },
  { id: "ten",         icon: "⚗️", en: "Chemist",            fr: "Chimiste",                 check: (s) => s.count >= 10 },
  { id: "twentyfive",  icon: "🥼", en: "Bench Veteran",      fr: "Vétéran de paillasse",     check: (s) => s.count >= 25 },
  { id: "fifty",       icon: "🎓", en: "Senior Researcher",  fr: "Chercheur confirmé",       check: (s) => s.count >= 50 },
  { id: "hundred",     icon: "💯", en: "Centurion",          fr: "Centurion",                check: (s) => s.count >= 100 },
  { id: "all",         icon: "🏆", en: "Dex Master",         fr: "Maître du Dex",            check: (s) => s.count >= s.total },
  { id: "acids",       icon: "🍋", en: "Acid Master",        fr: "Maître des acides",        check: (s) => s.byType("acid") >= s.totalType("acid") },
  { id: "organic",     icon: "🌿", en: "Life Expert",        fr: "Expert du vivant",         check: (s) => s.byCat("organic") >= s.totalCat("organic") },
  { id: "inorganic",   icon: "🪨", en: "Mineral Expert",     fr: "Expert minéral",           check: (s) => s.byCat("inorganic") >= s.totalCat("inorganic") },
  { id: "shiny1",      icon: "✨", en: "Shiny Hunter",       fr: "Chasseur brillant",        check: (s) => s.shiny >= 1 },
  { id: "shiny3",      icon: "⭐", en: "Star Collector",     fr: "Collectionneur",           check: (s) => s.shiny >= 3 },
  { id: "tier4",       icon: "🚀", en: "Master Builder",     fr: "Bâtisseur expert",         check: (s) => s.tierCount(4) >= 1 },
  // atom unlock progression
  { id: "frontier",    icon: "🧭", en: "Frontier Explorer",  fr: "Explorateur des frontières", check: (s) => s.earnedAtomCount >= 4 },
  { id: "atoms_all",   icon: "🧬", en: "Element Hunter",     fr: "Chasseur d'éléments",      check: (s) => s.allAtoms },
  // atom-branch mastery (each fires when every molecule using that element is found)
  { id: "calcium",     icon: "🦴", en: "Stone Mason",        fr: "Tailleur de pierre",       check: (s) => s.totalWithAtom("Ca") > 0 && s.withAtom("Ca") >= s.totalWithAtom("Ca") },
  { id: "iron",        icon: "⚒️", en: "Iron Smith",         fr: "Forgeron",                 check: (s) => s.totalWithAtom("Fe") > 0 && s.withAtom("Fe") >= s.totalWithAtom("Fe") },
  { id: "phosphate",   icon: "🌱", en: "Phosphate Adept",    fr: "Adepte des phosphates",    check: (s) => s.totalWithAtom("P") > 0 && s.withAtom("P") >= s.totalWithAtom("P") },
  { id: "halogen",     icon: "💎", en: "Halogen Hunter",     fr: "Chasseur d'halogènes",     check: (s) => s.totalWithAtom("F") > 0 && s.withAtom("F") >= s.totalWithAtom("F") },
];

/* ---------- missions — a checklist; each grants XP once ---------- */
export const MISSIONS = [
  { id: "m_first",     icon: "🎯", en: "Discover your first molecule",     fr: "Découvre ta première molécule",        target: 1,   progress: (s) => s.count },
  { id: "m_three",     icon: "🎯", en: "Discover 3 molecules",             fr: "Découvre 3 molécules",                 target: 3,   progress: (s) => s.count },
  { id: "m_organic",   icon: "🌿", en: "Discover an organic molecule",     fr: "Découvre une molécule organique",      target: 1,   progress: (s) => s.byCat("organic") },
  { id: "m_acid",      icon: "🧪", en: "Discover an acid",                 fr: "Découvre un acide",                    target: 1,   progress: (s) => s.byType("acid") },
  { id: "m_inorg3",    icon: "🪨", en: "Discover 3 inorganic molecules",   fr: "Découvre 3 molécules inorganiques",    target: 3,   progress: (s) => s.byCat("inorganic") },
  { id: "m_tier2",     icon: "🔓", en: "Discover a Tier 2+ molecule",      fr: "Découvre une molécule de palier 2+",   target: 1,   progress: (s) => s.tierAtLeast(2) },
  { id: "m_shiny",     icon: "✨", en: "Find a shiny molecule",            fr: "Trouve une molécule brillante",        target: 1,   progress: (s) => s.shiny },
  { id: "m_ten",       icon: "⚗️", en: "Discover 10 molecules",            fr: "Découvre 10 molécules",                target: 10,  progress: (s) => s.count },
  { id: "m_unlock1",   icon: "⚛️", en: "Unlock your first new element",    fr: "Débloque ton premier nouvel élément",  target: 1,   progress: (s) => s.earnedAtomCount },
  { id: "m_allacid",   icon: "🍋", en: "Discover all 12 acids",            fr: "Découvre les 12 acides",               target: 12,  progress: (s) => s.byType("acid") },
  { id: "m_twenty5",   icon: "🥼", en: "Discover 25 molecules",            fr: "Découvre 25 molécules",                target: 25,  progress: (s) => s.count },
  { id: "m_phosphate", icon: "🌱", en: "Discover a phosphorus compound",   fr: "Découvre un composé de phosphore",     target: 1,   progress: (s) => s.withAtom("P") },
  { id: "m_calcium3",  icon: "🦴", en: "Discover 3 calcium compounds",     fr: "Découvre 3 composés du calcium",       target: 3,   progress: (s) => s.withAtom("Ca") },
  { id: "m_iron",      icon: "⚒️", en: "Find rust (or another iron find)", fr: "Trouve de la rouille (ou un autre fer)", target: 1, progress: (s) => s.withAtom("Fe") },
  { id: "m_fifty",     icon: "🎓", en: "Discover 50 molecules",            fr: "Découvre 50 molécules",                target: 50,  progress: (s) => s.count },
  { id: "m_allatoms",  icon: "🧬", en: "Unlock every element",             fr: "Débloque tous les éléments",           target: 1,   progress: (s) => (s.allAtoms ? 1 : 0) },
  { id: "m_hundred",   icon: "💯", en: "Discover 100 molecules",           fr: "Découvre 100 molécules",               target: 100, progress: (s) => s.count },
];

/* ---------- Atomo the mascot ---------- */
export const MASCOT = {
  greet:    [{ en: "Hi! I'm Atomo. Let's build some molecules!", fr: "Salut ! Je suis Atomo. Construisons des molécules !" },
             { en: "Welcome back! Ready to discover more?",      fr: "Te revoilà ! Prêt à découvrir encore ?" }],
  discover: [{ en: "Amazing! You found a new one!",              fr: "Génial ! Tu en as trouvé une nouvelle !" },
             { en: "Wow, great chemistry!",                      fr: "Waouh, belle chimie !" },
             { en: "Nice! Add it to your Dex!",                  fr: "Bravo ! Ajoute-la à ton Dex !" }],
  shiny:    [{ en: "✨ A SHINY one!! Super rare!!",               fr: "✨ Une BRILLANTE !! Super rare !!" }],
  levelUp:  [{ en: "You levelled up! So smart!",                 fr: "Tu as gagné un niveau ! Trop fort !" }],
  fail:     [{ en: "Hmm, that didn't bond. Try again!",          fr: "Hmm, ça n'a pas réagi. Réessaie !" }],
  idle:     [{ en: "Stuck? Tap me for a hint!",                  fr: "Bloqué ? Touche-moi pour un indice !" }],
  welcomeBack: [
    { en: "Welcome back! I found something to show you 👀",      fr: "Te revoilà ! J'ai un truc à te montrer 👀" },
    { en: "There you are! Ready to discover more?",              fr: "Te voilà ! Prêt à découvrir encore ?" },
  ],
  // when an impossible combination yields a Myth Vault entry — the
  // mascot's "reality just broke" line under the glitch cinematic
  mythStruck: [
    { en: "I… I don't think that's chemistry anymore. ✦",         fr: "Je… ce n'est plus de la chimie. ✦" },
    { en: "The instruments are reading FICTION. How?!",           fr: "Les instruments lisent FICTION. Comment ?!" },
    { en: "That's not in the periodic table — that's in a comic.", fr: "Ce n'est pas dans le tableau périodique — c'est dans une BD." },
  ],
  // the Hazmat-officer voice — fires once the Leak is breached
  hazmatLine: [
    { en: "Dangerous things in here. Look — but don't get hurt.", fr: "Choses dangereuses ici. Regarde — mais ne te blesse pas." },
    { en: "All this stuff is real. Treat it that way.",            fr: "Tout ça est bien réel. Traite-le comme tel." },
  ],
};

// Random line from a mascot category, in the active language.
export function mascotLine(key, lang) {
  const arr = MASCOT[key];
  const line = arr[Math.floor(Math.random() * arr.length)];
  return line[lang] || line.en;
}

// "2 × H + 1 × O" — the literal atom recipe, used by hints and the daily box.
export function atomRecipe(m) {
  return Object.entries(m.atoms)
    .map(([sym, n]) => `${n} × ${sym}`)
    .join(" + ");
}

// How many molecules use a given element — shown on path cards.
export function moleculesWithAtom(sym, molecules) {
  return (molecules || []).filter((m) => m.atoms[sym]).length;
}

/* ---------- daily puzzle ---------- */

// Local date as YYYY-MM-DD.
export function todayStr(d = new Date()) {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

// Tiny string hash so everyone gets the same pick on the same day.
function dailySeed(dateStr) {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Pick the day's puzzle from molecules the player can actually build now.
export function pickDailyPuzzle(dateStr, discoveries, unlockedAtoms, molecules) {
  const mols = molecules || [];
  const count = mols.filter((m) => discoveries[m.id]).length;
  const tierOk = (tier) => count >= (TIER_UNLOCK[tier] || 0);
  const buildable = (m) => Object.keys(m.atoms).every((s) => unlockedAtoms.includes(s));
  // myths + forbidden are stumble-upon / breach discoveries — never picked
  const pool = mols.filter(
    (m) =>
      m.category !== "myth" &&
      m.category !== "forbidden" &&
      tierOk(m.tier) &&
      buildable(m)
  );
  if (pool.length === 0) return null;
  return pool[dailySeed(dateStr) % pool.length];
}
