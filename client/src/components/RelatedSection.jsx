import { RELATED } from "../data/gamedata.js";
import { TIER_UNLOCK } from "../game/progression.js";
import { CLUES } from "../game/clues.js";
import { useCatalog } from "../context/CatalogContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import Formula from "./Formula.jsx";
import StructureImg from "./StructureImg.jsx";

/* One neighbour chip. Discovered -> clickable thumbnail; discoverable ->
   clickable, jumps to the Lab; tier/atom-locked -> static tease. */
function RelatedChip({ r }) {
  const {
    t, L, molField, atomName,
    discoveries, tierUnlocked, moleculeBuildable, isAtomUnlocked,
    openMolecule, closeMolecule, setActiveTab,
  } = useGame();

  if (discoveries[r.id]) {
    return (
      <button className="related-chip found" type="button" onClick={() => openMolecule(r)}>
        <span className="rc-img">
          <StructureImg cid={r.pubchemCid} alt="" />
        </span>
        <span className="rc-text">
          <span className="rc-name">{molField(r, "commonName")}</span>
          <span className="rc-formula">
            <Formula text={r.formula} />
          </span>
        </span>
      </button>
    );
  }

  if (!tierUnlocked(r.tier)) {
    return (
      <div className="related-chip tier-locked">
        <span className="rc-img">🔒</span>
        <span className="rc-text">
          <span className="rc-name">{t("locked")}</span>
          <span className="rc-clue">{t("tierLocked", TIER_UNLOCK[r.tier])}</span>
        </span>
      </div>
    );
  }

  if (!moleculeBuildable(r)) {
    const missing = Object.keys(r.atoms)
      .filter((s) => !isAtomUnlocked(s))
      .map(atomName)
      .join(" + ");
    return (
      <div className="related-chip tier-locked">
        <span className="rc-img">🔒</span>
        <span className="rc-text">
          <span className="rc-name">{t("locked")}</span>
          <span className="rc-clue">{t("requiresAtoms", missing)}</span>
        </span>
      </div>
    );
  }

  // discoverable — clicking hops to the Lab to go build it
  return (
    <button
      className="related-chip locked"
      type="button"
      title={t("lockedTitle")}
      onClick={() => {
        closeMolecule();
        setActiveTab("lab");
      }}
    >
      <span className="rc-img rc-q">?</span>
      <span className="rc-text">
        <span className="rc-name">{t("locked")}</span>
        <span className="rc-clue">{L(CLUES[r.id])}</span>
      </span>
    </button>
  );
}

/* The "Related discoveries" row at the bottom of the molecule modal. */
export default function RelatedSection({ m }) {
  const { t } = useGame();
  const { molecules } = useCatalog();
  const ids = RELATED[m.id] || [];
  const neighbors = ids.map((id) => molecules.find((x) => x.id === id)).filter(Boolean);
  if (neighbors.length === 0) return null;

  return (
    <>
      <div className="section-title">{t("relatedTitle")}</div>
      <div className="related-grid">
        {neighbors.map((r) => (
          <RelatedChip key={r.id} r={r} />
        ))}
      </div>
    </>
  );
}
