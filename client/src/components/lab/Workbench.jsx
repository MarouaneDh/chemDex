import { useMemo, useState } from "react";
import { atomBySymbol } from "../../game/rules.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The workbench — atoms dropped or clicked in.

   Repeated atoms collapse to ONE tile with a ×N badge instead of
   stacking N separate copies; tapping a tile removes one instance
   (the last appended). The underlying `workbench` array still holds
   every atom literally — only the render is grouped — so combine
   matching (which counts occurrences) keeps working unchanged. */
export default function Workbench({ workbench, onRemove, onDropAtom }) {
  const { t } = useGame();
  const { atoms } = useCatalog();
  const [dragOver, setDragOver] = useState(false);

  // Build a list of unique symbols in the order they first appeared,
  // plus a count per symbol. Memo'd because workbench changes shape
  // on every keystroke-equivalent (add/remove).
  const grouped = useMemo(() => {
    const order = [];
    const counts = new Map();
    for (const sym of workbench) {
      if (!counts.has(sym)) order.push(sym);
      counts.set(sym, (counts.get(sym) || 0) + 1);
    }
    return order.map((sym) => ({ sym, count: counts.get(sym) }));
  }, [workbench]);

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
      {grouped.length === 0 ? (
        <p className="workbench-empty">{t("workbenchEmpty")}</p>
      ) : (
        grouped.map(({ sym, count }) => {
          const atom = atomBySymbol(atoms, sym) || { color: "#3a4150", text: "#fff" };
          return (
            <div
              key={sym}
              className="bench-atom"
              style={{ background: atom.color, color: atom.text }}
              title={count > 1 ? t("removeOneAtom") : t("removeAtom")}
              onClick={() => onRemove(sym)}
            >
              {sym}
              {count > 1 && (
                <span className="bench-atom-count" aria-label={`×${count}`}>
                  ×{count}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
