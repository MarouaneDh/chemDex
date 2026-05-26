import { useState } from "react";
import { createPortal } from "react-dom";
import { useGame } from "../../context/GameContext.jsx";

const RARITIES = ["common", "uncommon", "rare", "epic"];

/* The naming + publish dialog for a Sandbox creation. Mounted via a
   portal to <body> so the .view.active section's transform doesn't
   trap the fixed overlay. */
export default function PublishDialog({ formula, atoms, onClose, onPublish }) {
  const { t, term } = useGame();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rarity, setRarity] = useState("uncommon");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    const n = name.trim();
    if (n.length < 1 || n.length > 40) {
      setError(t("sbNameRequired"));
      return;
    }
    if ((description || "").length > 200) {
      setError(t("sbDescriptionTooLong"));
      return;
    }
    const result = onPublish({ name: n, description, rarity, atoms });
    if (result?.kind === "alreadyKnown") {
      setError(t("sbAlreadyKnown", result.molecule.commonName));
    }
    // for realDiscovery / saved, parent closes the dialog
  };

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal sandbox-publish">
        <h2>{t("sbPublishTitle")}</h2>
        <p className="sandbox-formula-line">
          <span className="sandbox-formula-label">{t("formula")}</span>
          <strong className="sandbox-formula">{formula}</strong>
        </p>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="sb-name">{t("sbName")}</label>
            <input
              id="sb-name"
              type="text"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("sbNamePlaceholder")}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="sb-desc">{t("sbDescription")}</label>
            <textarea
              id="sb-desc"
              rows={3}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("sbDescriptionPlaceholder")}
            />
          </div>

          <div className="auth-field">
            <label>{t("sbRarity")}</label>
            <div className="sandbox-rarity-row">
              {RARITIES.map((r) => (
                <button
                  type="button"
                  key={r}
                  className={"sandbox-rarity " + r + (rarity === r ? " selected" : "")}
                  onClick={() => setRarity(r)}
                >
                  {term(r)}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <div className="modal-actions">
            <button type="submit" className="btn btn-compact btn-primary">
              {t("sbPublish")}
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
