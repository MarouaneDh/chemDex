/* ============================================================
   FriendsContext — friend graph + 1:1 chat with friends.

   Server-Sent Events (/api/friends/events) push a `friends-changed`
   nudge after every mutation; we refetch the friends snapshot AND
   the currently-open chat thread so the UI stays in sync without
   any optimistic-update bookkeeping (mostly — message-send appends
   the returned message immediately for snappiness, then the SSE
   refresh catches any drift).
   ============================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { apiFetch } from "../api/client.js";
import { useAuth } from "./AuthContext.jsx";

const EMPTY = {
  friendId: "",
  friends: [],
  incomingInvites: [],
  outgoingInvites: [],
  chats: [],
};

const FriendsContext = createContext(null);

export function FriendsProvider({ children }) {
  const { token, isAuthed } = useAuth();
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  // currently-open chat thread, or null
  const [activeChat, setActiveChat] = useState(null);
  const activeChatRef = useRef(null);
  activeChatRef.current = activeChat;

  /* ---------- friends snapshot ---------- */

  const refresh = useCallback(async () => {
    if (!token) {
      setData(EMPTY);
      return;
    }
    setLoading(true);
    try {
      const d = await apiFetch("/friends", { token });
      setData({
        friendId: d.friendId || "",
        friends: d.friends || [],
        incomingInvites: d.incomingInvites || [],
        outgoingInvites: d.outgoingInvites || [],
        chats: d.chats || [],
      });
    } catch {
      /* offline — keep showing the cached state */
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ---------- chat thread (active conversation) ---------- */

  const fetchChat = useCallback(
    async (withUserId) => {
      if (!token || !withUserId) return null;
      const d = await apiFetch("/friends/chat/" + encodeURIComponent(withUserId), {
        token,
      });
      const thread = {
        withUserId,
        withUser: d.withUser,
        messages: d.messages || [],
        lastReadAt: d.lastReadAt || null,
      };
      return thread;
    },
    [token]
  );

  const openChat = useCallback(
    async (withUserId) => {
      const thread = await fetchChat(withUserId);
      if (thread) {
        setActiveChat(thread);
        // server-side mark-read fires here so the badge drops immediately
        try {
          await apiFetch(
            "/friends/chat/" + encodeURIComponent(withUserId) + "/read",
            { method: "POST", token }
          );
          await refresh();
        } catch {
          /* non-critical */
        }
      }
      return thread;
    },
    [fetchChat, token, refresh]
  );

  const closeChat = useCallback(() => setActiveChat(null), []);

  const refreshActiveChat = useCallback(async () => {
    const current = activeChatRef.current;
    if (!current) return;
    const thread = await fetchChat(current.withUserId);
    if (thread) setActiveChat(thread);
  }, [fetchChat]);

  /* ---------- mutations ---------- */

  const invite = async (friendId) => {
    await apiFetch("/friends/invite", { method: "POST", token, body: { friendId } });
    await refresh();
  };
  const accept = async (friendId) => {
    await apiFetch("/friends/accept", { method: "POST", token, body: { friendId } });
    await refresh();
  };
  const decline = async (friendId) => {
    await apiFetch("/friends/decline", { method: "POST", token, body: { friendId } });
    await refresh();
  };
  const unfriend = async (friendUserId) => {
    await apiFetch("/friends/" + encodeURIComponent(friendUserId), {
      method: "DELETE",
      token,
    });
    // if we were chatting with that friend, close the thread
    if (activeChatRef.current?.withUserId === friendUserId) setActiveChat(null);
    await refresh();
  };

  const sendMessage = async (withUserId, payload) => {
    const r = await apiFetch(
      "/friends/chat/" + encodeURIComponent(withUserId) + "/messages",
      { method: "POST", token, body: payload }
    );
    // snappiness: append immediately to the active thread
    if (activeChatRef.current?.withUserId === withUserId && r.message) {
      setActiveChat((c) =>
        c ? { ...c, messages: [...c.messages, r.message] } : c
      );
    }
    await refresh();
    return r.message;
  };

  const reactToMessage = async (withUserId, messageId, emoji) => {
    const r = await apiFetch(
      "/friends/chat/" + encodeURIComponent(withUserId) +
        "/messages/" + encodeURIComponent(messageId) + "/react",
      { method: "POST", token, body: { emoji } }
    );
    // update the active thread's message in place — feels instant
    if (activeChatRef.current?.withUserId === withUserId) {
      setActiveChat((c) => {
        if (!c) return c;
        return {
          ...c,
          messages: c.messages.map((m) =>
            m.id === messageId ? { ...m, reactions: r.reactions } : m
          ),
        };
      });
    }
    return r;
  };

  const shareCard = async (friendUserIds, card) => {
    const r = await apiFetch("/friends/share", {
      method: "POST",
      token,
      body: { friendIds: friendUserIds, card },
    });
    await refresh();
    // if the active chat is with a recipient, refresh the thread too
    if (
      activeChatRef.current &&
      friendUserIds.includes(activeChatRef.current.withUserId)
    ) {
      await refreshActiveChat();
    }
    return r;
  };

  /* ---------- lifecycle: snapshot on login, clear on logout ---------- */

  useEffect(() => {
    if (isAuthed) refresh();
    else {
      setData(EMPTY);
      setActiveChat(null);
    }
  }, [isAuthed, token, refresh]);

  /* ---------- Server-Sent Events ----------
     Push triggers a refresh of BOTH the friends snapshot AND the
     currently-open chat thread (if any). */
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;
  const refreshChatRef = useRef(refreshActiveChat);
  refreshChatRef.current = refreshActiveChat;

  useEffect(() => {
    if (!token || typeof EventSource === "undefined") return;
    let es;
    try {
      es = new EventSource(
        "/api/friends/events?token=" + encodeURIComponent(token)
      );
    } catch {
      return;
    }
    const onChange = () => {
      refreshRef.current?.();
      refreshChatRef.current?.();
    };
    es.addEventListener("friends-changed", onChange);
    es.onerror = () => {};
    return () => {
      try {
        es.removeEventListener("friends-changed", onChange);
        es.close();
      } catch {
        /* ignore */
      }
    };
  }, [token]);

  /* ---------- derived ---------- */

  const totalUnread = data.chats.reduce(
    (n, c) => n + (c.unreadCount || 0),
    0
  );

  const value = {
    ...data,
    loading,
    totalUnread,
    activeChat,
    refresh,
    openChat,
    closeChat,
    sendMessage,
    reactToMessage,
    invite,
    accept,
    decline,
    unfriend,
    shareCard,
  };
  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export function useFriends() {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error("useFriends must be used within <FriendsProvider>");
  return ctx;
}
