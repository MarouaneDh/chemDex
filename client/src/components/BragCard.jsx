import { useEffect, useRef } from "react";
import { drawBragCard, exportBragCard } from "../game/bragCard.js";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

/* The Holo Brag Card overlay — a collectible trading card for a
   discovered molecule, painted on a <canvas> so it exports cleanly.
   A CSS holo-foil layer shimmers over rares for the live view. */
export default function BragCard() {
  const { bragCard: m, closeBragCard, t, term, molField, discoveries } = useGame();
  const { user } = useAuth();
  const canvasRef = useRef(null);

  const rec = m ? discoveries[m.id] : null;
  const shiny = !!(rec && rec.shiny);

  useEffect(() => {
    if (!m || !canvasRef.current) return;
    drawBragCard(canvasRef.current, {
      name: molField(m, "commonName"),
      typeLabel: term(m.type) + " · " + term(m.category),
      formula: m.formula,
      atoms: m.atoms,
      rarity: m.rarity,
      rarityLabel: term(m.rarity),
      shiny,
      owner: user ? user.displayName : t("cardOwnerGuest"),
      ownerLabel: t("cardDiscoveredBy"),
      dateText: rec ? new Date(rec.date).toLocaleDateString() : "",
      cid: m.pubchemCid,
    });
  }, [m, shiny, user, term, molField, t]);

  if (!m) return null;

  const holo = shiny || m.rarity === "rare" || m.rarity === "epic";

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBragCard();
      }}
    >
      <div className="bragcard-wrap">
        <div className={"bragcard-frame rarity-" + m.rarity + (holo ? " holo" : "")}>
          <canvas ref={canvasRef} width={600} height={840} className="bragcard-canvas" />
          {holo && <div className="holo-foil" />}
        </div>
        <div className="bragcard-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              exportBragCard(canvasRef.current, "chemdex-" + m.id + ".png")
            }
          >
            {t("cardShare")}
          </button>
          <button className="btn" onClick={closeBragCard}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
