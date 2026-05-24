import { hazardStats } from "../../game/hazards.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The Hazard Classes panel — brainstorm #10. Five collectible safety
   classes; each chip shows X / Y progress and deep-links into the
   Dex filtered by that hazard. A complete set glows. */
export default function HazardClasses() {
  const { t, L, discoveries, setActiveTab, setDexFilter } = useGame();
  const { molecules } = useCatalog();
  const stats = hazardStats(discoveries, molecules);

  const openWing = (id) => {
    setDexFilter("hazard:" + id);
    setActiveTab("dex");
  };

  return (
    <>
      <h2 className="quest-h">{t("hazardClassesTitle")}</h2>
      <div className="hazard-grid">
        {stats.map((h) => {
          const pct = h.total ? (h.found / h.total) * 100 : 0;
          const done = h.total > 0 && h.found >= h.total;
          return (
            <button
              key={h.id}
              type="button"
              className={"hazard-card hazard-" + h.id + (done ? " complete" : "")}
              onClick={() => openWing(h.id)}
            >
              <span className="hazard-card-icon">{h.icon}</span>
              <span className="hazard-card-body">
                <span className="hazard-card-name">{L(h)}</span>
                <span className="hazard-card-count">
                  {h.found} / {h.total}
                  {done && " · " + t("hazardComplete")}
                </span>
                <span className="hazard-card-track">
                  <span className="hazard-card-fill" style={{ width: pct + "%" }} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
