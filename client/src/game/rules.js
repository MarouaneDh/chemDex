/* ============================================================
   Chemistry rules — pure helpers for the combine engine and the
   structure-image URLs. No React, no state: just functions.
   ============================================================ */

import { ATOMS } from "../data/gamedata.js";

export const atomBySymbol = (sym) => ATOMS.find((a) => a.symbol === sym);

// Count symbols in an array -> { H: 2, O: 1 }
export function countAtoms(symbols) {
  return symbols.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
}

// True if two atom-count maps are exactly equal.
export function countsEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if ((a[k] || 0) !== (b[k] || 0)) return false;
  }
  return true;
}

// Build a Hill-notation formula string from a count map (for display).
export function hillFormula(counts) {
  const keys = Object.keys(counts);
  if (keys.length === 0) return "—";
  const ordered = [];
  if (counts.C) ordered.push("C");
  if (counts.H) ordered.push("H");
  keys.filter((k) => k !== "C" && k !== "H").sort().forEach((k) => ordered.push(k));
  // with no carbon, Hill notation is purely alphabetical
  if (!counts.C) ordered.sort();
  return ordered.map((k) => k + (counts[k] > 1 ? counts[k] : "")).join("");
}

/* PubChem structure images:
   2D:  .../cid/{cid}/PNG?image_size=large | 500x500
   3D:  .../cid/{cid}/PNG?record_type=3d   (no image_size — it breaks 3D) */
const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/";

export function structureURL(cid, view, size) {
  const base = PUBCHEM + cid + "/PNG";
  if (view === "3d") {
    return base + "?record_type=3d" + (size ? "&image_size=" + size : "");
  }
  return base + "?image_size=" + (size || "large");
}
