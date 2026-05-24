import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFriends } from "../../context/FriendsContext.jsx";
import { useGame } from "../../context/GameContext.jsx";
import Formula from "../Formula.jsx";

/* Quick-reaction palette — common kid-friendly hits. */
const QUICK_REACTS = ["👍", "❤️", "😂", "🤯", "🔥", "🎉"];

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* One message bubble — either text or a card preview that opens BragCard. */
function MessageBubble({ m, withUser, onReact, onOpenCard }) {
  const { t } = useGame();
  const { user } = useAuth();
  const [pickerOpen, setPickerOpen] = useState(false);

  const senderName = m.mine ? user?.displayName : withUser?.displayName;
  const reactions = m.reactions || {};

  return (
    <div className={"chat-msg" + (m.mine ? " mine" : "")}>
      <div className="chat-msg-row">
        <div className={"chat-bubble" + (m.kind === "card" ? " card" : "")}>
          {m.kind === "text" ? (
            <span className="chat-msg-text">{m.text}</span>
          ) : (
            <button
              type="button"
              className="chat-msg-card"
              onClick={() => onOpenCard(m)}
              title={t("chatOpenCard")}
            >
              <span className="chat-msg-card-icon">⚗️</span>
              <span className="chat-msg-card-body">
                <span className="chat-msg-card-name">
                  {m.card?.commonName || "?"}
                </span>
                <span className="chat-msg-card-formula">
                  <Formula text={m.card?.formula || ""} />
                </span>
                <span className={"chat-msg-card-rarity rarity-" + (m.card?.rarity || "common")}>
                  {m.card?.rarity || "—"}
                </span>
              </span>
            </button>
          )}
          <span className="chat-msg-meta">{formatTime(m.sentAt)}</span>
        </div>
        <button
          type="button"
          className="chat-react-btn"
          title={t("chatReact")}
          aria-label={t("chatReact")}
          onClick={() => setPickerOpen((p) => !p)}
        >
          😊+
        </button>
      </div>

      {pickerOpen && (
        <div className="chat-react-picker" role="menu">
          {QUICK_REACTS.map((emoji) => (
            <button
              type="button"
              key={emoji}
              className="chat-react-pick"
              onClick={() => {
                onReact(m.id, emoji);
                setPickerOpen(false);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {Object.keys(reactions).length > 0 && (
        <div className="chat-reactions">
          {Object.entries(reactions).map(([emoji, users]) => {
            if (!users || users.length === 0) return null;
            return (
              <button
                key={emoji}
                type="button"
                className="chat-reaction"
                onClick={() => onReact(m.id, emoji)}
                title={t("chatToggleReaction")}
              >
                {emoji} {users.length}
              </button>
            );
          })}
        </div>
      )}

      <span className="chat-msg-sender">{senderName}</span>
    </div>
  );
}

/* The chat thread modal — portal-mounted to body so the .view section's
   transform doesn't trap the fixed overlay. */
export default function ChatModal() {
  const { t, openBragCard } = useGame();
  const { activeChat, closeChat, sendMessage, reactToMessage } = useFriends();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef(null);

  // autoscroll to the newest message
  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [activeChat?.messages.length, activeChat?.withUserId]);

  if (!activeChat) return null;
  const { withUser, messages } = activeChat;

  const send = async (e) => {
    e?.preventDefault?.();
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await sendMessage(activeChat.withUserId, { kind: "text", text: trimmed });
      setText("");
    } finally {
      setBusy(false);
    }
  };

  const onCardClick = (m) => {
    // re-open the BragCard with sender attribution if the card was sent BY the
    // friend, plus enough metadata for the BragCard to surface reactions on the
    // underlying chat message
    openBragCard({
      ...m.card,
      receivedFrom: m.mine ? null : withUser?.displayName,
      sentAt: m.sentAt,
      // chat-message hooks: lets the BragCard show + toggle reactions
      chatMessageId: m.id,
      chatWithUserId: activeChat.withUserId,
      chatReactions: m.reactions || {},
    });
  };

  return createPortal(
    <div
      className="modal-overlay chat-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeChat();
      }}
    >
      <div className="modal chat-modal">
        <header className="chat-header">
          <div className="chat-header-info">
            <span className="chat-header-avatar">🧑‍🔬</span>
            <span className="chat-header-name">{withUser?.displayName}</span>
            <code className="chat-header-id">{withUser?.friendId}</code>
          </div>
          <button
            type="button"
            className="lb-close chat-close"
            onClick={closeChat}
            aria-label={t("close")}
            title={t("close")}
          >
            ✕
          </button>
        </header>

        <div className="chat-scroller" ref={scrollerRef}>
          {messages.length === 0 ? (
            <p className="chat-empty">{t("chatEmpty")}</p>
          ) : (
            messages.map((m) => (
              <MessageBubble
                key={m.id}
                m={m}
                withUser={withUser}
                onReact={(id, emoji) =>
                  reactToMessage(activeChat.withUserId, id, emoji)
                }
                onOpenCard={onCardClick}
              />
            ))
          )}
        </div>

        <form className="chat-composer" onSubmit={send}>
          <input
            type="text"
            className="chat-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("chatPlaceholder")}
            maxLength={1000}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn btn-primary chat-send"
            disabled={busy || !text.trim()}
          >
            {t("chatSend")}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
