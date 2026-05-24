import { Fragment, useEffect, useRef } from "react";
import { chainPosition } from "../game/evolutions.js";
import { useCatalog } from "../context/CatalogContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import StructureImg from "./StructureImg.jsx";

/* Pokédex-style evolution chain — brainstorm #5.
   Shows the molecule's family line; steps the player hasn't found
   yet appear as silhouettes (the tease hook). Discovered steps are
   clickable and re-open the modal on that molecule. */
export default function EvolutionChain({ m }) {
  const { t, L, molField, discoveries, openMolecule } = useGame();
  const { molecules } = useCatalog();
  const currentRef = useRef(null);

  const pos = chainPosition(m.id);

  // when the chain renders for a molecule, scroll its chip into view
  useEffect(() => {
    if (currentRef.current?.scrollIntoView) {
      currentRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });
    }
  }, [m.id]);

  if (!pos) return null;
  const { chain } = pos;

  const byId = (id) => molecules.find((x) => x.id === id);

  return (
    <div className="evolution-card">
      <div className="evolution-title">
        🧬 {t("evolutionTitle")} · <span className="evolution-name">{L(chain.name)}</span>
      </div>
      <div className="evolution-line">
        {chain.members.map((stepId, i) => {
          const step = byId(stepId);
          const isCurrent = stepId === m.id;
          const found = !!discoveries[stepId];
          const ref = isCurrent ? currentRef : null;

          return (
            <Fragment key={stepId}>
              {i > 0 && (
                <span className="evolution-arrow" aria-hidden="true">
                  →
                </span>
              )}
              <button
                ref={ref}
                type="button"
                className={
                  "evolution-step" +
                  (isCurrent ? " current" : found ? " found" : " locked")
                }
                disabled={!found || isCurrent}
                onClick={() => found && !isCurrent && step && openMolecule(step)}
                title={
                  found && step
                    ? molField(step, "commonName")
                    : t("evolutionLocked")
                }
                aria-label={
                  found && step
                    ? molField(step, "commonName")
                    : t("evolutionLocked")
                }
              >
                <span className="evolution-thumb">
                  {found && step ? (
                    <StructureImg cid={step.pubchemCid} alt="" />
                  ) : (
                    <span className="evolution-silhouette" aria-hidden="true">
                      ?
                    </span>
                  )}
                </span>
                <span className="evolution-step-name">
                  {found && step ? molField(step, "commonName") : t("locked")}
                </span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
