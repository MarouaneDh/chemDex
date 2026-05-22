/* Cloud-sync routes — read and write the player's game progress.
   Both are gated behind a valid Bearer JWT. PUT merges rather than
   replaces, so progress survives across devices and offline spells. */
import { Router } from "express";
import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { mergeProgress } from "../lib/mergeProgress.js";

const router = Router();

// A subdocument may be a Mongoose document — normalise to a plain object.
const plain = (p) => (p && typeof p.toObject === "function" ? p.toObject() : p || {});

/* GET /api/progress — the account's stored progress snapshot. */
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ progress: plain(user.progress) });
  } catch (err) {
    console.error("get progress failed:", err);
    res.status(500).json({ error: "Could not load progress" });
  }
});

/* PUT /api/progress — merge the incoming snapshot into the stored one
   and return the result. The union merge makes this idempotent. */
router.put("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const merged = mergeProgress(plain(user.progress), req.body || {});
    user.progress = merged;
    user.markModified("progress");
    await user.save();

    res.json({ progress: merged });
  } catch (err) {
    console.error("put progress failed:", err);
    res.status(500).json({ error: "Could not save progress" });
  }
});

export default router;
