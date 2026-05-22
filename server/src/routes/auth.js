/* Authentication routes — register, login, and the current-user probe.
   Passwords are hashed with bcrypt; sessions are stateless Bearer JWTs. */
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MIN_PASSWORD = 8;

// Sign a stateless session token for a user document.
function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
}

/* POST /api/auth/register — create an account, return a token. */
router.post("/register", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const displayName = String(req.body.displayName || "").trim();

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "A valid email address is required" });
    }
    if (password.length < MIN_PASSWORD) {
      return res
        .status(400)
        .json({ error: `Password must be at least ${MIN_PASSWORD} characters` });
    }
    if (!displayName) {
      return res.status(400).json({ error: "A display name is required" });
    }

    if (await User.exists({ email })) {
      return res
        .status(409)
        .json({ error: "An account with that email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, displayName });
    res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (err) {
    console.error("register failed:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

/* POST /api/auth/login — exchange credentials for a token. */
router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const user = await User.findOne({ email });
    // identical response whether the email or the password is wrong
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    res.json({ token: signToken(user), user: user.toSafeJSON() });
  } catch (err) {
    console.error("login failed:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* GET /api/auth/me — validate a stored token, return the account. */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: user.toSafeJSON() });
  } catch (err) {
    console.error("me failed:", err);
    res.status(500).json({ error: "Lookup failed" });
  }
});

export default router;
