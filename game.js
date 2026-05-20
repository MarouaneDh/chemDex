/* ============================================================
   Chemdex — game layer
   Sound, XP / levels, badges, missions, mascot, confetti.
   Loaded after i18n.js, before app.js. Uses globals from those
   (MOLECULES, discoveries, lang, t, ...) only inside functions,
   so call-time resolution is fine.
   ============================================================ */

"use strict";

/* ---------- persistent game state ---------- */
const XP_KEY = "chemdex.xp";
const BADGE_KEY = "chemdex.badges";
const MISSION_KEY = "chemdex.missions";
const MUTE_KEY = "chemdex.muted";
const DAILY_KEY = "chemdex.daily";

let totalXP = Number(localStorage.getItem(XP_KEY)) || 0;
let earnedBadges = JSON.parse(localStorage.getItem(BADGE_KEY) || "[]");
let claimedMissions = JSON.parse(localStorage.getItem(MISSION_KEY) || "[]");
let muted = localStorage.getItem(MUTE_KEY) === "1";
let dailyState = JSON.parse(localStorage.getItem(DAILY_KEY) || "{}");
let gameSilent = false;   // true during init sync — suppresses fx

// pick the active-language string from a {en, fr} object
function L(o) { return (o && o[lang]) || (o && o.en) || ""; }

/* ============================================================
   CONTENT — clues, levels, badges, missions, mascot lines
   ============================================================ */

// Riddle clues shown on locked Dex cards (the puzzle).
const CLUES = {
  mol_001: { en: "Every living thing drinks me — two H's holding one O.",      fr: "Tout être vivant me boit — deux H tenant un O." },
  mol_002: { en: "You breathe me out; plants breathe me in.",                  fr: "Tu m'expires ; les plantes m'inspirent." },
  mol_003: { en: "I make food tasty and the sea salty.",                       fr: "Je rends la nourriture savoureuse et la mer salée." },
  mol_004: { en: "The simplest fuel — one carbon wearing four hydrogens.",     fr: "Le combustible le plus simple — un carbone et quatre hydrogènes." },
  mol_005: { en: "The 'alcohol' in hand sanitizer — two carbons, one O.",      fr: "L'« alcool » du gel hydroalcoolique — deux carbones, un O." },
  mol_006: { en: "A sharp-smelling cleaner — one nitrogen, three hydrogens.",  fr: "Un nettoyant à l'odeur piquante — un azote, trois hydrogènes." },
  mol_007: { en: "A powerful acid hiding inside car batteries.",               fr: "Un acide puissant caché dans les batteries de voiture." },
  mol_008: { en: "The sugar your body burns for energy.",                      fr: "Le sucre que ton corps brûle pour l'énergie." },
  mol_009: { en: "A famous pain-relief pill, first made from willow bark.",    fr: "Un célèbre comprimé antidouleur, issu de l'écorce de saule." },
  mol_010: { en: "What keeps coffee drinkers wide awake.",                     fr: "Ce qui tient les buveurs de café bien éveillés." },
  mol_011: { en: "Two of the same atom — and every breath needs me.",          fr: "Deux atomes identiques — et chaque respiration en a besoin." },
  mol_012: { en: "Like water, but with one extra oxygen — it disinfects.",     fr: "Comme l'eau, mais avec un oxygène en plus — il désinfecte." },
  mol_013: { en: "Water's dangerous cousin — one carbon, one oxygen.",         fr: "Le cousin dangereux de l'eau — un carbone, un oxygène." },
  mol_014: { en: "The acid in your stomach — one H, one Cl.",                  fr: "L'acide de ton estomac — un H, un Cl." },
  mol_015: { en: "Lye for making soap — sodium, oxygen and hydrogen.",         fr: "La soude pour fabriquer du savon — sodium, oxygène et hydrogène." },
  mol_016: { en: "A perfect ring of six carbons, each with a hydrogen.",       fr: "Un anneau parfait de six carbones, chacun avec un hydrogène." },
  mol_017: { en: "Mix me with water and you get vinegar.",                     fr: "Mélange-moi à de l'eau et tu obtiens du vinaigre." },
  mol_018: { en: "The gas in a barbecue tank — three carbons in a row.",       fr: "Le gaz d'une bouteille de barbecue — trois carbones à la suite." },
  mol_019: { en: "A strong acid used for fertilizer and fireworks.",           fr: "Un acide fort utilisé pour les engrais et les feux d'artifice." },
  mol_020: { en: "A volcano's choking gas — one sulfur, two oxygens.",         fr: "Le gaz suffocant d'un volcan — un soufre, deux oxygènes." },
  mol_021: { en: "The lightest gas — fills balloons that float upward.",        fr: "Le gaz le plus léger — il fait flotter les ballons vers le ciel." },
  mol_022: { en: "Most of every breath you take — but your body can't use it.", fr: "La plus grande partie de chaque souffle — mais ton corps ne peut pas l'utiliser." },
  mol_023: { en: "Wood alcohol — like ethanol, but with one fewer carbon.",     fr: "L'alcool de bois — comme l'éthanol, mais avec un carbone en moins." },
  mol_024: { en: "Smells like rotten eggs — two hydrogens hugging a sulfur.",   fr: "Sent l'œuf pourri — deux hydrogènes serrant un soufre." },
  mol_025: { en: "Strips off nail polish — a sharp-smelling solvent.",          fr: "Enlève le vernis à ongles — un solvant à l'odeur piquante." },
  mol_026: { en: "The fizzing powder bakers love — meets vinegar with a hiss.", fr: "La poudre effervescente des pâtissiers — siffle au contact du vinaigre." },
  mol_027: { en: "Preserves frogs in jars — one carbon, two H's, one O.",       fr: "Conserve les grenouilles dans des bocaux — un carbone, deux H, un O." },
  mol_028: { en: "Ant venom! The sting in a tiny bite.",                        fr: "Le venin de la fourmi ! La brûlure d'une minuscule piqûre." },
  mol_029: { en: "What ripens bananas — two carbons sharing a double bond.",    fr: "Ce qui fait mûrir les bananes — deux carbones unis par une double liaison." },
  mol_030: { en: "The smallest building block of every protein in you.",        fr: "La plus petite brique élémentaire de toutes tes protéines." }
};
function clueFor(m) { return L(CLUES[m.id]); }

