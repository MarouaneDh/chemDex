import { useEffect, useRef, useState } from "react";
import { SFX } from "../../game/sfx.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The fullscreen element-unlock cinematic — the atom flies in over two
   shockwave rings. Dismisses on tap or after a short auto-timer; the
   `closing` class plays the exit animation before the overlay unmounts. */
export default function AtomCinematic() {
  const { cinematic, dismissCinematic, t, atomName } = useGame();
  const { atoms } = useCatalog();
  const [closing, setClosing] = useState(false);
  const closedRef = useRef(false);
  const exitTimer = useRef(null);

  // when a new cinematic appears: reset, play the fanfare, arm auto-dismiss
  useEffect(() => {
    if (!cinematic) return;
    closedRef.current = false;
    setClosing(false);
    SFX.levelUp();
    const auto = setTimeout(() => beginClose(), 2800);
    return () => {
      clearTimeout(auto);
      clearTimeout(exitTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cinematic]);

  if (!cinematic) return null;

  function beginClose() {
    if (closedRef.current) return;
    closedRef.current = true;
    setClosing(true);
    exitTimer.current = setTimeout(() => dismissCinematic(), 240);
  }

  const atom = atoms.find((a) => a.symbol === cinematic.symbol);
  if (!atom) return null;

  return (
    <div className={"atom-cine" + (closing ? " closing" : "")} onClick={beginClose}>
      <div className="cine-ring" />
      <div className="cine-ring cine-ring-2" />
      <div
        className="cine-atom"
        style={{ background: atom.color, color: atom.text }}
      >
        <span className="cine-num">{atom.number}</span>
        <span className="cine-sym">{atom.symbol}</span>
      </div>
      <div className="cine-tag">{t("atomUnlockedTag")}</div>
      <div className="cine-name">{atomName(cinematic.symbol)}</div>
      <div className="cine-branch">{t("atomOpensBranch", cinematic.branch)}</div>
      <div className="cine-hint">{t("tapContinue")}</div>
    </div>
  );
}
