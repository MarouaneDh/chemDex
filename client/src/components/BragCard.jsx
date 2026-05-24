import { useEffect, useRef } from "react";
import { drawBragCard, exportBragCard } from "../game/bragCard.js";
import { useCatalog } from "../context/CatalogContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

/* The Holo Brag Card overlay — a collectible trading card for a
   discovered molecule, painted on a <canvas> so it exports cleanly.
   A CSS holo-foil layer shimmers over rares for the live view. */
export default function BragCard() {
  const { bragCard: m, closeBragCard, t, term, molField, discoveries } = useGame();
  const { atoms } = useCatalog();
  const { user } = useAuth();
  const canvasRef = useRef(null);

  const rec = m && !m.invented ? discoveries[m.id] : null;
  const shiny = !!(rec && rec.shiny);
  const invented = !!m?.invented;
  // sandbox creations carry their own createdAt (not in discoveries)
  const dateISO = invented ? m.createdAt : rec?.date;

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
      owner: user ? user.displayName : t("cardOwnerGuest"),
      ownerLabel: invented ? t("sbInventedBy") : t("cardDiscoveredBy"),
      dateText: dateISO ? new Date(dateISO).toLocaleDateString() : "",
      cid: invented ? null : m.pubchemCid,
    });
  }, [m, shiny, invented, user, term, molField, t, atoms]);

  if (!m) return null;

  const holo = shiny || m.rarity === "rare" || m.rarity === "epic" || invented;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBragCard();
      }}
    >
      <div className="bragcard-wrap">
        {invented && (
          <div className="bragcard-invented-banner">{t("sbInventedTypeLabel")}</div>
        )}
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
