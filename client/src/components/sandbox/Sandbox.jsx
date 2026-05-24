import { useState } from "react";
import { countAtoms, hillFormula } from "../../game/rules.js";
import { SFX } from "../../game/sfx.js";
import { useGame } from "../../context/GameContext.jsx";
import AtomPalette from "../lab/AtomPalette.jsx";
import Workbench from "../lab/Workbench.jsx";
import Formula from "../Formula.jsx";
import PublishDialog from "./PublishDialog.jsx";
import SandboxGallery from "./SandboxGallery.jsx";

/* The Mad Science Sandbox — brainstorm #41.
   Build any combination of unlocked atoms, name it, publish. If the
   recipe happens to match a real molecule that's still buildable, the
   engine auto-promotes the creation to a real discovery. */
export default function Sandbox() {
  const { t, isAtomUnlocked, publishSandbox } = useGame();
  const [workbench, setWorkbench] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", kind: "" });

  const addAtom = (sym) => {
    if (!isAtomUnlocked(sym)) return;
    setWorkbench((w) => [...w, sym]);
    setMessage({ text: "", kind: "" });
    SFX.pop();
  };
  const removeAtom = (i) => {
    setWorkbench((w) => w.filter((_, idx) => idx !== i));
    SFX.place();
  };
  const clear = () => {
    setWorkbench([]);
    setMessage({ text: "", kind: "" });
    SFX.click();
  };
  const lockedFeedback = () => {
    SFX.fail();
    setMessage({ text: t("atomLockedHint"), kind: "info" });
  };

  const openPublish = () => {
    if (workbench.length === 0) {
      setMessage({ text: t("addAtomsFirst"), kind: "info" });
      return;
    }
    SFX.click();
    setDialogOpen(true);
  };

  const handlePublish = ({ name, description, rarity }) => {
    const atomsMap = countAtoms(workbench);
    const result = publishSandbox({ name, description, rarity, atoms: atomsMap });

    if (result.kind === "realDiscovery") {
      // the engine auto-promoted it to a real molecule — catch moment fires;
      // close our dialog and let the standard discovery flow take over
      setDialogOpen(false);
      setWorkbench([]);
      setMessage({
        text: t("sbRealChemistry", result.molecule.commonName),
        kind: "ok",
      });
    } else if (result.kind === "saved") {
      // pure invention saved to the gallery
      setDialogOpen(false);
      setWorkbench([]);
      setMessage({
        text: t("sbSaved", result.entry.name),
        kind: "ok",
      });
      SFX.success();
    }
    // "alreadyKnown" — dialog stays open so the player can rename or cancel
    return result;
  };

  const liveFormula = hillFormula(countAtoms(workbench));

  return (
    <>
      <div className="sandbox-intro">
        <h2 className="sandbox-title">🧪 {t("sandboxTitle")}</h2>
        <p className="sandbox-sub">{t("sandboxSub")}</p>
      </div>

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
            <button className="btn btn-primary" onClick={openPublish}>
              {t("sbPublishCta")}
            </button>
            <button className="btn" onClick={clear}>
              {t("clear")}
            </button>
          </div>
          <p className={"lab-message " + message.kind}>{message.text}</p>
        </div>
      </div>

      <SandboxGallery />

      {dialogOpen && (
        <PublishDialog
          formula={liveFormula}
          atoms={countAtoms(workbench)}
          onClose={() => setDialogOpen(false)}
          onPublish={handlePublish}
        />
      )}
    </>
  );
}
