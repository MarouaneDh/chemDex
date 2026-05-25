import { useEffect, useRef, useState } from "react";
import { LEVELS, currentLevelIndex } from "../game/progression.js";
import { SFX } from "../game/sfx.js";
import { useGame } from "../context/GameContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useFriends } from "../context/FriendsContext.jsx";
import BrandLogo from "./BrandLogo.jsx";
import Avatar from "./Avatar.jsx";

/* Slim TopBar.
   - Always-on "found/total" progress bar is gone; Quests has the full view.
   - EN/FR switch, sound toggle and Admin tab moved into the account modal.
   - Level chip merged into the account button: avatar + name + L# · rank.
   - Mobile layout: brand on the left and account on the right share row 1,
     with the tabs row underneath (CSS grid template-areas — see styles.css).
   - The bar hides on scroll-down (past 60px) and reveals on scroll-up.
*/
const TABS = [
  { id: "lab", i18n: "tabLab" },
  { id: "sandbox", i18n: "tabSandbox" },
  { id: "dex", i18n: "tabDex" },
  { id: "quests", i18n: "tabQuests" },
];

export default function TopBar() {
  const { t, L, totalXP, activeTab, setActiveTab, syncStatus, openAuth } = useGame();
  const { isAuthed, user } = useAuth();
  const { totalUnread, incomingInvites } = useFriends();
  const badge = (totalUnread || 0) + (incomingInvites.length || 0);

  const lvlIdx = currentLevelIndex(totalXP);
  const rank = L(LEVELS[lvlIdx]);

  const go = (id) => {
    SFX.click();
    setActiveTab(id);
  };

  // Autohide on scroll-down, reveal on scroll-up (brainstorm #38).
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const rafId = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 60) {
          setHidden(false);
        } else if (y > lastY.current + 4) {
          setHidden(true);
        } else if (y < lastY.current - 4) {
          setHidden(false);
        }
        lastY.current = y;
        rafId.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <header className={"topbar" + (hidden ? " topbar--hidden" : "")}>
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

      <button
        className="account-btn"
        onClick={() => {
          SFX.click();
          openAuth();
        }}
        title={t("account")}
      >
        <Avatar
          src={user?.avatar}
          size={36}
          className="account-btn-avatar"
          fallback="👤"
        />
        <span className="account-btn-text">
          <span className="account-btn-name">
            {isAuthed ? user.displayName : t("signIn")}
          </span>
          {isAuthed && (
            <span className="account-btn-meta">
              <span className="account-btn-lvl">L{lvlIdx + 1}</span>
              <span className="account-btn-rank">{rank}</span>
            </span>
          )}
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
    </header>
  );
}
