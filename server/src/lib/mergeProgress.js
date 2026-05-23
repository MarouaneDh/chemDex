/* mergeProgress — combine two progress snapshots without losing anything.

   Cloud sync must never delete a discovery, badge or XP just because one
   device was offline. So the merge is a union: discoveries and string
   lists are OR-ed together, XP takes the max, and the daily puzzle keeps
   the most recent (or most-solved) day. This makes PUT idempotent and
   safe to run from several devices. */

const union = (a = [], b = []) => [...new Set([...(a || []), ...(b || [])])];

function mergeDiscoveries(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [id, rec] of Object.entries(b || {})) {
    const prev = out[id];
    if (!prev) {
      out[id] = rec;
      continue;
    }
    // keep the earliest discovery date; stay shiny if either copy is
    const earlier =
      prev.date && rec.date
        ? new Date(prev.date) <= new Date(rec.date)
          ? prev.date
          : rec.date
        : prev.date || rec.date;
    out[id] = { date: earlier, shiny: !!(prev.shiny || rec.shiny) };
  }
  return out;
}

/* Capsule — defensive: the longer cooldown and the smaller stockpile
   win, so a claim on one device cannot be undone by a stale push. */
function mergeCapsule(a = {}, b = {}) {
  const da = a || {};
  const db = b || {};
  if (!da.nextReadyAt && !db.nextReadyAt) return da.stockpile !== undefined ? da : db;
  const nA = Date.parse(da.nextReadyAt || 0) || 0;
  const nB = Date.parse(db.nextReadyAt || 0) || 0;
  const stockpile = Math.min(
    da.stockpile !== undefined ? da.stockpile : 2,
    db.stockpile !== undefined ? db.stockpile : 2
  );
  return {
    stockpile,
    nextReadyAt: new Date(Math.max(nA, nB)).toISOString(),
  };
}

/* Buddy — keep the longest streak, the most recent activity, and the
   most stabilizers earned (capped at 2 anyway by the client). */
function mergeBuddy(a = {}, b = {}) {
  const da = a || {};
  const db = b || {};
  const dateA = da.lastDiscoveryDate || "";
  const dateB = db.lastDiscoveryDate || "";
  return {
    streak: Math.max(da.streak || 0, db.streak || 0),
    lastDiscoveryDate: dateA > dateB ? dateA : dateB,
    stabilizers: Math.min(2, Math.max(da.stabilizers || 0, db.stabilizers || 0)),
  };
}

function mergeDaily(a = {}, b = {}) {
  const da = a || {};
  const db = b || {};
  if (!db.date) return da;
  if (!da.date || db.date > da.date) return db;
  if (db.date < da.date) return da;
  // same day on both — keep whichever made the most progress
  return {
    date: da.date,
    moleculeId: da.moleculeId ?? db.moleculeId ?? null,
    solvedAt: da.solvedAt || db.solvedAt || null,
    hintUsed: !!(da.hintUsed || db.hintUsed),
  };
}

export function mergeProgress(stored = {}, incoming = {}) {
  const s = stored || {};
  const i = incoming || {};
  return {
    discoveries: mergeDiscoveries(s.discoveries, i.discoveries),
    xp: Math.max(Number(s.xp) || 0, Number(i.xp) || 0),
    badges: union(s.badges, i.badges),
    missions: union(s.missions, i.missions),
    atoms: union(s.atoms, i.atoms),
    daily: mergeDaily(s.daily, i.daily),
    capsule: mergeCapsule(s.capsule, i.capsule),
    buddy: mergeBuddy(s.buddy, i.buddy),
    // preferences: the device that just pushed wins
    lang: i.lang || s.lang || "en",
    muted: typeof i.muted === "boolean" ? i.muted : !!s.muted,
    updatedAt: new Date(),
  };
}
