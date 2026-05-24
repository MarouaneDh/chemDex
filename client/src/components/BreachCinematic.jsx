import { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext.jsx";

/* The Forbidden Shelf breach cinematic — fires when the player taps
   the Leak. Hazard-tape stripes scroll across a blood-red overlay; an
   alarm sting plays from sfx.breach(). Auto-dismisses after 2.8 s or
   on tap, then unleashes the Hazmat mascot line. */
export default function BreachCinematic() {
  const { breachCinematic, dismissBreachCinematic, t } = useGame();
  const doneRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!breachCinematic) return;
    doneRef.current = false;
    timerRef.current = setTimeout(end, 2800);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breachCinematic]);

  if (!breachCinematic) return null;

  function end() {
    if (doneRef.current) return;
    doneRef.current = true;
    dismissBreachCinematic();
  }

  return (
    <div className="breach-cine" onClick={end} role="button" aria-label={t("breachTitle")}>
      <div className="breach-tape breach-tape-top" />
      <div className="breach-tape breach-tape-bot" />
      <div className="breach-symbol">☣</div>
      <div className="breach-title">{t("breachTitle")}</div>
      <div className="breach-sub">{t("breachSub")}</div>
      <div className="breach-hint">{t("tapContinue")}</div>
    </div>
  );
}
