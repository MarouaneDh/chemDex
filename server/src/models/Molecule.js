/* The Molecule catalog — one document per molecule, consolidating
   everything the client currently has split across gamedata.js,
   MOL_FR (i18n.js), MOL_ORIGIN (gamedata.js), and MOL_HAZARDS
   (hazards.js). The combine engine matches against `atoms`. */
import mongoose from "mongoose";

const bilingualSchema = new mongoose.Schema(
  { en: String, fr: String },
  { _id: false }
);

const bilingualListSchema = new mongoose.Schema(
  {
    en: { type: [String], default: undefined },
    fr: { type: [String], default: undefined },
  },
  { _id: false }
);

const moleculeSchema = new mongoose.Schema(
  {
    // stable id (matches the keys used in player progress: discoveries[id])
    id: { type: String, required: true, unique: true, index: true },

    // chemistry
    pubchemCid: Number,
    formula: { type: String, required: true },
    commonName: { type: String, required: true },
    iupacName: String,
    atoms: { type: mongoose.Schema.Types.Mixed, required: true }, // { H: 2, O: 1 }
    smiles: String,
    inchiKey: String,
    molarMass: Number,
    structureImage: String,

    // game-side classification
    category: { type: String, required: true, index: true },
    type: String,
    rarity: String,
    tier: { type: Number, required: true, index: true },

    // editorial
    description: String,
    uses: [String],
    funFact: String,

    // French translation block (matches MOL_FR shape)
    fr: { type: mongoose.Schema.Types.Mixed, default: undefined },

    /* category-specific bolt-ons */

    // vitamins — list of foods this vitamin lives in
    foundIn: { type: bilingualListSchema, default: undefined },
    // vitamin D₃ — the sunlight easter egg
    sunlightSpecial: { type: Boolean, default: false },

    // forbidden shelf — handling-safety note
    safety: { type: bilingualSchema, default: undefined },

    // myth vault — pop-culture origin + real-science note
    origin: {
      type: new mongoose.Schema(
        {
          source: bilingualSchema,
          scienceNote: bilingualSchema,
        },
        { _id: false }
      ),
      default: undefined,
    },

    // cross-cutting hazard tags
    hazards: { type: [String], default: [] },
  },
  { timestamps: true }
);

moleculeSchema.index({ category: 1, tier: 1, id: 1 });

export const Molecule = mongoose.model("Molecule", moleculeSchema);
