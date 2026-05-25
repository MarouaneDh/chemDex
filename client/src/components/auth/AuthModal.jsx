import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFriends } from "../../context/FriendsContext.jsx";
import { useGame } from "../../context/GameContext.jsx";
import AddFriendDialog from "./AddFriendDialog.jsx";
import Avatar from "../Avatar.jsx";

const SYNC_LABEL = {
  syncing: "syncSyncing",
  synced: "syncSynced",
  error: "syncError",
  offline: "syncOffline",
};

/* The account dialog. Logged out it shows a login / sign-up form;
   logged in it shows the account and cloud-sync status. Rendered at the
   app root (see App.jsx) so its fixed overlay covers the whole viewport. */
export default function AuthModal() {
  const {
    t, syncStatus, authOpen: open, closeAuth: onClose,
    lang, setLang, muted, toggleMute, setActiveTab,
  } = useGame();
  const { isAuthed, isAdmin, user, register, login, logout, uploadAvatar } = useAuth();
  const friends = useFriends();
  const [avatarError, setAvatarError] = useState("");

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [actionError, setActionError] = useState("");

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "register") {
        if (form.password.length < 8) throw new Error(t("passwordTooShort"));
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const register_ = mode === "register";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal auth-modal">
        <button className="lb-close auth-x" onClick={onClose} title={t("close")}>
          ✕
        </button>

        {isAuthed ? (
          /* ---- signed in: account + friends + sync status ---- */
          <div className="auth-account">
            <Avatar
              src={user.avatar}
              size={80}
              editable
              className="account-avatar-hero"
              onUpload={async (dataURL) => {
                setAvatarError("");
                try {
                  await uploadAvatar(dataURL);
                } catch (err) {
                  setAvatarError(err.message || "Upload failed");
                  throw err;
                }
              }}
              onError={(err) => setAvatarError(err.message)}
            />
            {avatarError && <p className="auth-error">{avatarError}</p>}
            <p className="auth-name">{user.displayName}</p>
            <p className="auth-email">{user.email}</p>

            {/* My friend ID — shareable */}
            {friends.friendId && (
              <div className="friendid-row">
                <span className="friendid-label">{t("yourFriendId")}</span>
                <code className="friendid-code">{friends.friendId}</code>
                <button
                  className="friendid-copy"
                  title={t("copy")}
                  onClick={() => {
                    if (navigator.clipboard?.writeText) {
                      navigator.clipboard.writeText(friends.friendId);
                    }
                  }}
                >
                  📋
                </button>
              </div>
            )}

            {/* Pending incoming invitations */}
            {friends.incomingInvites.length > 0 && (
              <div className="friends-section">
                <div className="friends-section-title">
                  {t("incomingInvitesTitle")}{" "}
                  <span className="friends-count">{friends.incomingInvites.length}</span>
                </div>
                <ul className="friends-list">
                  {friends.incomingInvites.map((inv) => (
                    <li key={inv.fromUser?.id} className="friend-row">
                      <div className="friend-info">
                        <strong>{inv.fromUser?.displayName || "?"}</strong>
                        <code>{inv.fromUser?.friendId}</code>
                      </div>
                      <div className="friend-actions">
                        <button
                          className="btn btn-primary friend-btn-sm"
                          onClick={async () => {
                            try {
                              setActionError("");
                              await friends.accept(inv.fromUser.friendId);
                            } catch (e) {
                              setActionError(e.message);
                            }
                          }}
                        >
                          {t("accept")}
                        </button>
                        <button
                          className="btn friend-btn-sm"
                          onClick={async () => {
                            try {
                              setActionError("");
                              await friends.decline(inv.fromUser.friendId);
                            } catch (e) {
                              setActionError(e.message);
                            }
                          }}
                        >
                          {t("decline")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outgoing pending */}
            {friends.outgoingInvites.length > 0 && (
              <div className="friends-section">
                <div className="friends-section-title">
                  {t("outgoingInvitesTitle")}{" "}
                  <span className="friends-count">{friends.outgoingInvites.length}</span>
                </div>
                <ul className="friends-list">
                  {friends.outgoingInvites.map((inv) => (
                    <li key={inv.toUser?.id} className="friend-row pending">
                      <div className="friend-info">
                        <strong>{inv.toUser?.displayName || "?"}</strong>
                        <code>{inv.toUser?.friendId}</code>
                      </div>
                      <span className="friend-pending-tag">{t("pending")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conversations — open a chat with any friend */}
            <div className="friends-section">
              <div className="friends-section-title">
                {t("chatsTitle")}{" "}
                {friends.totalUnread > 0 && (
                  <span className="friends-count">
                    {friends.totalUnread}
                  </span>
                )}
              </div>
              {friends.chats.length === 0 ? (
                <p className="friends-empty">{t("chatsEmpty")}</p>
              ) : (
                <ul className="chat-list">
                  {friends.chats.map((c) => {
                    const last = c.lastMessage;
                    const preview =
                      last?.kind === "card"
                        ? "📩 " + (last.cardName || "?")
                        : last?.text || t("chatsNoMessagesYet");
                    return (
                      <li
                        key={c.withUser.id}
                        className={
                          "chat-row" + (c.unreadCount > 0 ? " unread" : "")
                        }
                      >
                        <button
                          type="button"
                          className="chat-row-open"
                          onClick={async () => {
                            try {
                              setActionError("");
                              await friends.openChat(c.withUser.id);
                              onClose(); // close the auth modal so chat has focus
                            } catch (e) {
                              setActionError(e.message);
                            }
                          }}
                        >
                          <Avatar src={c.withUser.avatar} size={36} className="chat-row-avatar" />
                          <span className="chat-row-text">
                            <span className="chat-row-line1">
                              <strong>{c.withUser.displayName}</strong>
                              {c.unreadCount > 0 && (
                                <span className="chat-row-unread">
                                  {c.unreadCount}
                                </span>
                              )}
                            </span>
                            <span className="chat-row-preview">
                              {last?.from === "me" && t("chatYouPrefix") + " "}
                              {preview}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Friends list */}
            <div className="friends-section">
              <div className="friends-section-title">
                {t("friendsTitle")}{" "}
                <span className="friends-count">{friends.friends.length}</span>
              </div>
              {friends.friends.length === 0 ? (
                <p className="friends-empty">{t("noFriendsYet")}</p>
              ) : (
                <ul className="friends-list">
                  {friends.friends.map((f) => (
                    <li key={f.id} className="friend-row">
                      <div className="friend-info">
                        <strong>{f.displayName}</strong>
                        <code>{f.friendId}</code>
                      </div>
                      <div className="friend-actions">
                        <button
                          className="btn friend-btn-sm"
                          onClick={async () => {
                            try {
                              setActionError("");
                              await friends.openChat(f.id);
                              onClose();
                            } catch (e) {
                              setActionError(e.message);
                            }
                          }}
                          title={t("chatOpen")}
                        >
                          💬
                        </button>
                        <button
                          className="btn btn-danger friend-btn-sm"
                          onClick={async () => {
                            if (!window.confirm(t("unfriendConfirm", f.displayName))) return;
                            try {
                              setActionError("");
                              await friends.unfriend(f.id);
                            } catch (e) {
                              setActionError(e.message);
                            }
                          }}
                        >
                          {t("unfriend")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="btn btn-primary friend-add-btn"
                onClick={() => setAddFriendOpen(true)}
              >
                {t("addFriend")}
              </button>
            </div>

            {actionError && <p className="auth-error">{actionError}</p>}

            {/* Settings — lang + sound + (if admin) admin shortcut.
                Brainstorm #100 / #101 — these used to live in the TopBar
                buffet; they belong here so the bar can fit one row on
                phones. */}
            <div className="friends-section">
              <div className="friends-section-title">{t("settingsTitle")}</div>

              <div className="settings-row">
                <div>
                  <div className="settings-label">{t("settingsLanguage")}</div>
                </div>
                <div className="lang-switch">
                  <button
                    className={"lang" + (lang === "en" ? " active" : "")}
                    onClick={() => setLang("en")}
                  >
                    EN
                  </button>
                  <button
                    className={"lang" + (lang === "fr" ? " active" : "")}
                    onClick={() => setLang("fr")}
                  >
                    FR
                  </button>
                </div>
              </div>

              <div className="settings-row">
                <div>
                  <div className="settings-label">{t("settingsSound")}</div>
                  <div className="settings-hint">{t("settingsSoundHint")}</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={!muted}
                  className={"settings-toggle" + (!muted ? " is-on" : "")}
                  onClick={toggleMute}
                  title={muted ? t("soundOn") : t("soundOff")}
                />
              </div>

              {isAdmin && (
                <button
                  className="btn settings-admin-btn"
                  onClick={() => {
                    setActiveTab("admin");
                    onClose();
                  }}
                >
                  {t("settingsOpenAdmin")}
                </button>
              )}
            </div>

            <div className="sync-line">
              <span className={"sync-dot sync-" + syncStatus} />
              {t(SYNC_LABEL[syncStatus] || "syncSynced")}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              {t("signOut")}
            </button>

            {addFriendOpen && <AddFriendDialog onClose={() => setAddFriendOpen(false)} />}
          </div>
        ) : (
          /* ---- signed out: login / register form ---- */
          <>
            <h2>{register_ ? t("authRegisterTitle") : t("authLoginTitle")}</h2>
            <p className="auth-sub">{t("authSub")}</p>

            <form className="auth-form" onSubmit={submit}>
              {register_ && (
                <div className="auth-field">
                  <label htmlFor="auth-name">{t("nameLabel")}</label>
                  <input
                    id="auth-name"
                    type="text"
                    value={form.displayName}
                    onChange={set("displayName")}
                    required
                    autoComplete="nickname"
                  />
                </div>
              )}
              <div className="auth-field">
                <label htmlFor="auth-email">{t("emailLabel")}</label>
                <input
                  id="auth-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="auth-field">
                <label htmlFor="auth-password">{t("passwordLabel")}</label>
                <input
                  id="auth-password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  required
                  autoComplete={register_ ? "new-password" : "current-password"}
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy
                  ? t("authBusy")
                  : register_
                    ? t("authRegisterCta")
                    : t("authLoginCta")}
              </button>
            </form>

            <button
              className="auth-switch"
              type="button"
              onClick={() => {
                setError("");
                setMode(register_ ? "login" : "register");
              }}
            >
              {register_ ? t("authToLogin") : t("authToRegister")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
