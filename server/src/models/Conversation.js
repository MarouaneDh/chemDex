/* One conversation per pair of friends — texts, brag cards, reactions.

   participantsKey is a derived "smallerId:largerId" string with a
   unique index, so findOrCreate is a single lookup. Messages are
   embedded with their own user-facing `id` for react/delete ops. */
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kind: { type: String, enum: ["text", "card"], required: true },
    text: String,
    card: mongoose.Schema.Types.Mixed,
    // emoji -> [userId, userId, …]; stored as plain Mixed for simple writes
    reactions: { type: mongoose.Schema.Types.Mixed, default: {} },
    sentAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true,
      validate: (v) => Array.isArray(v) && v.length === 2,
    },
    participantsKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: { type: [messageSchema], default: [] },
    lastMessageAt: { type: Date, default: Date.now },
    // per-user last read timestamp — keys are user-id strings
    lastReadAt: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

conversationSchema.statics.keyFor = function (a, b) {
  return [String(a), String(b)].sort().join(":");
};

conversationSchema.statics.findOrCreate = async function (a, b) {
  const key = this.keyFor(a, b);
  let conv = await this.findOne({ participantsKey: key });
  if (!conv) {
    conv = await this.create({
      participants: key.split(":"),
      participantsKey: key,
      messages: [],
    });
  }
  return conv;
};

export const Conversation = mongoose.model("Conversation", conversationSchema);
