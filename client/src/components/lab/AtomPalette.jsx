import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The atom palette. Locked atoms (the Atom Tech Tree) stay visible but
   greyed with a lock — the tease is the point — and can't be dragged. */
export default function AtomPalette({ onAdd, onLockedClick }) {
  const { atoms } = useCatalog();
  const { t, atomName, isAtomUnlocked } = useGame();

  return (
    <div id="palette" className="palette">
      {atoms.map((atom) => {
        const name = atomName(atom.symbol);

        if (!isAtomUnlocked(atom.symbol)) {
          return (
            <div
              key={atom.symbol}
              className="atom locked"
              title={t("atomLockedTease", name)}
              onClick={() => onLockedClick(name)}
            >
              <span className="atom-lock">🔒</span>
              <span className="sym">{atom.symbol}</span>
              <span className="nm">{name}</span>
            </div>
          );
        }

        return (
          <div
            key={atom.symbol}
            className="atom"
            style={{ background: atom.color, color: atom.text }}
            draggable
            onClick={() => onAdd(atom.symbol)}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", atom.symbol)}
          >
            <span className="num">{atom.number}</span>
            <span className="sym">{atom.symbol}</span>
            <span className="nm">{name}</span>
          </div>
        );
      })}
    </div>
  );
}