// Tier difficulty curve — a tier unlocks at N total discoveries.
const TIER_UNLOCK = { 1: 0, 2: 3, 3: 8, 4: 13 };
function tierUnlocked(tier) { return discoveredCount() >= (TIER_UNLOCK[tier] || 0); }

// Levels — reached at a cumulative XP threshold.
const LEVELS = [
  { xp: 0,    en: "Curious Kid",     fr: "Petit curieux" },
  { xp: 200,  en: "Junior Chemist",  fr: "Chimiste junior" },
  { xp: 450,  en: "Lab Assistant",   fr: "Assistant de labo" },
  { xp: 750,  en: "Researcher",      fr: "Chercheur" },
  { xp: 1100, en: "Senior Chemist",  fr: "Chimiste confirmé" },
  { xp: 1550, en: "Mad Scientist",   fr: "Savant fou" },
  { xp: 2100, en: "Professor",       fr: "Professeur" },
  { xp: 2800, en: "Nobel Genius",    fr: "Génie Nobel" }
];

/* ---------- collection helpers ---------- */
function discoveredList()       { return MOLECULES.filter(m => discoveries[m.id]); }
function isShiny(id)            { return !!(discoveries[id] && discoveries[id].shiny); }
function shinyCount()           { return discoveredList().filter(m => isShiny(m.id)).length; }
function discByType(type)       { return discoveredList().filter(m => m.type === type).length; }
function discByCategory(cat)    { return discoveredList().filter(m => m.category === cat).length; }
function totalByType(type)      { return MOLECULES.filter(m => m.type === type).length; }
function totalByCategory(cat)   { return MOLECULES.filter(m => m.category === cat).length; }

