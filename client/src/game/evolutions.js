/* ============================================================
   Evolution Chains (brainstorm #5) — Pokédex-style ordered
   families. Each molecule in a chain knows its previous and next
   step; the Modal renders the line with silhouettes for any step
   the player hasn't discovered yet — the "tease" hook.

   Like CLUES / RELATED / BADGES, chains are game-design constants
   bundled with the client (not catalog data). Admin editing of
   chains would require a Chain collection in MongoDB; deferred.
   ============================================================ */

export const EVOLUTION_CHAINS = [
  {
    id: "chain_c1_oxidation",
    name: {
      en: "Carbon-1 Burn Chain",
      fr: "Chaîne de combustion du carbone",
    },
    // methane → methanol → formaldehyde → formic acid → CO₂
    members: ["mol_004", "mol_023", "mol_027", "mol_028", "mol_002"],
  },
  {
    id: "chain_c2_oxidation",
    name: { en: "Ethanol Family", fr: "Famille de l'éthanol" },
    // ethylene → ethanol → acetic acid
    members: ["mol_029", "mol_005", "mol_017"],
  },
  {
    id: "chain_hydrogen",
    name: { en: "Hydrogen Family", fr: "Famille de l'hydrogène" },
    // H₂ → H₂O → H₂O₂
    members: ["mol_021", "mol_001", "mol_012"],
  },
  {
    id: "chain_nitrogen",
    name: { en: "Nitrogen Family", fr: "Famille de l'azote" },
    // N₂ → NH₃ → HNO₃
    members: ["mol_022", "mol_006", "mol_019"],
  },
  {
    id: "chain_sulfur",
    name: { en: "Sulfur Family", fr: "Famille du soufre" },
    // H₂S → SO₂ → H₂SO₄
    members: ["mol_024", "mol_020", "mol_007"],
  },
  {
    id: "chain_sodium",
    name: { en: "Sodium Family", fr: "Famille du sodium" },
    // NaCl → NaOH → NaHCO₃
    members: ["mol_003", "mol_015", "mol_026"],
  },
];

/* Pre-compute a per-molecule index so chainPosition is O(1). */
const INDEX = (() => {
  const map = {};
  for (const c of EVOLUTION_CHAINS) {
    c.members.forEach((id, i) => {
      map[id] = { chain: c, index: i };
    });
  }
  return map;
})();

/* Where does this molecule sit in the wider evolutionary picture?
   Returns { chain, index } or null if the molecule isn't in any chain. */
export function chainPosition(molId) {
  return INDEX[molId] || null;
}
