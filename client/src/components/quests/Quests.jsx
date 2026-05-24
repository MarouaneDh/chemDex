import { MOLECULES } from "../../data/gamedata.js";
import { LEVELS, currentLevelIndex } from "../../game/progression.js";
import { BADGES, MISSIONS, buildStats } from "../../game/content.js";
import { useGame } from "../../context/GameContext.jsx";
import Buddy from "./Buddy.jsx";
import HazardClasses from "./HazardClasses.jsx";

/* The Quests tab — player profile, mission checklist and badge case. */
export default function Quests() {
  const { t, L, discoveries, totalXP, earnedBadges, claimedMissions, unlockedAtoms } =
    useGame();

  const stats = buildStats(discoveries, unlockedAtoms);
  const idx = currentLevelIndex(totalXP);
  const level = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const into = totalXP - level.xp;
  const span = next ? next.xp - level.xp : Math.max(into, 1);
  const pct = next ? Math.min(100, (into / span) * 100) : 100;

  return (
    <div className="quests-content">
      {/* profile */}
      <div className="profile-card">
        <div className="profile-avatar">🧑‍🔬</div>
        <div className="profile-info">
          <div className="profile-level">
            {t("level")} {idx + 1} · {L(level)}
          </div>
          <div className="xp-track">
            <div className="xp-fill" style={{ width: pct + "%" }} />
          </div>
          <div className="xp-text">
            {totalXP} XP{" "}
            {next ? `· ${next.xp - totalXP} ${t("toNext")}` : `· ${t("maxLevel")}`}
          </div>
        </div>
        <div className="profile-stats">
          <div>
            <strong>
              {stats.count}/{MOLECULES.length}
            </strong>
            <span>{t("discovered")}</span>
          </div>
          <div>
            <strong>{stats.shiny}</strong>
            <span>✨</span>
          </div>
          <div>
            <strong>
              {earnedBadges.length}/{BADGES.length}
            </strong>
            <span>{t("badges")}</span>
          </div>
        </div>
      </div>

      {/* atom buddy */}
      <Buddy />

      {/* missions */}
      <h2 className="quest-h">{t("missions")}</h2>
      <div className="mission-list">
        {MISSIONS.map((m) => {
          const prog = Math.min(m.progress(stats), m.target);
          const done = claimedMissions.includes(m.id) || prog >= m.target;
          return (
            <div key={m.id} className={"mission" + (done ? " done" : "")}>
              <span className="mission-icon">{done ? "✅" : m.icon}</span>
              <div className="mission-body">
                <div className="mission-text">{L(m)}</div>
                <div className="mission-track">
                  <div
                    className="mission-fill"
                    style={{ width: (prog / m.target) * 100 + "%" }}
                  />
                </div>
              </div>
              <span className="mission-count">
                {prog}/{m.target}
              </span>
            </div>
          );
        })}
      </div>

      {/* hazard classes */}
      <HazardClasses />

      {/* badges */}
      <h2 className="quest-h">{t("badges")}</h2>
      <div className="badge-grid">
        {BADGES.map((b) => {
          const got = earnedBadges.includes(b.id);
          return (
            <div
              key={b.id}
              className={"badge-card " + (got ? "earned" : "locked")}
              title={L(b)}
            >
              <div className="badge-emoji">{b.icon}</div>
              <div className="badge-name">{got ? L(b) : "???"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
