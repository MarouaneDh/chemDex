import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/progress.js";
import catalogRoutes from "./routes/catalog.js";
import friendsRoutes from "./routes/friends.js";

dotenv.config();

const app = express();

app.use(cors());
// 1mb is comfortable for /me/avatar (base64 JPEGs run 30-200KB) without
// inviting abuse on text endpoints. If you change this, double-check that
// /progress snapshots still fit (they're small — ~5KB).
app.use(express.json({ limit: "1mb" }));

// Health check — confirms the API is up.
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "chemdex-api",
    version: "2.0.0",
    time: new Date().toISOString(),
  });
});

// Accounts (Phase 3) and cloud-sync of game progress (Phase 4).
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
// Reference catalog — atoms + molecules. Public; same data for everyone.
app.use("/api/catalog", catalogRoutes);
// Friend graph + brag-card sharing
app.use("/api/friends", friendsRoutes);

const PORT = process.env.PORT || 4000;

// Connect to MongoDB before accepting traffic — a bad connection
// should fail fast and loud rather than serving broken routes.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Chemdex API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Startup failed — could not connect to MongoDB:", err.message);
    process.exit(1);
  });
