import { useState } from "react";
import { createPortal } from "react-dom";
import { useFriends } from "../../context/FriendsContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* Send-an-invitation dialog. Portal-mounted to <body> — same lesson
   as the AdminPanel + PublishDialog: the .view section's transform
   would trap a fixed overlay rendered inside it. */
export default function AddFriendDialog({ onClose }) {
  const { t } = useGame();
  const { invite } = useFriends();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError(t("friendIdRequired"));
      return;
    }
    setBusy(true);
    try {
      await invite(trimmed);
      setSuccess(t("inviteSent"));
      setCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal addfriend-modal">
        <h2>{t("addFriendTitle")}</h2>
        <p className="auth-sub">{t("addFriendSub")}</p>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="friend-id-input">{t("friendIdLabel")}</label>
            <input
              id="friend-id-input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ABCD-2345"
              maxLength={20}
              autoComplete="off"
              autoFocus
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <div className="modal-actions">
            <button type="submit" className="btn btn-compact btn-primary" disabled={busy}>
              {busy ? t("authBusy") : t("sendInvite")}
            </button>
            <button type="button" className="btn btn-compact modal-close" onClick={onClose}>
              {t("close")}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
