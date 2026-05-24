import { ATOM_BRANCHES } from "../../data/gamedata.js";
import { moleculesWithAtom } from "../../game/content.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* "Choose Your Path" — crossing a discovery milestone earns one pick;
   the player unlocks a locked element, opening a new branch of chemistry.
   A deliberate, un-dismissable choice: no overlay click, no Escape. */
export default function ChoosePathModal() {
  const { pathModalOpen, lockedAtomList, pickAtomFromPath, t, L, atomName } = useGame();
  const { molecules } = useCatalog();
  if (!pathModalOpen) return null;

  const locked = lockedAtomList();

  return (
    <div className="path-overlay">
      <div
        className="path-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t("choosePathTitle")}
      >
        <div className="path-spark">⚛️</div>
        <h2>{t("choosePathTitle")}</h2>
        <p className="path-sub">{t("choosePathSub")}</p>
        <div className="path-grid">
          {locked.map((a) => {
            const branch = L(ATOM_BRANCHES[a.symbol]) || a.name;
            return (
              <button
                key={a.symbol}
                className="path-card"
                type="button"
                onClick={() => pickAtomFromPath(a.symbol)}
              >
                <span
                  className="path-atom"
                  style={{ background: a.color, color: a.text }}
                >
                  <span className="path-atom-num">{a.number}</span>
                  <span className="path-atom-sym">{a.symbol}</span>
                </span>
                <span className="path-name">{atomName(a.symbol)}</span>
                <span className="path-branch">{t("atomOpensBranch", branch)}</span>
                <span className="path-count">
                  {t("atomFeaturedIn", moleculesWithAtom(a.symbol, molecules))}
                </span>
                <span className="path-cta">{t("choosePathPick")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