// Badges — earned once, checked after every discovery.
const BADGES = [
  { id: "first",     icon: "🔬", en: "First Find",      fr: "Première trouvaille", check: () => discoveredCount() >= 1 },
  { id: "five",      icon: "🧪", en: "Apprentice",      fr: "Apprenti",            check: () => discoveredCount() >= 5 },
  { id: "ten",       icon: "⚗️", en: "Chemist",         fr: "Chimiste",            check: () => discoveredCount() >= 10 },
  { id: "all",       icon: "🏆", en: "Dex Master",      fr: "Maître du Dex",       check: () => discoveredCount() >= MOLECULES.length },
  { id: "acids",     icon: "🍋", en: "Acid Master",     fr: "Maître des acides",   check: () => discByType("acid") >= totalByType("acid") },
  { id: "organic",   icon: "🌿", en: "Life Expert",     fr: "Expert du vivant",    check: () => discByCategory("organic") >= totalByCategory("organic") },
  { id: "inorganic", icon: "🪨", en: "Mineral Expert",  fr: "Expert minéral",      check: () => discByCategory("inorganic") >= totalByCategory("inorganic") },
  { id: "shiny1",    icon: "✨", en: "Shiny Hunter",    fr: "Chasseur brillant",   check: () => shinyCount() >= 1 },
  { id: "shiny3",    icon: "⭐", en: "Star Collector",  fr: "Collectionneur",      check: () => shinyCount() >= 3 },
  { id: "tier4",     icon: "🚀", en: "Master Builder",  fr: "Bâtisseur expert",    check: () => discoveredList().some(m => m.tier === 4) }
];

// Missions — a checklist; each grants XP once when first completed.
const MISSIONS = [
  { id: "m_first",    icon: "🎯", en: "Discover your first molecule",        fr: "Découvre ta première molécule",        target: 1,  progress: () => discoveredCount() },
  { id: "m_three",    icon: "🎯", en: "Discover 3 molecules",                fr: "Découvre 3 molécules",                 target: 3,  progress: () => discoveredCount() },
  { id: "m_organic",  icon: "🌿", en: "Discover an organic molecule",        fr: "Découvre une molécule organique",      target: 1,  progress: () => discByCategory("organic") },
  { id: "m_acid",     icon: "🧪", en: "Discover an acid",                    fr: "Découvre un acide",                    target: 1,  progress: () => discByType("acid") },
  { id: "m_inorg3",   icon: "🪨", en: "Discover 3 inorganic molecules",      fr: "Découvre 3 molécules inorganiques",    target: 3,  progress: () => discByCategory("inorganic") },
  { id: "m_tier2",    icon: "🔓", en: "Discover a Tier 2+ molecule",         fr: "Découvre une molécule de palier 2+",   target: 1,  progress: () => discoveredList().filter(m => m.tier >= 2).length },
  { id: "m_shiny",    icon: "✨", en: "Find a shiny molecule",               fr: "Trouve une molécule brillante",        target: 1,  progress: () => shinyCount() },
  { id: "m_ten",      icon: "⚗️", en: "Discover 10 molecules",               fr: "Découvre 10 molécules",                target: 10, progress: () => discoveredCount() },
  { id: "m_allacid",  icon: "🍋", en: "Discover all 7 acids",                fr: "Découvre les 7 acides",                target: 7,  progress: () => discByType("acid") },
  { id: "m_complete", icon: "🏆", en: "Complete the whole Dex",              fr: "Complète tout le Dex",                 target: 30, progress: () => discoveredCount() }
];

const MISSION_XP = 100;
const BADGE_XP = 60;

