import { CLUES } from "../../game/clues.js";
import { atomRecipe } from "../../game/content.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";

/* The daily-puzzle banner at the top of the Lab. One riddle per day;
   solving it in the Workbench is detected by the discovery flow. */
export default function DailyPuzzle() {
  const { t, L, molField, dailyState, useDailyHint } = useGame();
  const { molecules } = useCatalog();

  const m = dailyState.moleculeId
    ? molecules.find((x) => x.id === dailyState.moleculeId)
    : null;
  const solved = !!dailyState.solvedAt;

  let prompt;
  if (!m) prompt = t("dailyEmpty");
  else if (solved) prompt = t("dailySolved", molField(m, "commonName"));
  else prompt = L(CLUES[m.id]);

  return (
    <div className={"daily-panel" + (solved ? " solved" : "")}>
      <div className="daily-main">
        <span className="daily-emoji">🧩</span>
        <div className="daily-body">
          <div className="daily-title">🧩 {t("dailyTitle")}</div>
          <p className="daily-prompt">{prompt}</p>
          {m && !solved && dailyState.hintUsed && (
            <div className="daily-hintbox">{atomRecipe(m)}</div>
          )}
        </div>
        {m && !solved && !dailyState.hintUsed && (
          <button className="btn daily-hint-btn" onClick={useDailyHint}>
            {t("dailyHint")}
          </button>
        )}
      </div>
    </div>
  );
}
