import { MOLECULES } from "../data/gamedata.js";
import { LEVELS, currentLevelIndex } from "../game/progression.js";
import { SFX } from "../game/sfx.js";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const TABS = [
  { id: "lab", i18n: "tabLab" },
  { id: "dex", i18n: "tabDex" },
  { id: "quests", i18n: "tabQuests" },
];

export default function TopBar() {
  const {
    t, L, lang, setLang, muted, toggleMute,
    discoveries, totalXP, activeTab, setActiveTab, syncStatus, openAuth,
  } = useGame();
  const { isAuthed, user } = useAuth();

  const found = MOLECULES.filter((m) => discoveries[m.id]).length;
  const total = MOLECULES.length;
  const lvlIdx = currentLevelIndex(totalXP);

  const go = (id) => {
    SFX.click();
    setActiveTab(id);
  };

  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo">⚗️</span>
        <div className="brand-text">
          <h1>
            Chem<span>dex</span>
          </h1>
          <p className="tagline">{t("tagline")}</p>
        </div>
      </div>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={"tab" + (activeTab === tab.id ? " active" : "")}
            onClick={() => go(tab.id)}
          >
            {t(tab.i18n)}
          </button>
        ))}
      </nav>

      <button className="level-chip" onClick={() => go("quests")} title="Level">
        <span className="lvl-num">{lvlIdx + 1}</span>
        {L(LEVELS[lvlIdx])}
      </button>

      <div className="progress">
        <span>
          {found} / {total}
        </span>
        <div className="progress-bar">
          <div id="progressFill" style={{ width: (found / total) * 100 + "%" }} />
        </div>
      </div>

      <button
        className="account-btn"
        onClick={() => {
          SFX.click();
          openAuth();
        }}
        title={t("account")}
      >
        <span className="account-icon">👤</span>
        <span className="account-label">
          {isAuthed ? user.displayName : t("signIn")}
        </span>
        {isAuthed && <span className={"sync-dot sync-" + syncStatus} />}
      </button>

      <button className="icon-btn" onClick={toggleMute} title="Sound">
        {muted ? "🔇" : "🔊"}
      </button>

      <div className="lang-switch">
        <button
          className={"lang" + (lang === "en" ? " active" : "")}
          onClick={() => setLang("en")}
        >
          EN
        </button>
        <button
          className={"lang" + (lang === "fr" ? " active" : "")}
          onClick={() => setLang("fr")}
        >
          FR
        </button>
      </div>
    </header>
  );
}
