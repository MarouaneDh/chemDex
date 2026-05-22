import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

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
  const { t, syncStatus, authOpen: open, closeAuth: onClose } = useGame();
  const { isAuthed, user, register, login, logout } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
          /* ---- signed in: account + sync status ---- */
          <div className="auth-account">
            <div className="auth-avatar">🧑‍🔬</div>
            <h2>{t("account")}</h2>
            <p className="auth-name">{t("accountSignedIn", user.displayName)}</p>
            <p className="auth-email">{user.email}</p>
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
