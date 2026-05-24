/* ============================================================
   Progression constants — levels and tier gating.
   Badges, missions, and the discovery XP table are added in the
   game-layer sub-step (Phase 2 · sub-step 5).
   ============================================================ */

// Levels — reached at a cumulative XP threshold.
export const LEVELS = [
  { xp: 0, en: "Curious Kid", fr: "Petit curieux" },
  { xp: 200, en: "Junior Chemist", fr: "Chimiste junior" },
  { xp: 450, en: "Lab Assistant", fr: "Assistant de labo" },
  { xp: 750, en: "Researcher", fr: "Chercheur" },
  { xp: 1100, en: "Senior Chemist", fr: "Chimiste confirmé" },
  { xp: 1550, en: "Mad Scientist", fr: "Savant fou" },
  { xp: 2100, en: "Professor", fr: "Professeur" },
  { xp: 2800, en: "Nobel Genius", fr: "Génie Nobel" },
];

export function currentLevelIndex(xp) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) idx = i;
  }
  return idx;
}

// Tier difficulty curve — a tier unlocks at N total discoveries.
// Tier 5 is the Myth Vault: pop-culture fictional substances, gated
// behind a deep Dex so the fiction lands as a reward, not a distraction.
// Tier 6 is the Forbidden Shelf — visibility is gated separately by the
// player breaching the Leak in the Lab, so the tier count itself is 0.
export const TIER_UNLOCK = { 1: 0, 2: 3, 3: 8, 4: 13, 5: 18, 6: 0 };
