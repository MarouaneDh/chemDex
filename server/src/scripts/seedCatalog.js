/* Seed the Atom + Molecule catalog from the client's source-of-truth
   data modules. Idempotent: re-runnable, upserts everything.

   By default the seeder is purely additive — entries the admin tool
   added via the UI survive. Pass --clean to also delete anything no
   longer present in the bundled data (use sparingly; it wipes admin
   work).

   Run: npm --prefix server run seed:catalog
        npm --prefix server run seed:catalog -- --clean */
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { Atom } from "../models/Atom.js";
import { Molecule } from "../models/Molecule.js";

// import the client's bundled data straight — single source of truth
import {
  ATOMS,
  MOLECULES,
  MOL_ORIGIN,
} from "../../../client/src/data/gamedata.js";
import { MOL_FR } from "../../../client/src/data/i18n.js";
import { MOL_HAZARDS } from "../../../client/src/game/hazards.js";

const cleanMode = process.argv.includes("--clean");

await connectDB();

/* ---------- atoms ---------- */
console.log(`Seeding ${ATOMS.length} atoms…`);
let atomsUpserted = 0;
for (const a of ATOMS) {
  await Atom.updateOne(
    { symbol: a.symbol },
    { $set: a },
    { upsert: true }
  );
  atomsUpserted++;
}
let removedAtoms = { deletedCount: 0 };
if (cleanMode) {
  const sourceSymbols = ATOMS.map((a) => a.symbol);
  removedAtoms = await Atom.deleteMany({ symbol: { $nin: sourceSymbols } });
}
console.log(`  ✓ upserted ${atomsUpserted}; removed ${removedAtoms.deletedCount} stale`);

/* ---------- molecules ---------- */
console.log(`Seeding ${MOLECULES.length} molecules…`);
let moleculesUpserted = 0;
for (const m of MOLECULES) {
  // assemble the consolidated document — bundle the FR translation,
  // origin (myth), and hazard tags into the single molecule entry
  const doc = {
    ...m,
    fr: MOL_FR[m.id] || undefined,
    origin: MOL_ORIGIN[m.id] || undefined,
    hazards: MOL_HAZARDS[m.id] || [],
  };
  await Molecule.updateOne({ id: m.id }, { $set: doc }, { upsert: true });
  moleculesUpserted++;
}
let removedMolecules = { deletedCount: 0 };
if (cleanMode) {
  const sourceIds = MOLECULES.map((m) => m.id);
  removedMolecules = await Molecule.deleteMany({ id: { $nin: sourceIds } });
}
console.log(
  `  ✓ upserted ${moleculesUpserted}; removed ${removedMolecules.deletedCount} stale`
);
if (!cleanMode) {
  console.log("  (additive mode — pass --clean to remove stale entries)");
}

/* ---------- quick breakdown ---------- */
const byCategory = await Molecule.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]);
console.log("\nMolecule wings:");
for (const row of byCategory) {
  console.log(`  ${row._id.padEnd(12)} ${row.count}`);
}

await mongoose.disconnect();
console.log("\nSeed complete.");
