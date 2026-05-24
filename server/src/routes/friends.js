/* Friends graph + brag-card sharing — most routes gated by requireAuth.

   Users identify each other by `friendId` (a shareable code like
   "ABCD-2345"). Internally we still resolve to ObjectIds before
   storing in the friends / invites / inbox arrays.

   Live push uses Server-Sent Events: GET /events streams keep-alive
   "friends-changed" pings; every mutation calls broadcast() to nudge
   every party involved (including self, for multi-device parity). */
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Conversation } from "../models/Conversation.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/* ============================================================
   SSE — per-user push channel
   ============================================================ */

// userId(string) → Set of open express response objects
const clients = new Map();

function broadcast(...userIds) {
  const payload =
    `event: friends-changed\ndata: ${JSON.stringify({ kind: "friends-changed", at: Date.now() })}\n\n`;
  for (const raw of userIds) {
    if (!raw) continue;
    const set = clients.get(String(raw));
    if (!set || set.size === 0) continue;
    for (const res of set) {
      try {
        res.write(payload);
      } catch {
        /* connection died — cleanup happens on req.close */
      }
    }
  }
}

/* GET /api/friends/events?token=… — opens an SSE stream for the
   authenticated user. Token comes through the query string because
   the browser's EventSource can't attach custom headers. The same
   JWT is used; never logged in production, treat the URL as sensitive. */
router.get("/events", (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(401).end();

  let userId;
  try {
    const payload = jwt.verify(String(token), process.env.JWT_SECRET);
    userId = String(payload.sub);
  } catch {
    return res.status(401).end();
  }

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  if (typeof res.flushHeaders === "function") res.flushHeaders();
  res.write(`: connected ${userId}\n\n`);

  // keep-alive comment every 25 s to keep proxies from idling us out
  const ka = setInterval(() => {
    try {
      res.write(`: ka\n\n`);
    } catch {
      /* ignore */
    }
  }, 25000);

  if (!clients.has(userId)) clients.set(userId, new Set());
  clients.get(userId).add(res);

  req.on("close", () => {
    clearInterval(ka);
    const set = clients.get(userId);
    if (set) {
      set.delete(res);
      if (set.size === 0) clients.delete(userId);
    }
  });
});

/* ↓ everything below requires a Bearer token ↓ */
router.use(requireAuth);

/* ---------- helpers ---------- */

const publicFriend = (u) =>
  u ? { id: u._id.toString(), displayName: u.displayName, friendId: u.friendId } : null;

const idEq = (a, b) => a?.toString() === b?.toString();

async function loadMe(req) {
  const me = await User.findById(req.userId);
  if (!me) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  if (!me.friendId) {
    me.friendId = await User.generateFriendId();
    await me.save();
  }
  return me;
}

function newMessageId() {
  return "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
}

// summarise a conversation for the friends-list payload
function summarizeChat(conv, myId, byId) {
  const otherId = conv.participants.find((p) => !idEq(p, myId));
  if (!otherId) return null;
  const other = byId[otherId.toString()];
  if (!other) return null;
  const last = conv.messages[conv.messages.length - 1];
  const lastReadIso = conv.lastReadAt?.[myId.toString()];
  const lastReadAt = lastReadIso ? new Date(lastReadIso) : null;
  const unreadCount = conv.messages.reduce((n, m) => {
    if (idEq(m.from, myId)) return n;
    if (lastReadAt && m.sentAt <= lastReadAt) return n;
    return n + 1;
  }, 0);
  return {
    withUser: publicFriend(other),
    lastMessage: last
      ? {
          kind: last.kind,
          text: last.text || null,
          cardName: last.card?.commonName || null,
          from: idEq(last.from, myId) ? "me" : "them",
          sentAt: last.sentAt,
        }
      : null,
    unreadCount,
    lastMessageAt: conv.lastMessageAt,
  };
}

/* ---------- GET /api/friends  (full social snapshot) ---------- */

router.get("/", async (req, res) => {
  try {
    const me = await loadMe(req);
    const allIds = [
      ...me.friends,
      ...me.incomingInvites.map((i) => i.user),
      ...me.outgoingInvites.map((i) => i.user),
    ];
    const users = allIds.length
      ? await User.find({ _id: { $in: allIds } })
      : [];
    const byId = Object.fromEntries(users.map((u) => [u._id.toString(), u]));

    // chats: one summary per conversation this user is part of, sorted recent-first
    const conversations = await Conversation.find({ participants: me._id })
      .sort({ lastMessageAt: -1 })
      .lean();
    const chats = conversations
      .map((c) => summarizeChat(c, me._id, byId))
      .filter(Boolean);

    res.json({
      friendId: me.friendId,
      friends: me.friends
        .map((id) => publicFriend(byId[id.toString()]))
        .filter(Boolean),
      incomingInvites: me.incomingInvites.map((i) => ({
        fromUser: publicFriend(byId[i.user.toString()]),
        sentAt: i.sentAt,
      })),
      outgoingInvites: me.outgoingInvites.map((i) => ({
        toUser: publicFriend(byId[i.user.toString()]),
        sentAt: i.sentAt,
      })),
      chats,
    });
  } catch (err) {
    console.error("friends list failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Could not load friends" });
  }
});

