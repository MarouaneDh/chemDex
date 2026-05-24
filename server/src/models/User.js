/* The User model — one document per player account.

   `progress` is an embedded snapshot of the same slices the client
   keeps in localStorage. Phase 3 only creates accounts; the cloud-sync
   routes that read and write `progress` are added in Phase 4.

   Social fields (friendId, friends, invites, inbox) live alongside
   progress at the User level — they describe relationships between
   users, not per-player game state. */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* ---------- social sub-schemas ---------- */

// pending invite — one ObjectId reference + when it was sent
const inviteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


// Mirrors the client's persistent game state (see GameContext).
const progressSchema = new mongoose.Schema(
  {
    discoveries: { type: mongoose.Schema.Types.Mixed, default: {} },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    missions: { type: [String], default: [] },
    daily: { type: mongoose.Schema.Types.Mixed, default: {} },
    atoms: { type: [String], default: [] },
    capsule: { type: mongoose.Schema.Types.Mixed, default: {} },
    buddy: { type: mongoose.Schema.Types.Mixed, default: {} },
    forbiddenBreached: { type: Boolean, default: false },
    vitaminDActivated: { type: Boolean, default: false },
    // Mad Science Sandbox creations — player-named fictional compounds
    sandbox: { type: [mongoose.Schema.Types.Mixed], default: [] },
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
    // promote via `npm --prefix server run promote -- <email>` (server-side only)
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // social — shareable code + friend graph + invites + inbox
    friendId: { type: String, unique: true, sparse: true, index: true },
    friends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    incomingInvites: { type: [inviteSchema], default: [] },
    outgoingInvites: { type: [inviteSchema], default: [] },

    progress: { type: progressSchema, default: () => ({}) },
  },
  { timestamps: true }
);

/* Generate a human-friendly, easy-to-share friendID — 4 letters + 4
   digits, separated by a dash. The alphabet skips I / L / O and the
   digits skip 0 / 1 to avoid look-alike confusion. ~1.1B combinations. */
userSchema.statics.generateFriendId = async function () {
  const letters = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const digits = "23456789";
  const make = () => {
    let s = "";
    for (let i = 0; i < 4; i++) s += letters[Math.floor(Math.random() * letters.length)];
    s += "-";
    for (let i = 0; i < 4; i++) s += digits[Math.floor(Math.random() * digits.length)];
    return s;
  };
  for (let attempt = 0; attempt < 12; attempt++) {
    const candidate = make();
    if (!(await this.exists({ friendId: candidate }))) return candidate;
  }
  throw new Error("Could not generate a unique friend ID after 12 tries");
};

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
    role: this.role || "user",
    friendId: this.friendId,
    friendsCount: this.friends?.length || 0,
    incomingInvitesCount: this.incomingInvites?.length || 0,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.model("User", userSchema);
