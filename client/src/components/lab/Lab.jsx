import { useState } from "react";
import { MOLECULES } from "../../data/gamedata.js";
import { countAtoms, countsEqual, hillFormula } from "../../game/rules.js";
import { SFX } from "../../game/sfx.js";
import { mascotLine } from "../../game/content.js";
import { useGame } from "../../context/GameContext.jsx";
import AtomPalette from "./AtomPalette.jsx";
import Workbench from "./Workbench.jsx";
import DailyPuzzle from "./DailyPuzzle.jsx";
import Formula from "../Formula.jsx";

/* The Lab — build a molecule from atoms, then Combine to validate.
   A new molecule hands off to context's `discover`, which runs the
   full reward flow (XP, badges, missions, daily, confetti, modal). */
export default function Lab() {
  const { t, lang, molField, discoveries, discover, isAtomUnlocked, mascotSay } = useGame();
  const [workbench, setWorkbench] = useState([]);
  const [message, setMessage] = useState({ text: "", kind: "" });

  const clearMessage = () => setMessage({ text: "", kind: "" });

  const addAtom = (sym) => {
    if (!isAtomUnlocked(sym)) return; // locked atoms can't reach the bench
    setWorkbench((w) => [...w, sym]);
    clearMessage();
    SFX.pop();
  };

  const removeAtom = (index) => {
    setWorkbench((w) => w.filter((_, i) => i !== index));
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
    const match = MOLECULES.find((m) => countsEqual(m.atoms, counts));

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
      <DailyPuzzle />

      <div className="lab-grid">
        <div className="panel">
          <h2>{t("atoms")}</h2>
          <p className="hint">{t("atomsHint")}</p>
          <AtomPalette onAdd={addAtom} onLockedClick={lockedFeedback} />
        </div>

        <div className="panel workbench-panel">
          <h2>{t("workbench")}</h2>
          <Workbench workbench={workbench} onRemove={removeAtom} onDropAtom={addAtom} />
          <div className="formula-line">
            <span>{t("formula")}</span>{" "}
            <strong>
              <Formula text={liveFormula} />
            </strong>
          </div>
          <div className="lab-actions">
            <button className="btn btn-primary" onClick={combine}>
              {t("combine")}
            </button>
            <button className="btn" onClick={clear}>
              {t("clear")}
            </button>
          </div>
          <p className={"lab-message " + message.kind}>{message.text}</p>
        </div>
      </div>
    </>
  );
}
