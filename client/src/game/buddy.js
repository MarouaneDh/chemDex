/* ============================================================
   The Atom Buddy — the cold streak number replaced by a creature
   that visibly evolves on a daily-discovery streak, and never
   punishes a missed day (a Cryo-Stabilizer can paper over one).

   Four growth stages keyed off the consecutive-day streak:
     Egg (no streak) → Spark (1+) → Orb (5+) → Cosmic (14+)
   ============================================================ */

export const BUDDY_STAGES = [
  { id: "egg",    minStreak: 0,  glyph: "🥚", en: "Egg",    fr: "Œuf" },
  { id: "spark",  minStreak: 1,  glyph: "✨", en: "Spark",  fr: "Étincelle" },
  { id: "orb",    minStreak: 5,  glyph: "🌟", en: "Orb",    fr: "Orbe" },
  { id: "cosmic", minStreak: 14, glyph: "🌠", en: "Cosmic", fr: "Cosmique" },
];

export function buddyStage(streak) {
  let s = BUDDY_STAGES[0];
  for (const stage of BUDDY_STAGES) if (streak >= stage.minStreak) s = stage;
  return s;
}

/* Whole-day gap between two YYYY-MM-DD strings (UTC, so DST can't lie). */
function daysBetween(a, b) {
  const da = Date.parse(a + "T00:00:00Z");
  const db = Date.parse(b + "T00:00:00Z");
  if (Number.isNaN(da) || Number.isNaN(db)) return 0;
  return Math.round((db - da) / 86400000);
}

/* Apply a discovery to the buddy's streak.
   - Same day → no change (today already counted).
   - Next day → +1 streak.
   - One missed day → burn a stabilizer to preserve, else restart.
   - Multiple missed days → restart, even with a stabilizer (one day only). */
export function updateBuddyOnDiscovery(buddy, todayDate) {
  const b = buddy || { streak: 0, lastDiscoveryDate: "", stabilizers: 0 };
  const last = b.lastDiscoveryDate || "";
  if (last === todayDate) return b;

  if (!last) {
    return { ...b, streak: 1, lastDiscoveryDate: todayDate };
  }
  const gap = daysBetween(last, todayDate);
  if (gap === 1) {
    return { ...b, streak: (b.streak || 0) + 1, lastDiscoveryDate: todayDate };
  }
  if (gap === 2 && (b.stabilizers || 0) > 0) {
    return {
      ...b,
      streak: (b.streak || 0) + 1,
      stabilizers: b.stabilizers - 1,
      lastDiscoveryDate: todayDate,
      stabilizerUsedAt: todayDate,
    };
  }
  return { ...b, streak: 1, lastDiscoveryDate: todayDate };
}

export function addStabilizer(buddy) {
  const b = buddy || { streak: 0, lastDiscoveryDate: "", stabilizers: 0 };
  return { ...b, stabilizers: Math.min(2, (b.stabilizers || 0) + 1) };
}