// Mascot — Atomo the friendly atom.
const MASCOT = {
  greet:    [{ en: "Hi! I'm Atomo. Let's build some molecules!", fr: "Salut ! Je suis Atomo. Construisons des molécules !" },
             { en: "Welcome back! Ready to discover more?",       fr: "Te revoilà ! Prêt à découvrir encore ?" }],
  discover: [{ en: "Amazing! You found a new one!",               fr: "Génial ! Tu en as trouvé une nouvelle !" },
             { en: "Wow, great chemistry!",                       fr: "Waouh, belle chimie !" },
             { en: "Nice! Add it to your Dex!",                   fr: "Bravo ! Ajoute-la à ton Dex !" }],
  shiny:    [{ en: "✨ A SHINY one!! Super rare!!",                fr: "✨ Une BRILLANTE !! Super rare !!" }],
  levelUp:  [{ en: "You levelled up! So smart!",                  fr: "Tu as gagné un niveau ! Trop fort !" }],
  fail:     [{ en: "Hmm, that didn't bond. Try again!",           fr: "Hmm, ça n'a pas réagi. Réessaie !" }],
  idle:     [{ en: "Stuck? Tap me for a hint!",                   fr: "Bloqué ? Touche-moi pour un indice !" }]
};
function mascotLine(key) {
  const a = MASCOT[key];
  return L(a[Math.floor(Math.random() * a.length)]);
}

/* ============================================================
   SOUND — synthesized with the Web Audio API (no audio files)
   ============================================================ */

let actx = null;
function audioCtx() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === "suspended") actx.resume();
  return actx;
}
// one short tone
function tone(freq, dur, type, vol, delay) {
  if (muted) return;
  const c = audioCtx();
  const t0 = c.currentTime + (delay || 0);
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  osc.connect(gain); gain.connect(c.destination);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(vol || 0.18, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.start(t0); osc.stop(t0 + dur + 0.02);
}
function chord(freqs, dur, type, vol, step) {
  freqs.forEach((f, i) => tone(f, dur, type, vol, i * (step || 0.09)));
}
const SFX = {
  pop:      () => tone(440, 0.12, "sine", 0.16),
  place:    () => tone(300, 0.10, "triangle", 0.13),
  click:    () => tone(540, 0.07, "square", 0.07),
  success:  () => chord([523, 659, 784], 0.32, "triangle", 0.18),
  fail:     () => { tone(180, 0.22, "sawtooth", 0.12); tone(120, 0.3, "sawtooth", 0.1, 0.07); },
  sparkle:  () => chord([880, 1175, 1568, 2093], 0.26, "sine", 0.1, 0.055),
  levelUp:  () => chord([523, 659, 784, 1047], 0.4, "triangle", 0.2, 0.12),
  badge:    () => chord([659, 988], 0.3, "sine", 0.16, 0.1),
  mission:  () => chord([784, 1047], 0.26, "triangle", 0.15, 0.09)
};

/* ============================================================
   VISUAL FX — confetti, floating XP, toasts
   ============================================================ */

function confettiBurst(big) {
  const n = big ? 80 : 46;
  const colors = ["#2dd4bf", "#818cf8", "#fbbf24", "#fb7185", "#34d399", "#f472b6"];
  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.style.left = (46 + Math.random() * 8) + "vw";
    d.style.background = colors[i % colors.length];
    d.style.setProperty("--dx", (Math.random() * 2 - 1) * 46 + "vw");
    d.style.setProperty("--rot", (Math.random() * 900 - 450) + "deg");
    d.style.animationDelay = (Math.random() * 0.18) + "s";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2400);
  }
}

function xpPopup(amount, shiny) {
  const el = document.createElement("div");
  el.className = "xp-popup" + (shiny ? " shiny" : "");
  el.textContent = "+" + amount + " XP";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

function toast(icon, text) {
  let wrap = document.getElementById("toastWrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toastWrap";
    document.body.appendChild(wrap);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="toast-icon">${icon}</span><span>${text}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 400); }, 3400);
}

/* ============================================================
   MASCOT
   ============================================================ */

let idleTimer = null;

// Tiered hint state. Tapping the mascot escalates the help level for the
// current target; idle auto-nudges never escalate, so the player stays in
// control of how much they want spoiled.
let hintState = { targetId: null, level: 0 };

function pickHintTarget() {
  return MOLECULES.find(m => !discoveries[m.id] && tierUnlocked(m.tier));
}

