import { useState } from "react";
import { countAtoms, countsEqual, hillFormula } from "../../game/rules.js";
import { SFX } from "../../game/sfx.js";
import { mascotLine } from "../../game/content.js";
import { useGame } from "../../context/GameContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import AtomPalette from "./AtomPalette.jsx";
import Workbench from "./Workbench.jsx";
import DailyPuzzle from "./DailyPuzzle.jsx";
import Leak from "./Leak.jsx";
import Formula from "../Formula.jsx";

/* The Lab — build a molecule from atoms, then Combine to validate.
   A new molecule hands off to context's `discover`, which runs the
   full reward flow (XP, badges, missions, daily, confetti, modal). */
export default function Lab() {
  const {
    t, lang, molField, discoveries, discover, isAtomUnlocked, mascotSay,
    combineMolecule, leakAppeared,
  } = useGame();
  const { isGuest } = useAuth();
  const [workbench, setWorkbench] = useState([]);
  const [message, setMessage] = useState({ text: "", kind: "" });

  // Guest onboarding (brainstorm #29 / #50) — show a one-line coach
  // hint while there are no discoveries yet, and pulse the Combine
  // button to advertise the next tap once the workbench has atoms.
  const noDiscoveriesYet = Object.keys(discoveries).length === 0;
  const isGuestOnboarding = isGuest && noDiscoveriesYet;
  const combineCtaGlow = isGuestOnboarding && workbench.length > 0;

  const clearMessage = () => setMessage({ text: "", kind: "" });

  const addAtom = (sym) => {
    if (!isAtomUnlocked(sym)) return; // locked atoms can't reach the bench
    setWorkbench((w) => [...w, sym]);
    clearMessage();
    SFX.pop();
  };

  // Each tile in the workbench is now grouped by symbol with a ×N badge
  // (see Workbench.jsx). Tapping a tile removes one instance of that
  // symbol — we strip the most-recently-appended one so the visual
  // count decrements predictably.
  const removeAtom = (sym) => {
    setWorkbench((w) => {
      const idx = w.lastIndexOf(sym);
      if (idx === -1) return w;
      return w.filter((_, i) => i !== idx);
    });
    clearMessage();
    SFX.place();
  };

  const clear = () => {
    setWorkbench([]);
    clearMessage();
    SFX.click();
  };

  const lockedFeedback = () => {
    SFX.fail();
    setMessage({ text: t("atomLockedHint"), kind: "info" });
  };

  const combine = () => {
    if (workbench.length === 0) {
      setMessage({ text: t("addAtomsFirst"), kind: "info" });
      return;
    }
    const counts = countAtoms(workbench);
    // forbidden recipes are "cursed" — they only match after the breach
    const match = combineMolecule(counts, (m, c) => countsEqual(m.atoms, c));

    if (!match) {
      setMessage({ text: t("noMatch", hillFormula(counts)), kind: "bad" });
      SFX.fail();
      mascotSay(mascotLine("fail", lang));
      return;
    }

    if (!discoveries[match.id]) {
      const { shiny } = discover(match); // reward flow, sfx + modal
      setMessage({
        text:
          (shiny ? t("shinyDiscovery") : t("newDiscovery")) +
          " · " +
          molField(match, "commonName"),
        kind: "ok",
      });
    } else {
      SFX.click();
      setMessage({ text: t("alreadyKnown", molField(match, "commonName")), kind: "ok" });
    }
    setWorkbench([]);
  };

  const liveFormula = hillFormula(countAtoms(workbench));

  return (
    <>
      {isGuestOnboarding && (
        <div className="guest-coach" role="status">
          <span className="guest-coach-spark" aria-hidden="true">✦</span>
          <span className="guest-coach-text">{t("guestCoachHint")}</span>
        </div>
      )}

      {/* Daily puzzle belongs to the long-term retention loop — hide
          it from guests entirely so the first surface stays focused
          on the one verb (combine) that earns them a discovery. */}
      {!isGuest && (
        <div className="heartbeat-row">
          <DailyPuzzle />
        </div>
      )}

      <div className="lab-grid">
        <div className="panel">
          <h2>{t("atoms")}</h2>
          <p className="hint">{t("atomsHint")}</p>
          <AtomPalette onAdd={addAtom} onLockedClick={lockedFeedback} />
        </div>

        <div className="panel workbench-panel">
          {leakAppeared && <Leak />}
          <h2>{t("workbench")}</h2>
          <Workbench workbench={workbench} onRemove={removeAtom} onDropAtom={addAtom} />
          <div className="formula-line">
            <span>{t("formula")}</span>{" "}
            <strong>
              <Formula text={liveFormula} />
            </strong>
          </div>
        </div>
      </div>

      {/* Sticky contextual action bar (brainstorm #11/#12). On mobile this
          bleeds to the viewport edges and pins to the bottom so Combine is
          visible no matter how far the page has scrolled. On desktop it
          relaxes into a normal flow block below the workbench. */}
      <div className="lab-action-bar">
        {message.text && (
          <p className={"lab-message " + message.kind}>{message.text}</p>
        )}
        <div className="lab-actions">
          <button
            className={"btn btn-primary" + (combineCtaGlow ? " combine-glow" : "")}
            onClick={combine}
          >
            {t("combine")}
          </button>
          <button className="btn" onClick={clear}>
            {t("clear")}
          </button>
        </div>
      </div>
    </>
  );
}
