import { TIER_UNLOCK } from "../../game/progression.js";
import { CLUES } from "../../game/clues.js";
import { hazardsOf, hazardById } from "../../game/hazards.js";
import { useGame } from "../../context/GameContext.jsx";
import Formula from "../Formula.jsx";

/* Symbol-only Dex card (brainstorm #20 — anchor decision).
   The molecule's formula is the visual hero; the structure image lives
   exclusively in the detail modal now. Without the white image plate
   the card reads denser at 3/5/7-across grids, and the formula gets
   space to breathe at the centre.

   The four mutually exclusive states still drive the render:
     · discovered   — formula + name + (optional shiny ✨ + top hazard)
     · tier-locked  — 🔒 + level-required clue
     · atom-locked  — 🔒 + missing-atoms tease
     · discoverable — ? + riddle clue                                  */

export default function DexCard({ m }) {
  const {
    t, term, L, atomName, molField,
    discoveries, isAtomUnlocked, moleculeBuildable, tierUnlocked, openMolecule,
  } = useGame();

  const rec = discoveries[m.id];
  const idTag = m.id.replace("mol_", "#");

  // ─── discovered ─────────────────────────────────────────────
  if (rec) {
    const shiny = !!rec.shiny;
    const name = molField(m, "commonName");
    const hazards = hazardsOf(m);
    // brainstorm #32 — single most-severe hazard (first in the list) at a
    // readable size; the full list lives in the detail modal
    const topHazard = hazards[0];
    return (
      <div
        className={"dex-card discovered r-" + m.rarity + (shiny ? " shiny" : "")}
        onClick={() => openMolecule(m)}
        aria-label={name}
      >
        <span className="id">{idTag}</span>
        {shiny && <span className="shiny-star" aria-hidden="true">✨</span>}
        {topHazard && (
          <span
            className="dex-card-hazard"
            title={L(hazardById(topHazard) || {}) || hazardById(topHazard)?.en}
            aria-label="hazard"
          >
            {hazardById(topHazard)?.icon}
          </span>
        )}
        <div className="dex-glyph">
          <Formula text={m.formula} />
        </div>
        <div className="name">{name}</div>
        <div className={"dex-rarity-tag rarity-" + m.rarity}>{term(m.rarity)}</div>
      </div>
    );
  }

  // ─── tier not yet unlocked ──────────────────────────────────
  if (!tierUnlocked(m.tier)) {
    return (
      <div className="dex-card locked tier-locked">
        <span className="id">{idTag}</span>
        <div className="dex-glyph dex-glyph--lock" aria-hidden="true">🔒</div>
        <div className="name">{t("locked")}</div>
        <div className="clue">{t("tierLocked", TIER_UNLOCK[m.tier])}</div>
      </div>
    );
  }

  // ─── atom-locked: tease the missing elements ────────────────
  if (!moleculeBuildable(m)) {
    const missing = Object.keys(m.atoms)
      .filter((s) => !isAtomUnlocked(s))
      .map(atomName)
      .join(" + ");
    return (
      <div className="dex-card locked atom-locked" title={t("atomLockedHint")}>
        <span className="id">{idTag}</span>
        <div className="dex-glyph dex-glyph--lock" aria-hidden="true">🔒</div>
        <div className="name">{t("locked")}</div>
        <div className="clue">{t("requiresAtoms", missing)}</div>
      </div>
    );
  }

  // ─── discoverable: riddle clue, not the answer ──────────────
  return (
    <div className="dex-card locked" title={t("lockedTitle")}>
      <span className="id">{idTag}</span>
      <div className="dex-glyph dex-glyph--mystery" aria-hidden="true">?</div>
      <div className="name">{t("locked")}</div>
      <div className="clue">
        {t("clueLabel")} {L(CLUES[m.id])}
      </div>
    </div>
  );
}
