/* requireAdmin — Bearer token AND the user's role must be "admin".
   On success, sets req.userId + req.user. */
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Missing authentication token" });
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  try {
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "Unknown user" });
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    req.userId = user._id.toString();
    req.user = user;
    next();
  } catch (err) {
    console.error("admin guard failed:", err);
    res.status(500).json({ error: "Authorization check failed" });
  }
}
