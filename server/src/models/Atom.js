/* The Atom catalog — one document per chemical element exposed in the
   palette. Reference data; never per-player. Mirrors the shape of the
   ATOMS array in client/src/data/gamedata.js. */
import mongoose from "mongoose";

const atomSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    valence: Number,
    color: String,
    text: String,
  },
  { timestamps: true }
);

export const Atom = mongoose.model("Atom", atomSchema);