/* ---------- POST /api/friends/invite { friendId } ---------- */

router.post("/invite", async (req, res) => {
  try {
    const target = String(req.body.friendId || "").trim().toUpperCase();
    if (!target) return res.status(400).json({ error: "friendId is required" });

    const me = await loadMe(req);
    if (target === me.friendId) {
      return res.status(400).json({ error: "You can't add yourself." });
    }
    const them = await User.findOne({ friendId: target });
    if (!them) return res.status(404).json({ error: "No user with that ID." });

    if (me.friends.some((id) => idEq(id, them._id))) {
      return res.status(409).json({ error: "You're already friends with that user." });
    }
    if (me.outgoingInvites.some((i) => idEq(i.user, them._id))) {
      return res.status(409).json({ error: "Invitation already sent." });
    }
    if (me.incomingInvites.some((i) => idEq(i.user, them._id))) {
      return res
        .status(409)
        .json({ error: "They already invited you — accept their invitation instead." });
    }

    me.outgoingInvites.push({ user: them._id, sentAt: new Date() });
    them.incomingInvites.push({ user: me._id, sentAt: new Date() });
    await Promise.all([me.save(), them.save()]);
    broadcast(me._id, them._id);
    res.json({ ok: true, toUser: publicFriend(them) });
  } catch (err) {
    console.error("invite failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Invite failed" });
  }
});

/* ---------- POST /api/friends/accept { friendId } ---------- */

router.post("/accept", async (req, res) => {
  try {
    const fromFid = String(req.body.friendId || "").trim().toUpperCase();
    const me = await loadMe(req);
    const them = await User.findOne({ friendId: fromFid });
    if (!them) return res.status(404).json({ error: "User not found." });

    const had = me.incomingInvites.some((i) => idEq(i.user, them._id));
    if (!had) return res.status(404).json({ error: "No invitation from that user." });

    me.incomingInvites = me.incomingInvites.filter((i) => !idEq(i.user, them._id));
    them.outgoingInvites = them.outgoingInvites.filter((i) => !idEq(i.user, me._id));
    if (!me.friends.some((id) => idEq(id, them._id))) me.friends.push(them._id);
    if (!them.friends.some((id) => idEq(id, me._id))) them.friends.push(me._id);
    await Promise.all([me.save(), them.save()]);
    broadcast(me._id, them._id);
    res.json({ ok: true, friend: publicFriend(them) });
  } catch (err) {
    console.error("accept failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Accept failed" });
  }
});

/* ---------- POST /api/friends/decline { friendId } ---------- */

router.post("/decline", async (req, res) => {
  try {
    const fromFid = String(req.body.friendId || "").trim().toUpperCase();
    const me = await loadMe(req);
    const them = await User.findOne({ friendId: fromFid });
    if (!them) return res.status(404).json({ error: "User not found." });
    me.incomingInvites = me.incomingInvites.filter((i) => !idEq(i.user, them._id));
    them.outgoingInvites = them.outgoingInvites.filter((i) => !idEq(i.user, me._id));
    await Promise.all([me.save(), them.save()]);
    broadcast(me._id, them._id);
    res.json({ ok: true });
  } catch (err) {
    console.error("decline failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Decline failed" });
  }
});

/* ---------- DELETE /api/friends/:friendUserId ---------- */

router.delete("/:friendUserId", async (req, res) => {
  try {
    const me = await loadMe(req);
    const them = await User.findById(req.params.friendUserId);
    if (!them) return res.status(404).json({ error: "User not found." });
    me.friends = me.friends.filter((id) => !idEq(id, them._id));
    them.friends = them.friends.filter((id) => !idEq(id, me._id));
    await Promise.all([me.save(), them.save()]);
    broadcast(me._id, them._id);
    res.json({ ok: true });
  } catch (err) {
    console.error("unfriend failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Unfriend failed" });
  }
});

/* ============================================================
   CHAT — texts, brag cards as messages, reactions
   ============================================================ */

// Build a wire-shape message object: include `mine` and a plain
// reactions map (Mongoose Mixed sometimes round-trips through Map)
function wireMessage(m, myId) {
  return {
    id: m.id,
    kind: m.kind,
    text: m.text || null,
    card: m.card || null,
    reactions: m.reactions || {},
    sentAt: m.sentAt,
    mine: idEq(m.from, myId),
  };
}

// Guard: only friends can have a conversation. Returns { me, them } or sends an error.
async function loadFriendPair(req, res) {
  const me = await loadMe(req);
  const them = await User.findById(req.params.withUserId);
  if (!them) {
    res.status(404).json({ error: "User not found." });
    return null;
  }
  if (!me.friends.some((f) => idEq(f, them._id))) {
    res.status(403).json({ error: "Not friends with that user." });
    return null;
  }
  return { me, them };
}

/* ---------- GET /api/friends/chat/:withUserId — load the thread ---------- */

