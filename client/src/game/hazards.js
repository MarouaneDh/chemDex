/* ============================================================
   Hazard Classes (brainstorm #10) — a cross-cutting collectible
   tag layer. Every tagged molecule carries one or more hazard ids;
   players hunt to complete each set Pokémon-type-style.

   With the catalog now coming from MongoDB, hazard tags travel
   inside each molecule document as `m.hazards`. The bundled
   side-table below is the seed for that DB, kept here as the
   single source of truth for the seeder script and the offline
   fallback the CatalogProvider uses before the API responds.
   ============================================================ */

export const HAZARDS = [
  { id: "explosive", icon: "💥", en: "Explosive", fr: "Explosif" },
  { id: "toxic",     icon: "💀", en: "Toxic",     fr: "Toxique" },
  { id: "corrosive", icon: "🧪", en: "Corrosive", fr: "Corrosif" },
  { id: "cryogenic", icon: "🧊", en: "Cryogenic", fr: "Cryogénique" },
  { id: "flammable", icon: "🔥", en: "Flammable", fr: "Inflammable" },
];

/* Hazard tags by molecule id. Vitamins, glucose, salt, etc. carry no
   tags. Lists reflect real safety-data-sheet categories. Seeder
   pulls from this map; runtime reads m.hazards on each (fat) molecule. */
export const MOL_HAZARDS = {
  /* ----- real chemistry ----- */
  mol_004: ["flammable"],                          // Methane
  mol_005: ["flammable"],                          // Ethanol
  mol_006: ["corrosive", "toxic"],                 // Ammonia
  mol_007: ["corrosive"],                          // Sulfuric acid
  mol_011: ["cryogenic"],                          // Oxygen
  mol_012: ["corrosive"],                          // Hydrogen peroxide
  mol_013: ["toxic"],                              // Carbon monoxide
  mol_014: ["corrosive"],                          // Hydrochloric acid
  mol_015: ["corrosive"],                          // Sodium hydroxide
  mol_016: ["flammable", "toxic"],                 // Benzene
  mol_017: ["corrosive"],                          // Acetic acid
  mol_018: ["flammable"],                          // Propane
  mol_019: ["corrosive"],                          // Nitric acid
  mol_020: ["toxic"],                              // Sulfur dioxide
  mol_021: ["flammable", "cryogenic"],             // Hydrogen
  mol_022: ["cryogenic"],                          // Nitrogen
  mol_023: ["flammable", "toxic"],                 // Methanol
  mol_024: ["flammable", "toxic"],                 // Hydrogen sulfide
  mol_025: ["flammable"],                          // Acetone
  mol_027: ["toxic"],                              // Formaldehyde
  mol_028: ["corrosive"],                          // Formic acid
  mol_029: ["flammable"],                          // Ethylene

  /* ----- forbidden shelf ----- */
  mol_forbidden_001: ["toxic"],                                  // Hydrogen cyanide
  mol_forbidden_002: ["explosive", "toxic", "flammable"],        // Hydrazine
  mol_forbidden_003: ["explosive", "flammable"],                 // Nitromethane
  mol_forbidden_004: ["toxic", "corrosive"],                     // Chlorine
  mol_forbidden_005: ["toxic", "corrosive"],                     // Phosgene
  mol_forbidden_006: ["explosive"],                              // TNT
  mol_forbidden_007: ["explosive"],                              // Nitroglycerin
  mol_forbidden_008: ["explosive", "toxic"],                     // Picric acid
  mol_forbidden_009: ["toxic", "corrosive"],                     // Mustard gas
  mol_forbidden_010: ["toxic"],                                  // Sodium cyanide
};

export const hazardById = (id) => HAZARDS.find((h) => h.id === id);
// Now reads directly from the (fat) molecule document.
export const hazardsOf = (m) => (m && Array.isArray(m.hazards) ? m.hazards : []);

/* Roll up X / Y progress per hazard for the Quests collection panel. */
export function hazardStats(discoveries, molecules) {
  const mols = molecules || [];
  return HAZARDS.map((h) => {
    const all = mols.filter((m) => hazardsOf(m).includes(h.id));
    const found = all.filter((m) => discoveries[m.id]).length;
    return { ...h, total: all.length, found };
  });
}
