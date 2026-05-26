import { useEffect, useState } from "react";
import { hazardsOf, hazardById } from "../game/hazards.js";
import { readSunlight } from "../game/sunlight.js";
import { useGame } from "../context/GameContext.jsx";
import { probeSdf, getSdfStatus } from "../game/sdfCache.js";
import Formula from "./Formula.jsx";
import StructureImg from "./StructureImg.jsx";
import Molecule3D from "./Molecule3D.jsx";
import RelatedSection from "./RelatedSection.jsx";
import EvolutionChain from "./EvolutionChain.jsx";

/* The molecule detail modal. Driven by context `modal` state; renders
   nothing when closed. Tap the structure to open the zoom lightbox. */
export default function Modal() {
  const {
    modal, closeMolecule, openLightbox, openBragCard,
    t, L, term, molField, discoveries,
    vitaminDActivated, activateVitaminD,
  } = useGame();
  const [view, setView] = useState("2d");
  // sunlight-button state: idle | reading | dim | unsupported
  const [sunState, setSunState] = useState({ mode: "idle", lux: null });
  // hazards collapse to the first 3 + a "+N" pill (brainstorm #23) —
  // resets to collapsed whenever the molecule changes
  const [showAllHazards, setShowAllHazards] = useState(false);
  // 3D availability — null while we're probing PubChem for an SDF
  // record, true if one exists, false if not. Drives the disabled
  // state + "no 3D model" tooltip on the 3D segment button.
  const [has3D, setHas3D] = useState(null);

  const m = modal?.molecule;
  useEffect(() => {
    setView("2d"); // fresh 2D view whenever the molecule changes
    setSunState({ mode: "idle", lux: null });
    setShowAllHazards(false);

    // Probe for a 3D model. Myth molecules have no CID, so skip them.
    // Hydrated cache hits resolve synchronously and we never flicker
    // the button through a null state.
    if (!m || !m.pubchemCid || m.category === "myth") {
      setHas3D(false);
      return;
    }
    const cached = getSdfStatus(m.pubchemCid);
    if (cached === "ok") { setHas3D(true);  return; }
    if (cached === "none") { setHas3D(false); return; }

    setHas3D(null);
    let cancelled = false;
    probeSdf(m.pubchemCid).then((sdf) => {
      if (!cancelled) setHas3D(!!sdf);
    });
    return () => { cancelled = true; };
  }, [m?.id, m?.pubchemCid, m?.category]);

  if (!modal) return null;

  const { isNew } = modal;
  const rec = discoveries[m.id];
  const date = rec ? new Date(rec.date).toLocaleString() : null;
  const shiny = !!(rec && rec.shiny);
  const tag = shiny ? t("shinyDiscovery") : isNew ? t("newDiscovery") : "";
  const name = molField(m, "commonName");
  const isMyth = m.category === "myth";
  const isForbidden = m.category === "forbidden";
  const isVitamin = m.category === "vitamin";
  const needsSunlight = !!m.sunlightSpecial && !vitaminDActivated;
  // origin lives on the molecule document now (m.origin), not a side-table
  const origin = isMyth ? m.origin : null;
  const foundIn = isVitamin && m.foundIn ? L(m.foundIn) : null;
  const hazards = hazardsOf(m);

  const tapSunlight = async () => {
    setSunState({ mode: "reading", lux: null });
    const r = await readSunlight();
    if (r.ok) {
      activateVitaminD();
      return;
    }
    if (r.supported === false) {
      setSunState({ mode: "unsupported", lux: null });
    } else {
      setSunState({ mode: "dim", lux: Math.round(r.lux || 0) });
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMolecule();
      }}
    >
      <div
        className={
          "modal" +
          (shiny ? " shiny" : "") +
          (isNew ? " reveal" : "") +
          (isMyth ? " myth" : "") +
          (isForbidden ? " forbidden" : "") +
          (isVitamin ? " vitamin" : "")
        }
      >
        {isMyth && <span className="fictional-banner">{t("fictionalBanner")}</span>}
        {isForbidden && <span className="danger-banner">{t("dangerBanner")}</span>}
        {m.sunlightSpecial && vitaminDActivated && (
          <span className="sun-badge">{t("sunlightDone")}</span>
        )}
        {tag && <span className="discovery-tag">{tag}</span>}
        <h2>{name}</h2>
        <div className="sub">
          {molField(m, "iupacName")} &nbsp;·&nbsp; <Formula text={m.formula} />
        </div>

        {isMyth ? (
          /* No PubChem entry exists for fiction — render a styled myth
             glyph in place of the real structure image. */
          <div className="struct myth-struct">
            <span className="myth-symbol">✦</span>
            <span className="myth-name">{name}</span>
            <span className="myth-formula"><Formula text={m.formula} /></span>
          </div>
        ) : (
          <>
            {view === "3d" ? (
              /* Live WebGL viewer — drag rotates, pinch zooms, the
                 corner button toggles auto-spin. onFallback flips us
                 back to the static 2D image if PubChem has no 3D
                 record or 3Dmol fails to load.                      */
              <div className="struct struct-3d">
                <Molecule3D cid={m.pubchemCid} onFallback={() => setView("2d")} />
              </div>
            ) : (
              <div className="struct" title={t("clickZoom")} onClick={() => openLightbox(m, view)}>
                <StructureImg cid={m.pubchemCid} view={view} alt={name} />
              </div>
            )}
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
                disabled={has3D === false}
                title={has3D === false ? t("no3dModel") : undefined}
                aria-disabled={has3D === false}
              >
                3D
              </button>
              <span className="zoom-hint">
                {view === "3d" ? t("rotateHint") : t("zoomHint")}
              </span>
            </div>
          </>
        )}

        <p className="desc">{molField(m, "description")}</p>

        {origin && (
          <div className="origin-card">
            <div className="origin-row">
              <span className="origin-key">{t("originFrom")}</span>
              <strong className="origin-val">{L(origin.source)}</strong>
            </div>
            <div className="origin-row">
              <span className="origin-key">{t("realScience")}</span>
              <span className="origin-val origin-science">{L(origin.scienceNote)}</span>
            </div>
          </div>
        )}

        {isForbidden && m.safety && (
          <div className="safety-card">
            <div className="safety-row">
              <span className="safety-key">{t("safetyLabel")}</span>
              <span className="safety-val">{L(m.safety)}</span>
            </div>
          </div>
        )}

        {foundIn && (
          <div className="fridge-card">
            <div className="fridge-title">🥗 {t("foundInLabel")}</div>
            <ul className="fridge-list">
              {foundIn.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
          </div>
        )}

        {needsSunlight && (
          <div className="sunlight-card">
            <div className="sunlight-title">{t("sunlightTitle")}</div>
            <p className="sunlight-hint">{t("sunlightHint")}</p>
            {sunState.mode === "dim" && (
              <p className="sunlight-msg">{t("sunlightNotEnough", sunState.lux)}</p>
            )}
            {sunState.mode === "unsupported" ? (
              <div className="sunlight-fallback">
                <p className="sunlight-msg">{t("sunlightUnsupported")}</p>
                <div className="sunlight-actions">
                  <button className="btn btn-primary" onClick={activateVitaminD}>
                    {t("sunlightConfirm")}
                  </button>
                  <button
                    className="btn"
                    onClick={() => setSunState({ mode: "idle", lux: null })}
                  >
                    {t("sunlightCancel")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary sunlight-btn"
                onClick={tapSunlight}
                disabled={sunState.mode === "reading"}
              >
                {sunState.mode === "reading" ? t("sunlightReading") : t("sunlightActivate")}
              </button>
            )}
          </div>
        )}

        <div className="badges">
          <span className={"badge rarity-" + m.rarity}>{term(m.rarity)}</span>
          <span className="badge badge-type">{term(m.type)}</span>
          <span className="badge badge-type">{term(m.category)}</span>
          <span className="badge badge-type">
            {t("tier")} {m.tier}
          </span>
        </div>

        {hazards.length > 0 && (() => {
          // brainstorm #23 — show first 3, hide the rest behind a "+N" pill
          // that expands on tap. Reset by the effect above on molecule change.
          const visible = showAllHazards ? hazards : hazards.slice(0, 3);
          const hiddenCount = hazards.length - 3;
          return (
            <div className="hazard-row">
              <span className="hazard-label">{t("hazardsLabel")}</span>
              {visible.map((hid) => {
                const h = hazardById(hid);
                return (
                  <span key={hid} className={"hazard-tag hazard-" + hid}>
                    {h.icon} {L(h)}
                  </span>
                );
              })}
              {hiddenCount > 0 && !showAllHazards && (
                <button
                  type="button"
                  className="hazard-tag hazard-more"
                  onClick={() => setShowAllHazards(true)}
                  aria-label={t("showMoreHazards", hiddenCount)}
                >
                  +{hiddenCount} {t("more")}
                </button>
              )}
            </div>
          );
        })()}

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
            {t("pubchemCid")} <strong>{m.pubchemCid || "—"}</strong>
          </span>
          <span style={{ gridColumn: "1 / -1" }}>
            {t("inchiKey")} <strong>{m.inchiKey}</strong>
          </span>
        </div>

        <div className="funfact">💡 {molField(m, "funFact")}</div>

        <EvolutionChain m={m} />

        <RelatedSection m={m} />

        {date && (
          <div className="discovered-on">
            {t("discoveredOn")} {date}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={() => openBragCard(m)}>
            {t("bragCard")}
          </button>
          <button className="btn modal-close" onClick={closeMolecule}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
