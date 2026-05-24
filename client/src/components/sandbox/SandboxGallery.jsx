import { useGame } from "../../context/GameContext.jsx";
import Formula from "../Formula.jsx";

/* Gallery of the player's own Mad Science creations. Each card opens
   the Holo Brag Card; the trash icon deletes (with confirm). */
export default function SandboxGallery() {
  const { t, term, sandbox, openBragCard, deleteSandboxEntry } = useGame();

  return (
    <div className="sandbox-gallery">
      <h2 className="quest-h">
        {t("sbGallery")} <span className="sandbox-count">{sandbox.length}</span>
      </h2>
      {sandbox.length === 0 ? (
        <p className="sandbox-empty">{t("sbGalleryEmpty")}</p>
      ) : (
        <div className="sandbox-grid">
          {sandbox.map((entry) => (
            <div key={entry.id} className={"sandbox-card r-" + entry.rarity}>
              <button
                type="button"
                className="sandbox-card-body"
                onClick={() => openBragCard(entry)}
                title={t("sbViewCard")}
              >
                <div className="sandbox-card-emoji">⚗️</div>
                <div className="sandbox-card-name">{entry.name}</div>
                <div className="sandbox-card-formula">
                  <Formula text={entry.formula} />
                </div>
                <div className="sandbox-card-badges">
                  <span className={"badge rarity-" + entry.rarity}>
                    {term(entry.rarity)}
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="sandbox-delete"
                onClick={() => {
                  if (window.confirm(t("sbDeleteConfirm", entry.name))) {
                    deleteSandboxEntry(entry.id);
                  }
                }}
                title={t("sbDelete")}
                aria-label={t("sbDelete")}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
