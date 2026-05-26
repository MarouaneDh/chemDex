import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { GUEST_ATOMS } from "../../data/gamedata.js";

/* The atom palette. Locked atoms (the Atom Tech Tree) stay visible but
   greyed with a lock — the tease is the point — and can't be dragged.
   Tablet + phone breakpoints turn the grid into a horizontal scroll
   strip so the workbench + Combine stay in view (see styles.css).

   Guest mode (brainstorm #50) collapses the palette to just the two
   guest atoms — H + O — so the first session is a single clean target
   (water) instead of a tease-wall of locks. */
export default function AtomPalette({ onAdd, onLockedClick }) {
  const { atoms } = useCatalog();
  const { t, atomName, isAtomUnlocked } = useGame();
  const { isGuest } = useAuth();
  const visibleAtoms = isGuest
    ? atoms.filter((a) => GUEST_ATOMS.includes(a.symbol))
    : atoms;

  return (
    <div id="palette" className="palette">
      {visibleAtoms.map((atom) => {
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