function vagueNudge(m) {
  const nudge = TYPE_NUDGES[m.type];
  if (nudge) return "🤔 " + L(nudge);
  return "🤔 " + (m.category === "organic"
    ? (lang === "fr" ? "Essaie quelque chose de la chimie organique." : "Try something from organic chemistry.")
    : (lang === "fr" ? "Pense à un composé minéral." : "Think of a mineral compound."));
}

function atomRecipeText(m) {
  return Object.entries(m.atoms)
    .map(([sym, n]) => `${n} × ${sym}`)
    .join(" + ");
}
function atomHint(m) {
  return "🧩 " + t("atomHint", atomRecipeText(m));
}

function mascotSay(text, ms) {
  const bubble = document.getElementById("mascotBubble");
  const avatar = document.getElementById("mascotAvatar");
  if (!bubble) return;
  bubble.textContent = text;
  bubble.hidden = false;
  avatar.classList.remove("bounce");
  void avatar.offsetWidth;          // restart animation
  avatar.classList.add("bounce");
  clearTimeout(mascotSay._t);
  mascotSay._t = setTimeout(() => { bubble.hidden = true; }, ms || 6000);
}

// after a spell of inactivity, nudge the player with a clue
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => showHint({ escalate: false }), 38000);
}
function showHint(opts) {
  const escalate = !opts || opts.escalate !== false;
  const target = pickHintTarget();
  if (!target) {
    mascotSay(mascotLine("idle"), 6000);
    resetIdle();
    return;
  }
  // New target → restart the hint ladder from the gentlest tier.
  if (hintState.targetId !== target.id) {
    hintState.targetId = target.id;
    hintState.level = 0;
  }
  if (escalate) {
    hintState.level = Math.min(3, hintState.level + 1);
  } else if (hintState.level === 0) {
    hintState.level = 1;
  }

  let text;
  if      (hintState.level === 1) text = vagueNudge(target);
  else if (hintState.level === 2) text = atomHint(target);
  else                            text = "💡 " + clueFor(target);

  if (hintState.level < 3) text += "  ·  " + t("tapForMore");

  mascotSay(text, 9000);
  resetIdle();
}

/* ============================================================
   XP / LEVELS
   ============================================================ */

function currentLevelIndex() {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (totalXP >= LEVELS[i].xp) idx = i;
  return idx;
}

function addXP(amount) {
  const before = currentLevelIndex();
  totalXP += amount;
  localStorage.setItem(XP_KEY, totalXP);
  const after = currentLevelIndex();
  if (after > before && !gameSilent) {
    SFX.levelUp();
    confettiBurst(true);
    toast("⬆️", t("levelUp") + " " + L(LEVELS[after]));
    mascotSay(mascotLine("levelUp"));
  }
}

function updateTopbarLevel() {
  const chip = document.getElementById("levelChip");
  if (!chip) return;
  const idx = currentLevelIndex();
  chip.innerHTML = `<span class="lvl-num">${idx + 1}</span>${L(LEVELS[idx])}`;
}

/* ============================================================
   BADGES + MISSIONS — checked after each discovery
   ============================================================ */

function gameRefresh() {
  BADGES.forEach(b => {
    if (!earnedBadges.includes(b.id) && b.check()) {
      earnedBadges.push(b.id);
      localStorage.setItem(BADGE_KEY, JSON.stringify(earnedBadges));
      addXP(BADGE_XP);
      if (!gameSilent) {
        SFX.badge();
        toast(b.icon, t("badgeEarned") + " " + L(b));
      }
    }
  });
  MISSIONS.forEach(m => {
    if (!claimedMissions.includes(m.id) && m.progress() >= m.target) {
      claimedMissions.push(m.id);
      localStorage.setItem(MISSION_KEY, JSON.stringify(claimedMissions));
      addXP(MISSION_XP);
      if (!gameSilent) {
        SFX.mission();
        toast(m.icon, t("missionDone") + " " + L(m));
      }
    }
  });
  renderQuests();
  updateTopbarLevel();
}

/* ============================================================
   DISCOVERY — called by app.js combine() for a new molecule
   ============================================================ */

function discoveryXP(m, shiny) {
  return (40 + m.tier * 20) * (shiny ? 2 : 1);
}

