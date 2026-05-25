import { LEVELS, currentLevelIndex } from "../game/progression.js";
import { SFX } from "../game/sfx.js";
import { useCatalog } from "../context/CatalogContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useFriends } from "../context/FriendsContext.jsx";
import BrandLogo from "./BrandLogo.jsx";

const TABS = [
  { id: "lab", i18n: "tabLab" },
  { id: "sandbox", i18n: "tabSandbox" },
  { id: "dex", i18n: "tabDex" },
  { id: "quests", i18n: "tabQuests" },
];
const ADMIN_TAB = { id: "admin", i18n: "tabAdmin" };

export default function TopBar() {
  const {
    t, L, lang, setLang, muted, toggleMute,
    discoveries, totalXP, activeTab, setActiveTab, syncStatus, openAuth,
  } = useGame();
  const { isAuthed, isAdmin, user } = useAuth();
  const { totalUnread, incomingInvites } = useFriends();
  const visibleTabs = isAdmin ? [...TABS, ADMIN_TAB] : TABS;
  // anything that needs the player's attention — unread chat messages
  // plus pending friend invitations — surfaces as one red badge
  const badge = (totalUnread || 0) + (incomingInvites.length || 0);
  const { molecules } = useCatalog();

  const found = molecules.filter((m) => discoveries[m.id]).length;
  const total = molecules.length;
  const lvlIdx = currentLevelIndex(totalXP);

  const go = (id) => {
    SFX.click();
    setActiveTab(id);
  };

  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo">
          <BrandLogo size={28} title="Chemdex" />
        </span>
        <div className="brand-text">
          <h1>
            Chem<span>dex</span>
          </h1>
          <p className="tagline">{t("tagline")}</p>
        </div>
      </div>

      <nav className="tabs">
        {visibleTabs.map((tab) => (
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
        {isAuthed && badge > 0 && (
          <span
            className="account-badge"
            aria-label={t("notificationsAria", badge)}
          >
            {badge > 9 ? "9+" : badge}
          </span>
        )}
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
