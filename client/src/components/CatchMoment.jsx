import { useEffect, useRef } from "react";
import { SFX } from "../game/sfx.js";
import { useGame } from "../context/GameContext.jsx";

/* The Catch Moment — discovery plays as a cinematic: a sound sting, a
   screen shake, a light burst and expanding shockwave rings. Rarer
   molecules run longer and wilder; the duration itself signals rarity.
   Tap to skip. When it ends, the molecule modal takes over. */

const CATCH_MS = { common: 1300, uncommon: 1700, rare: 2300, epic: 3000 };

export default function CatchMoment() {
  const { catchMoment, finishCatch, t, term, molField } = useGame();
  const doneRef = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    if (!catchMoment) return;
    doneRef.current = false;
    const rarity = catchMoment.rarity || "common";
    const dur = (CATCH_MS[rarity] || CATCH_MS.common) + (catchMoment.shiny ? 500 : 0);

    SFX.discover();
    if (catchMoment.shiny) timers.current.push(setTimeout(() => SFX.sparkle(), 360));

    // screen shake — a class on <body> so the whole viewport jolts
    document.body.classList.add("catch-shake");
    timers.current.push(
      setTimeout(() => document.body.classList.remove("catch-shake"), 620)
    );
    timers.current.push(setTimeout(end, dur));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.classList.remove("catch-shake");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catchMoment]);

  if (!catchMoment) return null;

  function end() {
    if (doneRef.current) return;
    doneRef.current = true;
    finishCatch();
  }

  const { molecule, shiny, rarity } = catchMoment;
  const dur = (CATCH_MS[rarity] || CATCH_MS.common) + (shiny ? 500 : 0);
  const isMyth = molecule.category === "myth";

  return (
    <div
      className={
        "catch-moment rarity-" +
        rarity +
        (shiny ? " shiny" : "") +
        (isMyth ? " glitch" : "")
      }
      style={{ "--catch-dur": dur + "ms" }}
      onClick={end}
      role="button"
      aria-label={t("newDiscovery")}
    >
      <div className="catch-flash" />
      <div className="catch-ring" />
      <div className="catch-ring catch-ring-2" />
      <div className="catch-ring catch-ring-3" />
      <div className="catch-core">
        <span className="catch-core-glyph">⚗️</span>
      </div>
      <div className="catch-label">
        <span className="catch-tag">
          {shiny ? t("shinyDiscovery") : t("newDiscovery")}
        </span>
        <span className="catch-name">{molField(molecule, "commonName")}</span>
        <span className="catch-rarity">{term(rarity)}</span>
      </div>
      <div className="catch-skip">{t("tapContinue")}</div>
    </div>
  );
}