function gameDiscover(m) {
  const shiny = Math.random() < 0.10;          // 10% shiny chance
  discoveries[m.id] = { date: new Date().toISOString(), shiny };
  saveDiscoveries(discoveries);

  SFX.success();
  if (shiny) setTimeout(SFX.sparkle, 250);
  confettiBurst(shiny);

  const xp = discoveryXP(m, shiny);
  xpPopup(xp, shiny);
  addXP(xp);

  updateProgress();
  renderDex();
  gameRefresh();                               // missions / badges
  openMoleculeModal(m, true);
  mascotSay(mascotLine(shiny ? "shiny" : "discover"));
  resetIdle();
}

/* ============================================================
   QUESTS TAB — profile, missions, badges
   ============================================================ */

function renderQuests() {
  const root = document.getElementById("questsContent");
  if (!root) return;

  const idx = currentLevelIndex();
  const lv = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const into = totalXP - lv.xp;
  const span = next ? next.xp - lv.xp : Math.max(into, 1);
  const pct = next ? Math.min(100, (into / span) * 100) : 100;

  // profile
  let html = `
    <div class="profile-card">
      <div class="profile-avatar">🧑‍🔬</div>
      <div class="profile-info">
        <div class="profile-level">${t("level")} ${idx + 1} · ${L(lv)}</div>
        <div class="xp-track"><div class="xp-fill" style="width:${pct}%"></div></div>
        <div class="xp-text">${totalXP} XP${next ? ` · ${next.xp - totalXP} ${t("toNext")}` : ` · ${t("maxLevel")}`}</div>
      </div>
      <div class="profile-stats">
        <div><strong>${discoveredCount()}/${MOLECULES.length}</strong><span>${t("discovered")}</span></div>
        <div><strong>${shinyCount()}</strong><span>✨</span></div>
        <div><strong>${earnedBadges.length}/${BADGES.length}</strong><span>${t("badges")}</span></div>
      </div>
    </div>`;

  // missions
  html += `<h2 class="quest-h">${t("missions")}</h2><div class="mission-list">`;
  MISSIONS.forEach(m => {
    const prog = Math.min(m.progress(), m.target);
    const done = prog >= m.target;
    html += `
      <div class="mission ${done ? "done" : ""}">
        <span class="mission-icon">${done ? "✅" : m.icon}</span>
        <div class="mission-body">
          <div class="mission-text">${L(m)}</div>
          <div class="mission-track"><div class="mission-fill" style="width:${(prog / m.target) * 100}%"></div></div>
        </div>
        <span class="mission-count">${prog}/${m.target}</span>
      </div>`;
  });
  html += `</div>`;

  // badges
  html += `<h2 class="quest-h">${t("badges")}</h2><div class="badge-grid">`;
  BADGES.forEach(b => {
    const got = earnedBadges.includes(b.id);
    html += `
      <div class="badge-card ${got ? "earned" : "locked"}" title="${L(b)}">
        <div class="badge-emoji">${b.icon}</div>
        <div class="badge-name">${got ? L(b) : "???"}</div>
      </div>`;
  });
  html += `</div>`;

  root.innerHTML = html;
}

/* ============================================================
   DAILY PUZZLE — one prompt per day, no streak, hard stop
   ============================================================ */

const DAILY_XP = 150;

function todayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Tiny string hash so everyone gets the same pick on the same day.
function dailySeed(dateStr) {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickDailyPuzzle(dateStr) {
  const pool = MOLECULES.filter(m => tierUnlocked(m.tier));
  if (pool.length === 0) return null;
  return pool[dailySeed(dateStr) % pool.length];
}

function saveDaily() { localStorage.setItem(DAILY_KEY, JSON.stringify(dailyState)); }

function ensureDailyForToday() {
  const today = todayDateStr();
  if (dailyState.date === today && dailyState.moleculeId) return;
  // Re-pick from whatever tiers are unlocked *right now*; new players
  // shouldn't be shown puzzles they can't possibly build yet.
  const m = pickDailyPuzzle(today);
  dailyState = { date: today, moleculeId: m ? m.id : null, solvedAt: null, hintUsed: false };
  saveDaily();
}

function renderDailyPuzzle() {
  const panel = document.getElementById("dailyPanel");
  if (!panel) return;
  ensureDailyForToday();

  const promptEl = document.getElementById("dailyPrompt");
  const hintBtn  = document.getElementById("dailyHintBtn");
  const hintBox  = document.getElementById("dailyHintBox");
  const titleEl  = document.getElementById("dailyTitle");

  titleEl.textContent = "🧩 " + t("dailyTitle");

  if (!dailyState.moleculeId) {
    panel.classList.remove("solved");
    promptEl.textContent = t("dailyEmpty");
    hintBtn.hidden = true;
    hintBox.hidden = true;
    return;
  }

  const m = MOLECULES.find(x => x.id === dailyState.moleculeId);

  if (dailyState.solvedAt) {
    panel.classList.add("solved");
    promptEl.textContent = t("dailySolved", molField(m, "commonName"));
    hintBtn.hidden = true;
    hintBox.hidden = true;
    return;
  }

  panel.classList.remove("solved");
  promptEl.textContent = clueFor(m);
  hintBtn.hidden = false;
  hintBtn.textContent = t("dailyHint");
  if (dailyState.hintUsed) {
    hintBox.hidden = false;
    hintBox.textContent = atomRecipeText(m);
  } else {
    hintBox.hidden = true;
  }
}

function useDailyHint() {
  if (!dailyState.moleculeId || dailyState.solvedAt || dailyState.hintUsed) return;
  dailyState.hintUsed = true;
  saveDaily();
  SFX.click();
  renderDailyPuzzle();
}

// Called from app.js combine() whenever a molecule resolves.
function checkDailyPuzzleSolved(m) {
  ensureDailyForToday();
  if (!dailyState.moleculeId || dailyState.solvedAt) return;
  if (m.id !== dailyState.moleculeId) return;

  dailyState.solvedAt = new Date().toISOString();
  saveDaily();
  addXP(DAILY_XP);
  if (!gameSilent) {
    SFX.mission();
    confettiBurst(false);
    toast("🧩", t("dailySolvedToast") + "  +" + DAILY_XP + " XP");
  }
  renderDailyPuzzle();
}

/* ============================================================
   SOUND TOGGLE
   ============================================================ */

function updateMuteButton() {
  const btn = document.getElementById("muteBtn");
  if (!btn) return;
  btn.textContent = muted ? "🔇" : "🔊";
  btn.title = muted ? t("soundOff") : t("soundOn");
}
function toggleMute() {
  muted = !muted;
  localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  updateMuteButton();
  if (!muted) SFX.click();
}

// wipe XP / badges / missions (called by the Dex "Reset progress" button)
function gameReset() {
  totalXP = 0;
  earnedBadges = [];
  claimedMissions = [];
  dailyState = {};
  localStorage.removeItem(XP_KEY);
  localStorage.removeItem(BADGE_KEY);
  localStorage.removeItem(MISSION_KEY);
  localStorage.removeItem(DAILY_KEY);
  renderQuests();
  updateTopbarLevel();
  renderDailyPuzzle();
}

/* ============================================================
   INIT — called from app.js
   ============================================================ */

function initGame() {
  // sync badges/missions/XP for any pre-existing discoveries, silently
  gameSilent = true;
  gameRefresh();
  gameSilent = false;

  updateMuteButton();
  updateTopbarLevel();
  renderQuests();
  renderDailyPuzzle();

  document.getElementById("muteBtn").addEventListener("click", toggleMute);
  document.getElementById("levelChip").addEventListener("click", () => {
    document.querySelector('.tab[data-tab="quests"]').click();
  });
  document.getElementById("mascot").addEventListener("click", () => showHint());
  document.getElementById("dailyHintBtn").addEventListener("click", useDailyHint);

  // greeting + idle nudges
  setTimeout(() => mascotSay(mascotLine("greet"), 7000), 900);
  resetIdle();
  ["pointerdown", "keydown"].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true }));
}
