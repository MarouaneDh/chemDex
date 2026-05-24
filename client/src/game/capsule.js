/* ============================================================
   The Daily Capsule — a twice-daily free reward gated by a
   localStorage timestamp. Players regenerate up to two capsules,
   one every 12 hours; the cooldown clock resumes from the cap.

   This module is pure: state-in, state-out + loot description. The
   UI and side effects live in the Capsule component and GameContext.
   ============================================================ */

import { MOLECULES } from "../data/gamedata.js";
import { TIER_UNLOCK } from "./progression.js";

const REGEN_MS = 12 * 60 * 60 * 1000; // 12 hours per capsule
const MAX_STOCKPILE = 2;
export const CAPSULE_XP = 50;

/* Bring the capsule state up to date — credits any capsules the player
   has earned while away, capped at the stockpile limit. */
export function tickCapsules(c, now = Date.now()) {
  // first-ever load: give one capsule immediately, set the regen clock
  if (!c || typeof c.stockpile !== "number" || !c.nextReadyAt) {
    return {
      stockpile: 1,
      nextReadyAt: new Date(now + REGEN_MS).toISOString(),
    };
  }
  let stockpile = c.stockpile;
  let next = Date.parse(c.nextReadyAt);
  if (Number.isNaN(next)) next = now + REGEN_MS;
  while (stockpile < MAX_STOCKPILE && now >= next) {
    stockpile++;
    next += REGEN_MS;
  }
  return { stockpile, nextReadyAt: new Date(next).toISOString() };
}

/* Consume one capsule. If the stockpile was already at cap, the regen
   clock had paused — restart it now so the next capsule is 12h out. */
export function claimCapsule(c, now = Date.now()) {
  if (!c || c.stockpile <= 0) return c;
  let next = Date.parse(c.nextReadyAt) || now;
  if (c.stockpile === MAX_STOCKPILE && next <= now) {
    next = now + REGEN_MS;
  }
  return {
    stockpile: c.stockpile - 1,
    nextReadyAt: new Date(next).toISOString(),
  };
}

/* "5h 23m" / "47s" — for the next-ready countdown label. */
export function formatCooldown(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${total}s`;
}

/* Decide what a capsule yields. XP is always available; hint scrolls
   need a buildable, undiscovered molecule; stabilizers cap at two. */
export function rollCapsuleLoot({
  discoveries,
  unlockedAtoms,
  stabilizers,
  rng = Math.random,
}) {
  const count = Object.keys(discoveries || {}).length;
  const tierOk = (t) => count >= (TIER_UNLOCK[t] || 0);
  const buildable = (m) => Object.keys(m.atoms).every((s) => unlockedAtoms.includes(s));
  // myths + forbidden are stumble-upon / breach discoveries — never hinted
  const hintTarget = MOLECULES.find(
    (m) =>
      m.category !== "myth" &&
      m.category !== "forbidden" &&
      !discoveries[m.id] &&
      tierOk(m.tier) &&
      buildable(m)
  );

  const pool = [{ kind: "xp", weight: 70 }];
  if (hintTarget) pool.push({ kind: "hint", weight: 20 });
  if ((stabilizers || 0) < 2) pool.push({ kind: "stabilizer", weight: 10 });

  const total = pool.reduce((s, p) => s + p.weight, 0);
  const r = rng() * total;
  let acc = 0;
  let kind = "xp";
  for (const p of pool) {
    acc += p.weight;
    if (r < acc) {
      kind = p.kind;
      break;
    }
  }

  if (kind === "hint") return { kind, molecule: hintTarget };
  if (kind === "stabilizer") return { kind };
  return { kind: "xp", amount: CAPSULE_XP };
}
