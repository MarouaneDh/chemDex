import { TIER_UNLOCK } from "../../game/progression.js";
import { CLUES } from "../../game/clues.js";
import { hazardsOf, hazardById } from "../../game/hazards.js";
import { useGame } from "../../context/GameContext.jsx";
import Formula from "../Formula.jsx";
import StructureImg from "../StructureImg.jsx";

/* One Dex tile. Four mutually exclusive states:
   discovered · tier-locked · atom-locked · discoverable (clue). */
export default function DexCard({ m }) {
  const {
    t, term, L, atomName, molField,
    discoveries, isAtomUnlocked, moleculeBuildable, tierUnlocked, openMolecule,
  } = useGame();

  const rec = discoveries[m.id];
  const idTag = m.id.replace("mol_", "#");

  // discovered
  if (rec) {
    const shiny = !!rec.shiny;
    const name = molField(m, "commonName");
    const hazards = hazardsOf(m);
    return (
      <div
        className={"dex-card discovered r-" + m.rarity + (shiny ? " shiny" : "")}
        onClick={() => openMolecule(m)}
      >
        <span className="id">{idTag}</span>
        {shiny && <span className="shiny-star">✨</span>}
        {hazards.length > 0 && (
          <span className="card-hazards" aria-label="hazards">
            {hazards.slice(0, 3).map((hid) => (
              <span key={hid} className="card-hazard" title={hazardById(hid)?.en}>
                {hazardById(hid)?.icon}
              </span>
            ))}
          </span>
        )}
        <div className="img-wrap">
          <StructureImg cid={m.pubchemCid} alt={name} />
        </div>
        <div className="name">{name}</div>
        <div className="formula">
          <Formula text={m.formula} />
        </div>
        <div className="badges">
          <span className={"badge rarity-" + m.rarity}>{term(m.rarity)}</span>
          <span className="badge badge-type">{term(m.type)}</span>
        </div>
      </div>
    );
  }

  // tier not yet unlocked
  if (!tierUnlocked(m.tier)) {
    return (
      <div className="dex-card locked tier-locked">
        <span className="id">{idTag}</span>
        <div className="img-wrap">🔒</div>
        <div className="name">{t("locked")}</div>
        <div className="clue">{t("tierLocked", TIER_UNLOCK[m.tier])}</div>
      </div>
    );
  }

  // needs an atom still locked in the tech tree — tease what's missing
  if (!moleculeBuildable(m)) {
    const missing = Object.keys(m.atoms)
      .filter((s) => !isAtomUnlocked(s))
      .map(atomName)
      .join(" + ");
    return (
      <div className="dex-card locked atom-locked" title={t("atomLockedHint")}>
        <span className="id">{idTag}</span>
        <div className="img-wrap">🔒</div>
        <div className="name">{t("locked")}</div>
        <div className="clue">{t("requiresAtoms", missing)}</div>
      </div>
    );
  }

  // discoverable — show a riddle clue instead of the answer
  return (
    <div className="dex-card locked" title={t("lockedTitle")}>
      <span className="id">{idTag}</span>
      <div className="img-wrap">?</div>
      <div className="name">{t("locked")}</div>
      <div className="clue">
        {t("clueLabel")} {L(CLUES[m.id])}
      </div>
    </div>
  );
}