router.get("/chat/:withUserId", async (req, res) => {
  try {
    const pair = await loadFriendPair(req, res);
    if (!pair) return;
    const { me, them } = pair;
    const conv = await Conversation.findOrCreate(me._id, them._id);
    res.json({
      withUser: publicFriend(them),
      messages: conv.messages.map((m) => wireMessage(m, me._id)),
      lastReadAt: conv.lastReadAt?.[me._id.toString()] || null,
    });
  } catch (err) {
    console.error("get chat failed:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

/* ---------- POST /api/friends/chat/:withUserId/messages — send ---------- */

router.post("/chat/:withUserId/messages", async (req, res) => {
  try {
    const pair = await loadFriendPair(req, res);
    if (!pair) return;
    const { me, them } = pair;
    const { kind, text, card } = req.body || {};

    if (kind !== "text" && kind !== "card") {
      return res.status(400).json({ error: "kind must be 'text' or 'card'." });
    }
    let cleanText, cleanCard;
    if (kind === "text") {
      cleanText = String(text || "").trim();
      if (!cleanText) return res.status(400).json({ error: "Message can't be empty." });
      if (cleanText.length > 1000) cleanText = cleanText.slice(0, 1000);
    } else {
      if (!card || typeof card !== "object") {
        return res.status(400).json({ error: "card object required." });
      }
      cleanCard = card;
    }

    const conv = await Conversation.findOrCreate(me._id, them._id);
    const msg = {
      id: newMessageId(),
      from: me._id,
      kind,
      text: cleanText,
      card: cleanCard,
      reactions: {},
      sentAt: new Date(),
    };
    conv.messages.push(msg);
    conv.lastMessageAt = msg.sentAt;
    await conv.save();
    broadcast(me._id, them._id);
    res.json({ message: wireMessage(msg, me._id) });
  } catch (err) {
    console.error("send message failed:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

/* ---------- POST /api/friends/chat/:withUserId/messages/:msgId/react ---------- */

router.post("/chat/:withUserId/messages/:msgId/react", async (req, res) => {
  try {
    const pair = await loadFriendPair(req, res);
    if (!pair) return;
    const { me, them } = pair;
    const emoji = String(req.body?.emoji || "").trim();
    if (!emoji || emoji.length > 8) {
      return res.status(400).json({ error: "emoji required (max 8 chars)." });
    }
    const conv = await Conversation.findOrCreate(me._id, them._id);
    const msg = conv.messages.find((m) => m.id === req.params.msgId);
    if (!msg) return res.status(404).json({ error: "Message not found." });

    msg.reactions = msg.reactions || {};
    const list = (msg.reactions[emoji] || []).map(String);
    const meStr = me._id.toString();
    const idx = list.indexOf(meStr);
    if (idx >= 0) {
      list.splice(idx, 1);
      if (list.length === 0) delete msg.reactions[emoji];
      else msg.reactions[emoji] = list;
    } else {
      list.push(meStr);
      msg.reactions[emoji] = list;
    }
    conv.markModified("messages");
    await conv.save();
    broadcast(me._id, them._id);
    res.json({ ok: true, reactions: msg.reactions });
  } catch (err) {
    console.error("react failed:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

/* ---------- POST /api/friends/chat/:withUserId/read — mark seen ---------- */

router.post("/chat/:withUserId/read", async (req, res) => {
  try {
    const pair = await loadFriendPair(req, res);
    if (!pair) return;
    const { me, them } = pair;
    const conv = await Conversation.findOrCreate(me._id, them._id);
    conv.lastReadAt = conv.lastReadAt || {};
    conv.lastReadAt[me._id.toString()] = new Date();
    conv.markModified("lastReadAt");
    await conv.save();
    // self-only — the other side's unread count didn't change
    broadcast(me._id);
    res.json({ ok: true });
  } catch (err) {
    console.error("mark read failed:", err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

/* ---------- POST /api/friends/share { friendIds, card }
   — multicast a brag card: writes a `card` message into every
   selected friend's conversation. */

router.post("/share", async (req, res) => {
  try {
    const friendUserIds = Array.isArray(req.body.friendIds) ? req.body.friendIds : [];
    const card = req.body.card;
    if (!friendUserIds.length) {
      return res.status(400).json({ error: "Pick at least one friend." });
    }
    if (!card || typeof card !== "object") {
      return res.status(400).json({ error: "card is required." });
    }
    const me = await loadMe(req);
    const allowed = friendUserIds.filter((id) =>
      me.friends.some((f) => idEq(f, id))
    );
    if (!allowed.length) {
      return res.status(403).json({ error: "Not friends with selected users." });
    }

    for (const toId of allowed) {
      const conv = await Conversation.findOrCreate(me._id, toId);
      const msg = {
        id: newMessageId(),
        from: me._id,
        kind: "card",
        card,
        reactions: {},
        sentAt: new Date(),
      };
      conv.messages.push(msg);
      conv.lastMessageAt = msg.sentAt;
      await conv.save();
    }
    broadcast(me._id, ...allowed);
    res.json({ ok: true, sentTo: allowed.length });
  } catch (err) {
    console.error("share failed:", err);
    res.status(err.status || 500).json({ error: err.message || "Share failed" });
  }
});

export default router;
