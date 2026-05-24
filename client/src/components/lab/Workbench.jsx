import { useState } from "react";
import { atomBySymbol } from "../../game/rules.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The workbench — atoms dropped or clicked in. Tap an atom to remove it. */
export default function Workbench({ workbench, onRemove, onDropAtom }) {
  const { t } = useGame();
  const { atoms } = useCatalog();
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={"workbench" + (dragOver ? " drag-over" : "")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const sym = e.dataTransfer.getData("text/plain");
        if (sym) onDropAtom(sym);
      }}
    >
      {workbench.length === 0 ? (
        <p className="workbench-empty">{t("workbenchEmpty")}</p>
      ) : (
        workbench.map((sym, i) => {
          const atom = atomBySymbol(atoms, sym) || { color: "#3a4150", text: "#fff" };
          return (
            <div
              key={i}
              className="bench-atom"
              style={{ background: atom.color, color: atom.text }}
              title={t("removeAtom")}
              onClick={() => onRemove(i)}
            >
              {sym}
            </div>
          );
        })
      )}
    </div>
  );
}
