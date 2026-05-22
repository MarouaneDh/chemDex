import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import progressRoutes from "./routes/progress.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
