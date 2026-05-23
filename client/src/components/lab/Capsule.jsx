import { useEffect, useRef, useState } from "react";
import { formatCooldown } from "../../game/capsule.js";
import { SFX } from "../../game/sfx.js";
import { useGame } from "../../context/GameContext.jsx";

const SQUEEZE_MS = 850;

/* The Daily Capsule — press and hold to squeeze it open. A progress
   ring fills while you hold; release early and it springs back. When
   the bar fills, claimCapsule fires the loot (XP / hint / stabilizer). */
export default function Capsule() {
  const { capsules, claimCapsule, t } = useGame();
  const [, force] = useState(0);
  const [squeeze, setSqueeze] = useState(0); // 0..1
  const [pop, setPop] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const claimingRef = useRef(false);

  // re-render the countdown about twice a minute
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  // capsules can be null on the very first render of a fresh client
  if (!capsules) return null;

  const ready = capsules.stockpile > 0;
  const nextMs = Math.max(0, Date.parse(capsules.nextReadyAt) - Date.now());

  const cancel = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (squeeze < 1) setSqueeze(0);
  };

  const start = () => {
    if (!ready || claimingRef.current) return;
    SFX.pop();
    startRef.current = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - startRef.current) / SQUEEZE_MS);
      setSqueeze(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        claimingRef.current = true;
        setPop(true);
        claimCapsule();
        // settle back so the next capsule (if any) is ready to squeeze
        setTimeout(() => {
          setPop(false);
          setSqueeze(0);
          claimingRef.current = false;
        }, 700);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="capsule-panel">
      <div className="capsule-head">
        <span className="capsule-title">{t("capsuleTitle")}</span>
        <span className="capsule-dots" aria-hidden="true">
          <span className={"dot" + (capsules.stockpile >= 1 ? " on" : "")} />
          <span className={"dot" + (capsules.stockpile >= 2 ? " on" : "")} />
        </span>
      </div>

      <div
        className={
          "capsule-vial" +
          (ready ? " ready" : " spent") +
          (pop ? " pop" : "") +
          (squeeze > 0 && squeeze < 1 ? " squeezing" : "")
        }
        style={{ "--squeeze": squeeze }}
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        role="button"
        tabIndex={0}
        aria-label={t("capsuleTitle")}
      >
        <div className="capsule-shell" />
        <div className="capsule-fill" />
        <div className="capsule-progress">
          <div className="capsule-progress-bar" style={{ width: squeeze * 100 + "%" }} />
        </div>
      </div>

      <div className="capsule-foot">
        {ready
          ? capsules.stockpile === 2
            ? t("capsuleStockpile")
            : t("capsuleReady")
          : t("capsuleNextIn", formatCooldown(nextMs))}
      </div>
    </div>
  );
}
