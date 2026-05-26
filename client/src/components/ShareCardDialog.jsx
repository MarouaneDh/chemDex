import { useState } from "react";
import { createPortal } from "react-dom";
import { useFriends } from "../context/FriendsContext.jsx";
import { useGame } from "../context/GameContext.jsx";

/* Pick one or more friends and send them the current brag card.
   The card payload IS the molecule object the player is looking at,
   trimmed to the fields the recipient's BragCard component reads. */
export default function ShareCardDialog({ molecule, onClose }) {
  const { t, molField } = useGame();
  const { friends, shareCard } = useFriends();
  const [selected, setSelected] = useState(() => new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState(null);

  const toggle = (id) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const send = async () => {
    if (selected.size === 0) {
      setError(t("shareNoneSelected"));
      return;
    }
    setBusy(true);
    setError("");
    try {
      // shipping the live molecule object — fr/foundIn/origin/etc. travel
      // with it so the recipient's BragCard renders identically
      const card = {
        ...molecule,
        sentByMe: true,
      };
      const r = await shareCard([...selected], card);
      setSentTo(r.sentTo || selected.size);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <div
      className="modal-overlay share-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal share-dialog">
        <h2>{t("shareToFriendsTitle")}</h2>
        <p className="auth-sub">
          {t("shareToFriendsSub", molField(molecule, "commonName"))}
        </p>

        {friends.length === 0 ? (
          <p className="friends-empty">{t("shareNoFriends")}</p>
        ) : sentTo != null ? (
          <p className="auth-success">{t("shareSent", sentTo)}</p>
        ) : (
          <ul className="share-friends-list">
            {friends.map((f) => (
              <li key={f.id}>
                <label className="share-friend-row">
                  <input
                    type="checkbox"
                    checked={selected.has(f.id)}
                    onChange={() => toggle(f.id)}
                  />
                  <span className="share-friend-name">{f.displayName}</span>
                  <code className="share-friend-id">{f.friendId}</code>
                </label>
              </li>
            ))}
          </ul>
        )}

        {error && <p className="auth-error">{error}</p>}

        <div className="modal-actions">
          {sentTo == null && friends.length > 0 && (
            <button
              className="btn btn-compact btn-primary"
              onClick={send}
              disabled={busy || selected.size === 0}
            >
              {busy
                ? t("authBusy")
                : t("shareSendCta", selected.size)}
            </button>
          )}
          <button className="btn btn-compact modal-close" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
