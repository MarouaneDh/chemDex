/* ============================================================
   Game content — badges, missions, mascot lines, the XP table
   and the daily-puzzle picker. Ported from the vanilla game.js.

   The badge `check` and mission `progress` callbacks are pure:
   they take a `stats` bundle (see buildStats) instead of reading
   globals, so GameContext can evaluate them at any time.
   ============================================================ */

import { MOLECULES, ATOMS } from "../data/gamedata.js";
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
export function buildStats(discoveries, unlockedAtoms) {
  const found = MOLECULES.filter((m) => discoveries[m.id]);
  return {
    count: found.length,
    total: MOLECULES.length,
    shiny: found.filter((m) => discoveries[m.id]?.shiny).length,
    byType: (type) => found.filter((m) => m.type === type).length,
    byCat: (cat) => found.filter((m) => m.category === cat).length,
    totalType: (type) => MOLECULES.filter((m) => m.type === type).length,
    totalCat: (cat) => MOLECULES.filter((m) => m.category === cat).length,
    tierCount: (tier) => found.filter((m) => m.tier === tier).length,
    tierAtLeast: (tier) => found.filter((m) => m.tier >= tier).length,
    allAtoms: ATOMS.every((a) => unlockedAtoms.includes(a.symbol)),
  };
}

/* ---------- badges — earned once, checked after every discovery ---------- */
export const BADGES = [
  { id: "first",     icon: "🔬", en: "First Find",     fr: "Première trouvaille", check: (s) => s.count >= 1 },
  { id: "five",      icon: "🧪", en: "Apprentice",     fr: "Apprenti",            check: (s) => s.count >= 5 },
  { id: "ten",       icon: "⚗️", en: "Chemist",        fr: "Chimiste",            check: (s) => s.count >= 10 },
  { id: "all",       icon: "🏆", en: "Dex Master",     fr: "Maître du Dex",       check: (s) => s.count >= s.total },
  { id: "acids",     icon: "🍋", en: "Acid Master",    fr: "Maître des acides",   check: (s) => s.byType("acid") >= s.totalType("acid") },
  { id: "organic",   icon: "🌿", en: "Life Expert",    fr: "Expert du vivant",    check: (s) => s.byCat("organic") >= s.totalCat("organic") },
  { id: "inorganic", icon: "🪨", en: "Mineral Expert", fr: "Expert minéral",      check: (s) => s.byCat("inorganic") >= s.totalCat("inorganic") },
  { id: "shiny1",    icon: "✨", en: "Shiny Hunter",   fr: "Chasseur brillant",   check: (s) => s.shiny >= 1 },
  { id: "shiny3",    icon: "⭐", en: "Star Collector", fr: "Collectionneur",      check: (s) => s.shiny >= 3 },
  { id: "tier4",     icon: "🚀", en: "Master Builder", fr: "Bâtisseur expert",    check: (s) => s.tierCount(4) >= 1 },
  { id: "atoms_all", icon: "🧬", en: "Element Hunter", fr: "Chasseur d'éléments", check: (s) => s.allAtoms },
];

/* ---------- missions — a checklist; each grants XP once ---------- */
export const MISSIONS = [
  { id: "m_first",    icon: "🎯", en: "Discover your first molecule",   fr: "Découvre ta première molécule",      target: 1,  progress: (s) => s.count },
  { id: "m_three",    icon: "🎯", en: "Discover 3 molecules",           fr: "Découvre 3 molécules",               target: 3,  progress: (s) => s.count },
  { id: "m_organic",  icon: "🌿", en: "Discover an organic molecule",   fr: "Découvre une molécule organique",    target: 1,  progress: (s) => s.byCat("organic") },
  { id: "m_acid",     icon: "🧪", en: "Discover an acid",               fr: "Découvre un acide",                  target: 1,  progress: (s) => s.byType("acid") },
  { id: "m_inorg3",   icon: "🪨", en: "Discover 3 inorganic molecules", fr: "Découvre 3 molécules inorganiques",  target: 3,  progress: (s) => s.byCat("inorganic") },
  { id: "m_tier2",    icon: "🔓", en: "Discover a Tier 2+ molecule",    fr: "Découvre une molécule de palier 2+", target: 1,  progress: (s) => s.tierAtLeast(2) },
  { id: "m_shiny",    icon: "✨", en: "Find a shiny molecule",          fr: "Trouve une molécule brillante",      target: 1,  progress: (s) => s.shiny },
  { id: "m_ten",      icon: "⚗️", en: "Discover 10 molecules",          fr: "Découvre 10 molécules",              target: 10, progress: (s) => s.count },
  { id: "m_allacid",  icon: "🍋", en: "Discover all 7 acids",           fr: "Découvre les 7 acides",              target: 7,  progress: (s) => s.byType("acid") },
  { id: "m_complete", icon: "🏆", en: "Complete the whole Dex",         fr: "Complète tout le Dex",               target: 30, progress: (s) => s.count },
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

// How many molecules in the Dex use a given element — shown on path cards.
export function moleculesWithAtom(sym) {
  return MOLECULES.filter((m) => m.atoms[sym]).length;
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
export function pickDailyPuzzle(dateStr, discoveries, unlockedAtoms) {
  const count = MOLECULES.filter((m) => discoveries[m.id]).length;
  const tierOk = (tier) => count >= (TIER_UNLOCK[tier] || 0);
  const buildable = (m) => Object.keys(m.atoms).every((s) => unlockedAtoms.includes(s));
  // myths are stumble-upon discoveries — never picked as the daily prompt
  const pool = MOLECULES.filter(
    (m) => m.category !== "myth" && tierOk(m.tier) && buildable(m)
  );
  if (pool.length === 0) return null;
  return pool[dailySeed(dateStr) % pool.length];
}
