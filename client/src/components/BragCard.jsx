import { useEffect, useRef, useState } from "react";
import { drawBragCard, exportBragCard } from "../game/bragCard.js";
import { useCatalog } from "../context/CatalogContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useFriends } from "../context/FriendsContext.jsx";
import ShareCardDialog from "./ShareCardDialog.jsx";

const QUICK_REACTS = ["👍", "❤️", "😂", "🤯", "🔥", "🎉"];

/* The Holo Brag Card overlay — a collectible trading card for a
   discovered molecule, painted on a <canvas> so it exports cleanly.
   A CSS holo-foil layer shimmers over rares for the live view.

   When opened from a chat card-message:
   - the card carries chatMessageId + chatWithUserId so we can toggle
     reactions on the underlying message;
   - if it was sent BY a friend (receivedFrom set), the Share-image and
     Send-to-friends buttons are hidden — you can only React or Close. */
export default function BragCard() {
  const {
    bragCard: m, closeBragCard, t, term, molField, discoveries,
    loadWorkbenchRecipe, isAtomUnlocked,
  } = useGame();
  const { atoms } = useCatalog();
  const { user, isAuthed } = useAuth();
  const { reactToMessage } = useFriends();
  const canvasRef = useRef(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reactions, setReactions] = useState({});

  // a card opened from chat carries m.receivedFrom (if from a friend) + m.sentAt
  const receivedFrom = m?.receivedFrom || null;
  const rec = m && !m.invented && !receivedFrom ? discoveries[m.id] : null;
  const shiny = !!(rec && rec.shiny);
  const invented = !!m?.invented;
  const dateISO = invented
    ? m.createdAt
    : receivedFrom
      ? m.sentAt
      : rec?.date;

  // chat-message metadata — set when opened from a chat bubble
  const chatMessageId = m?.chatMessageId || null;
  const chatWithUserId = m?.chatWithUserId || null;
  const fromChat = !!(chatMessageId && chatWithUserId);

  // sync local reactions whenever a different chat-message opens
  useEffect(() => {
    setReactions(m?.chatReactions || {});
    setPickerOpen(false);
  }, [m?.chatMessageId]);

  useEffect(() => {
    if (!m || !canvasRef.current) return;
    drawBragCard(canvasRef.current, {
      name: molField(m, "commonName"),
      typeLabel: invented
        ? t("sbInventedTypeLabel")
        : term(m.type) + " · " + term(m.category),
      formula: m.formula,
      atoms: m.atoms,
      atomCatalog: atoms,
      rarity: m.rarity,
      rarityLabel: term(m.rarity),
      shiny,
      invented,
      owner: receivedFrom
        ? receivedFrom
        : user
          ? user.displayName
          : t("cardOwnerGuest"),
      ownerLabel: receivedFrom
        ? t("inboxReceivedFromLabel")
        : invented
          ? t("sbInventedBy")
          : t("cardDiscoveredBy"),
      dateText: dateISO ? new Date(dateISO).toLocaleDateString() : "",
      cid: invented ? null : m.pubchemCid,
    });
  }, [m, shiny, invented, receivedFrom, user, term, molField, t, atoms]);

  if (!m) return null;

  const holo = shiny || m.rarity === "rare" || m.rarity === "epic" || invented;

  // toggle a reaction — optimistic update + server round trip
  const toggleReaction = async (emoji) => {
    if (!fromChat || !user?.id) return;
    setPickerOpen(false);
    const myId = String(user.id);
    setReactions((prev) => {
      const list = (prev[emoji] || []).map(String);
      const i = list.indexOf(myId);
      if (i >= 0) {
        list.splice(i, 1);
        if (list.length === 0) {
          const { [emoji]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [emoji]: list };
      }
      return { ...prev, [emoji]: [...list, myId] };
    });
    try {
      const r = await reactToMessage(chatWithUserId, chatMessageId, emoji);
      if (r?.reactions) setReactions(r.reactions);
    } catch {
      /* the next SSE refresh will repair any drift */
    }
  };

  return (
    <div
      className="modal-overlay bragcard-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBragCard();
      }}
    >
      <div className="bragcard-wrap">
        {receivedFrom && (
          <div className="bragcard-received-banner">
            📩 {t("inboxFrom")} {receivedFrom}
          </div>
        )}
        {invented && (
          <div className="bragcard-invented-banner">{t("sbInventedTypeLabel")}</div>
        )}
        <div className={"bragcard-frame rarity-" + m.rarity + (holo ? " holo" : "")}>
          <canvas ref={canvasRef} width={600} height={840} className="bragcard-canvas" />
          {holo && <div className="holo-foil" />}
        </div>

        {/* Reactions row — only when the card is tied to a chat message */}
        {fromChat && (
          <div className="bragcard-reactions">
            {Object.entries(reactions).map(([emoji, users]) =>
              users && users.length > 0 ? (
                <button
                  key={emoji}
                  type="button"
                  className="bragcard-reaction"
                  onClick={() => toggleReaction(emoji)}
                  title={t("chatToggleReaction")}
                >
                  {emoji} {users.length}
                </button>
              ) : null
            )}
            <button
              type="button"
              className="bragcard-react-add"
              onClick={() => setPickerOpen((p) => !p)}
              aria-label={t("chatReact")}
              title={t("chatReact")}
            >
              😊+
            </button>
            {pickerOpen && (
              <div className="bragcard-react-picker" role="menu">
                {QUICK_REACTS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="bragcard-react-pick"
                    onClick={() => toggleReaction(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bragcard-actions">
          {/* Save-as-image + Send-to-friends are hidden on received cards —
              you can only react / close someone else's brag card. */}
          {!receivedFrom && (
            <button
              className="btn btn-primary"
              onClick={() =>
                exportBragCard(canvasRef.current, "chemdex-" + m.id + ".png")
              }
            >
              {t("cardShare")}
            </button>
          )}
          {!receivedFrom && isAuthed && (
            <button
              className="btn"
              onClick={() => setShareOpen(true)}
              title={t("shareSendToFriends")}
            >
              📩 {t("shareSendToFriends")}
            </button>
          )}
          {/* Brainstorm #67 — "Catch this too" closes the social loop:
              the recipient hops into the Lab with the workbench pre-seeded
              with the molecule's recipe and just hits Combine. Hidden on
              cards that aren't shared (you can already build your own
              discoveries) and disabled if any required atom is locked. */}
          {receivedFrom && !invented && m.atoms && (() => {
            const allUnlocked = Object.keys(m.atoms).every((s) => isAtomUnlocked(s));
            return (
              <button
                className="btn btn-primary"
                onClick={() => loadWorkbenchRecipe(m)}
                disabled={!allUnlocked}
                title={allUnlocked ? undefined : t("catchTooLocked")}
                aria-disabled={!allUnlocked}
              >
                {t("catchThisToo")}
              </button>
            );
          })()}
          <button className="btn" onClick={closeBragCard}>
            {t("close")}
          </button>
        </div>
      </div>

      {shareOpen && (
        <ShareCardDialog molecule={m} onClose={() => setShareOpen(false)} />
      )}
    </div>
  );
}
