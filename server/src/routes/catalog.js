/* Public read + admin write for the atoms + molecules catalog.
   GET is open to any client (reference data, identical for everyone).
   POST/PUT/DELETE require an admin Bearer token. */
import { Router } from "express";
import { Atom } from "../models/Atom.js";
import { Molecule } from "../models/Molecule.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();
const PROJ = { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 };

/* ============================================================
   PUBLIC READ
   ============================================================ */

router.get("/atoms", async (req, res) => {
  try {
    const atoms = await Atom.find({}, PROJ).sort({ number: 1 }).lean();
    res.json({ atoms });
  } catch (err) {
    console.error("get atoms failed:", err);
    res.status(500).json({ error: "Could not load atoms" });
  }
});

router.get("/molecules", async (req, res) => {
  try {
    const molecules = await Molecule.find({}, PROJ).sort({ tier: 1, id: 1 }).lean();
    res.json({ molecules });
  } catch (err) {
    console.error("get molecules failed:", err);
    res.status(500).json({ error: "Could not load molecules" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [atoms, molecules] = await Promise.all([
      Atom.find({}, PROJ).sort({ number: 1 }).lean(),
      Molecule.find({}, PROJ).sort({ tier: 1, id: 1 }).lean(),
    ]);
    res.json({ atoms, molecules });
  } catch (err) {
    console.error("get catalog failed:", err);
    res.status(500).json({ error: "Could not load catalog" });
  }
});

/* ============================================================
   ADMIN WRITE — gated by requireAdmin
   ============================================================ */

// strip Mongo plumbing the admin client might send back unchanged
const clean = (body) => {
  const out = { ...(body || {}) };
  delete out._id;
  delete out.__v;
  delete out.createdAt;
  delete out.updatedAt;
  return out;
};

const safeFormat = (err) => err?.message || "Validation failed";

/* ---------- ATOMS ---------- */

router.post("/atoms", requireAdmin, async (req, res) => {
  try {
    const data = clean(req.body);
    if (!data.symbol) return res.status(400).json({ error: "symbol is required" });
    if (await Atom.exists({ symbol: data.symbol })) {
      return res.status(409).json({ error: `Atom ${data.symbol} already exists` });
    }
    const atom = await Atom.create(data);
    res.status(201).json({ atom: await Atom.findById(atom._id, PROJ).lean() });
  } catch (err) {
    res.status(400).json({ error: safeFormat(err) });
  }
});

router.put("/atoms/:symbol", requireAdmin, async (req, res) => {
  try {
    const data = clean(req.body);
    delete data.symbol; // the URL is the identifier
    const atom = await Atom.findOneAndUpdate(
      { symbol: req.params.symbol },
      { $set: data },
      { new: true, runValidators: true, projection: PROJ }
    ).lean();
    if (!atom) return res.status(404).json({ error: "Atom not found" });
    res.json({ atom });
  } catch (err) {
    res.status(400).json({ error: safeFormat(err) });
  }
});

router.delete("/atoms/:symbol", requireAdmin, async (req, res) => {
  try {
    const result = await Atom.deleteOne({ symbol: req.params.symbol });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Atom not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: safeFormat(err) });
  }
});

/* ---------- MOLECULES ---------- */

router.post("/molecules", requireAdmin, async (req, res) => {
  try {
    const data = clean(req.body);
    if (!data.id) return res.status(400).json({ error: "id is required" });
    if (await Molecule.exists({ id: data.id })) {
      return res.status(409).json({ error: `Molecule ${data.id} already exists` });
    }
    const mol = await Molecule.create(data);
    res.status(201).json({ molecule: await Molecule.findById(mol._id, PROJ).lean() });
  } catch (err) {
    res.status(400).json({ error: safeFormat(err) });
  }
});

router.put("/molecules/:id", requireAdmin, async (req, res) => {
  try {
    const data = clean(req.body);
    delete data.id; // the URL is the identifier
    const mol = await Molecule.findOneAndUpdate(
      { id: req.params.id },
      { $set: data },
      { new: true, runValidators: true, projection: PROJ }
    ).lean();
    if (!mol) return res.status(404).json({ error: "Molecule not found" });
    res.json({ molecule: mol });
  } catch (err) {
    res.status(400).json({ error: safeFormat(err) });
  }
});

router.delete("/molecules/:id", requireAdmin, async (req, res) => {
  try {
    const result = await Molecule.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Molecule not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: safeFormat(err) });
  }
});

export default router;
