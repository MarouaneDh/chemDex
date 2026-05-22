import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext.jsx";
import Formula from "./Formula.jsx";
import StructureImg from "./StructureImg.jsx";
import RelatedSection from "./RelatedSection.jsx";

/* The molecule detail modal. Driven by context `modal` state; renders
   nothing when closed. Tap the structure to open the zoom lightbox. */
export default function Modal() {
  const { modal, closeMolecule, openLightbox, t, term, molField, discoveries } = useGame();
  const [view, setView] = useState("2d");

  const m = modal?.molecule;
  useEffect(() => {
    setView("2d"); // fresh 2D view whenever the molecule changes
  }, [m?.id]);

  if (!modal) return null;

  const { isNew } = modal;
  const rec = discoveries[m.id];
  const date = rec ? new Date(rec.date).toLocaleString() : null;
  const shiny = !!(rec && rec.shiny);
  const tag = shiny ? t("shinyDiscovery") : isNew ? t("newDiscovery") : "";
  const name = molField(m, "commonName");

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMolecule();
      }}
    >
      <div className={"modal" + (shiny ? " shiny" : "") + (isNew ? " reveal" : "")}>
        {tag && <span className="discovery-tag">{tag}</span>}
        <h2>{name}</h2>
        <div className="sub">
          {molField(m, "iupacName")} &nbsp;·&nbsp; <Formula text={m.formula} />
        </div>

        <div className="struct" title={t("clickZoom")} onClick={() => openLightbox(m, view)}>
          <StructureImg cid={m.pubchemCid} view={view} alt={name} />
        </div>
        <div className="struct-tools">
          <button
            className={"seg" + (view === "2d" ? " active" : "")}
            onClick={() => setView("2d")}
          >
            2D
          </button>
          <button
            className={"seg" + (view === "3d" ? " active" : "")}
            onClick={() => setView("3d")}
          >
            3D
          </button>
          <span className="zoom-hint">{t("zoomHint")}</span>
        </div>

        <p className="desc">{molField(m, "description")}</p>

        <div className="badges">
          <span className={"badge rarity-" + m.rarity}>{term(m.rarity)}</span>
          <span className="badge badge-type">{term(m.type)}</span>
          <span className="badge badge-type">{term(m.category)}</span>
          <span className="badge badge-type">
            {t("tier")} {m.tier}
          </span>
        </div>

        <div className="section-title">{t("uses")}</div>
        <ul>
          {molField(m, "uses").map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>

        <div className="stats">
          <span>
            {t("molarMass")} <strong>{m.molarMass} g/mol</strong>
          </span>
          <span>
            {t("pubchemCid")} <strong>{m.pubchemCid}</strong>
          </span>
          <span style={{ gridColumn: "1 / -1" }}>
            {t("inchiKey")} <strong>{m.inchiKey}</strong>
          </span>
        </div>

        <div className="funfact">💡 {molField(m, "funFact")}</div>

        <RelatedSection m={m} />

        {date && (
          <div className="discovered-on">
            {t("discoveredOn")} {date}
          </div>
        )}

        <button className="btn modal-close" onClick={closeMolecule}>
          {t("close")}
        </button>
      </div>
    </div>
  );
}
