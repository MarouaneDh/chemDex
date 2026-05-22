/* The User model — one document per player account.

   `progress` is an embedded snapshot of the same slices the client
   keeps in localStorage. Phase 3 only creates accounts; the cloud-sync
   routes that read and write `progress` are added in Phase 4. */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Mirrors the client's persistent game state (see GameContext).
const progressSchema = new mongoose.Schema(
  {
    discoveries: { type: mongoose.Schema.Types.Mixed, default: {} },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    missions: { type: [String], default: [] },
    daily: { type: mongoose.Schema.Types.Mixed, default: {} },
    atoms: { type: [String], default: [] },
    lang: { type: String, default: "en" },
    muted: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true, trim: true, maxlength: 40 },
    progress: { type: progressSchema, default: () => ({}) },
  },
  { timestamps: true }
);

// Compare a plaintext password against the stored hash.
userSchema.methods.checkPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

// The shape safe to return to a client — never the password hash.
userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    displayName: this.displayName,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.model("User", userSchema);
