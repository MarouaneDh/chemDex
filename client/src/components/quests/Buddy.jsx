import { BUDDY_STAGES, buddyStage } from "../../game/buddy.js";
import { useGame } from "../../context/GameContext.jsx";

/* The Atom Buddy — the streak made cuddly. Four growth stages keyed
   off the consecutive-day discovery streak, with stockpiled
   Cryo-Stabilizers shown as ❄️ pips. Lives in the Quests profile. */
export default function Buddy() {
  const { buddy, lang, t } = useGame();
  const streak = buddy?.streak || 0;
  const stage = buddyStage(streak);
  const stageIdx = BUDDY_STAGES.indexOf(stage);
  const nextStage = BUDDY_STAGES[stageIdx + 1];
  const stageName = stage[lang] || stage.en;
  const daysToNext = nextStage ? nextStage.minStreak - streak : 0;

  return (
    <div className="buddy-card">
      <div className={"buddy-avatar stage-" + stage.id}>
        <span className="buddy-glyph">{stage.glyph}</span>
      </div>
      <div className="buddy-info">
        <div className="buddy-title">{t("buddyTitle")}</div>
        <div className="buddy-stage">
          {t("stagePrefix")} {stageIdx + 1} · {stageName}
        </div>
        <div className="buddy-streak">
          {streak > 0 ? t("buddyStreak", streak) : t("buddyDormant")}
        </div>
        {nextStage && streak > 0 && (
          <div className="buddy-next">{t("buddyNext", daysToNext)}</div>
        )}
      </div>
      <div className="buddy-stabilizers" title={t("buddyStabilizers")}>
        <span className={"stab" + ((buddy?.stabilizers || 0) >= 1 ? " on" : "")}>❄️</span>
        <span className={"stab" + ((buddy?.stabilizers || 0) >= 2 ? " on" : "")}>❄️</span>
      </div>
    </div>
  );
}
