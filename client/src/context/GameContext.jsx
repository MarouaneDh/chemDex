/* ============================================================
   GameContext — the single source of truth for player state.
   Every persistent slice is mirrored to localStorage here; in
   Phase 4 this same layer also syncs with the MongoDB backend.

   The game layer (XP, levels, badges, missions, daily puzzle,
   mascot) lives here too — `discover` runs the full reward flow.
   ============================================================ */

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  MOLECULES,
  ATOMS,
  STARTER_ATOMS,
  ATOM_MILESTONES,
  ATOM_BRANCHES,
} from "../data/gamedata.js";
import { TYPE_NUDGES } from "../data/i18n.js";
import { LEVELS, currentLevelIndex, TIER_UNLOCK } from "../game/progression.js";
import {
  BADGES,
  MISSIONS,
  BADGE_XP,
  MISSION_XP,
  DAILY_XP,
  discoveryXP,
  buildStats,
  mascotLine,
  atomRecipe,
  pickDailyPuzzle,
  todayStr,
} from "../game/content.js";
import {
  tickCapsules,
  claimCapsule as claimCapsuleState,
  rollCapsuleLoot,
} from "../game/capsule.js";
import { updateBuddyOnDiscovery, addStabilizer } from "../game/buddy.js";
import { CLUES } from "../game/clues.js";
import { confettiBurst, xpPopup, toast } from "../game/fx.js";
import { makeI18n } from "../i18n/t.js";
import { setSfxMuted, SFX } from "../game/sfx.js";
import { apiFetch } from "../api/client.js";
import { useAuth } from "./AuthContext.jsx";

const GameContext = createContext(null);

// A piece of state backed by localStorage. The new client runs on a
// fresh origin (localhost), so every key uses clean JSON — no need to
// stay byte-compatible with the old file:// build's storage format.
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — keep running from memory */
    }
  }, [key, value]);
  return [value, setValue];
}

export function GameProvider({ children }) {
  const { token, user } = useAuth();

  const [lang, setLang] = usePersistentState("chemdex.lang", "en");
  const [muted, setMuted] = usePersistentState("chemdex.muted", false);
  const [discoveries, setDiscoveries] = usePersistentState("chemdex.discoveries", {});
  const [totalXP, setTotalXP] = usePersistentState("chemdex.xp", 0);
  const [earnedBadges, setEarnedBadges] = usePersistentState("chemdex.badges", []);
  const [claimedMissions, setClaimedMissions] = usePersistentState("chemdex.missions", []);
  const [dailyState, setDailyState] = usePersistentState("chemdex.daily", {});
  const [unlockedAtoms, setUnlockedAtoms] = usePersistentState(
    "chemdex.atoms",
    STARTER_ATOMS.slice()
  );
  // Daily Heartbeat (Priority 3) — Capsule cooldown + Atom Buddy streak
  const [capsules, setCapsules] = usePersistentState("chemdex.capsules", null);
  const [buddy, setBuddy] = usePersistentState("chemdex.buddy", {
    streak: 0,
    lastDiscoveryDate: "",
    stabilizers: 0,
  });
  const [lastSeen, setLastSeen] = usePersistentState("chemdex.lastSeen", "");

  // which top-bar tab is showing
  const [activeTab, setActiveTab] = useState("lab");
  // the molecule detail modal — { molecule, isNew } | null
  const [modal, setModal] = useState(null);
  // the zoomable structure lightbox — { molecule, view } | null
  const [lightbox, setLightbox] = useState(null);
  // the mascot speech bubble — { text, nonce } | null  (nonce restarts the bounce)
  const [mascot, setMascot] = useState(null);
  // the account dialog — rendered at the app root, not inside the topbar,
  // because the topbar's backdrop-filter would trap a fixed overlay
  const [authOpen, setAuthOpen] = useState(false);
  // the discovery cinematic — { molecule, shiny, rarity, xp } | null
  const [catchMoment, setCatchMoment] = useState(null);
  // the shareable trading card — a molecule | null
  const [bragCard, setBragCard] = useState(null);
  // Atom Tech Tree — the "Choose Your Path" picker and unlock cinematic
  const [pathModalOpen, setPathModalOpen] = useState(false);
  const [cinematic, setCinematic] = useState(null); // { symbol, branch } | null

  // keep the audio module's mute flag in step with state
  useEffect(() => {
    setSfxMuted(muted);
  }, [muted]);

  // i18n helpers, rebuilt only when the language changes
  const i18n = useMemo(() => makeI18n(lang), [lang]);
  const { t, L, atomName } = i18n;

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (!next) {
        setSfxMuted(false); // unmute before the confirmation click
        SFX.click();
      }
      return next;
    });
  };

  /* --- derived collection state --- */
  const discoveredCount = MOLECULES.filter((m) => discoveries[m.id]).length;
  const tierUnlocked = (tier) => discoveredCount >= (TIER_UNLOCK[tier] || 0);

  /* --- Atom Tech Tree helpers (bound to current unlockedAtoms) --- */
  const isAtomUnlocked = (sym) => unlockedAtoms.includes(sym);
  const moleculeBuildable = (m) =>
    Object.keys(m.atoms).every((s) => unlockedAtoms.includes(s));

  /* --- molecule detail modal + structure lightbox --- */
  const openMolecule = (m, isNew = false) => setModal({ molecule: m, isNew });
  // closing the discovery modal is the moment to surface a pending atom pick
  const closeMolecule = () => {
    setModal(null);
    maybeOfferAtomPick();
  };
  const openLightbox = (m, view) => setLightbox({ molecule: m, view });
  const closeLightbox = () => setLightbox(null);

  /* ============================================================
     MASCOT — Atomo's speech bubble and the tiered hint ladder
     ============================================================ */
  const mascotTimer = useRef(null);
  const idleTimer = useRef(null);
  const hintState = useRef({ targetId: null, level: 0 });

  const mascotSay = (text, ms = 6000) => {
    setMascot((prev) => ({ text, nonce: (prev?.nonce || 0) + 1 }));
    clearTimeout(mascotTimer.current);
    mascotTimer.current = setTimeout(() => setMascot(null), ms);
  };

  // after a spell of inactivity, nudge the player with a gentle hint
  const resetIdle = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => showHint(false), 38000);
  };

  const vagueNudge = (m) => {
    const nudge = TYPE_NUDGES[m.type];
    if (nudge) return "🤔 " + L(nudge);
    return (
      "🤔 " +
      (m.category === "organic"
        ? lang === "fr"
          ? "Essaie quelque chose de la chimie organique."
          : "Try something from organic chemistry."
        : lang === "fr"
          ? "Pense à un composé minéral."
          : "Think of a mineral compound.")
    );
  };

  // Tapping the mascot escalates the help level; idle nudges never do,
  // so the player stays in control of how much gets spoiled.
  const showHint = (escalate = true) => {
    // myths are stumble-upon discoveries — never spoiled by a mascot hint
    const target = MOLECULES.find(
      (m) =>
        m.category !== "myth" &&
        !discoveries[m.id] &&
        tierUnlocked(m.tier) &&
        moleculeBuildable(m)
    );
    if (!target) {
      mascotSay(mascotLine("idle", lang));
      resetIdle();
      return;
    }
    if (hintState.current.targetId !== target.id) {
      hintState.current = { targetId: target.id, level: 0 };
    }
    if (escalate) {
      hintState.current.level = Math.min(3, hintState.current.level + 1);
    } else if (hintState.current.level === 0) {
      hintState.current.level = 1;
    }
    const lvl = hintState.current.level;
    let text;
    if (lvl === 1) text = vagueNudge(target);
    else if (lvl === 2) text = "🧩 " + t("atomHint", atomRecipe(target));
    else text = "💡 " + L(CLUES[target.id]);
    if (lvl < 3) text += "  ·  " + t("tapForMore");
    mascotSay(text, 9000);
    resetIdle();
  };

  /* ============================================================
     DAILY PUZZLE — one prompt per day, no streak
     ============================================================ */
  const useDailyHint = () => {
    if (!dailyState.moleculeId || dailyState.solvedAt || dailyState.hintUsed) return;
    setDailyState((d) => ({ ...d, hintUsed: true }));
    SFX.click();
  };

  /* ============================================================
     DISCOVERY — the full reward flow, run from the Lab's Combine
     ============================================================ */
  const discover = (m) => {
    const shiny = Math.random() < 0.1;
    const nextDiscoveries = {
      ...discoveries,
      [m.id]: { date: new Date().toISOString(), shiny },
    };

    // badges + missions newly satisfied by this find
    const s = buildStats(nextDiscoveries, unlockedAtoms);
    const gotBadges = BADGES.filter((b) => !earnedBadges.includes(b.id) && b.check(s));
    const gotMissions = MISSIONS.filter(
      (mi) => !claimedMissions.includes(mi.id) && mi.progress(s) >= mi.target
    );

    // daily puzzle — solved if this molecule is today's target
    const dailySolvedNow =
      dailyState.moleculeId === m.id && !dailyState.solvedAt;

    // total XP from the find, its badges, its missions and the daily
    const baseXP = discoveryXP(m, shiny);
    const xpGain =
      baseXP +
      gotBadges.length * BADGE_XP +
      gotMissions.length * MISSION_XP +
      (dailySolvedNow ? DAILY_XP : 0);
    const beforeLevel = currentLevelIndex(totalXP);
    const afterLevel = currentLevelIndex(totalXP + xpGain);

    /* --- commit every state slice --- */
    setDiscoveries(nextDiscoveries);
    // the Atom Buddy's streak — one bump per calendar day, never punished
    setBuddy((b) => updateBuddyOnDiscovery(b, todayStr()));
    if (gotBadges.length) {
      setEarnedBadges((prev) => [...prev, ...gotBadges.map((b) => b.id)]);
    }
    if (gotMissions.length) {
      setClaimedMissions((prev) => [...prev, ...gotMissions.map((mi) => mi.id)]);
    }
    if (dailySolvedNow) {
      setDailyState((d) => ({ ...d, solvedAt: new Date().toISOString() }));
    }
    setTotalXP(totalXP + xpGain);

    /* --- presentation ---
       the find itself plays as a Catch Moment cinematic; the reward
       toasts fire now, the molecule modal opens once the cinematic ends */
    gotBadges.forEach((b) => {
      SFX.badge();
      toast(b.icon, t("badgeEarned") + " " + L(b));
    });
    gotMissions.forEach((mi) => {
      SFX.mission();
      toast(mi.icon, t("missionDone") + " " + L(mi));
    });
    if (dailySolvedNow) {
      SFX.mission();
      confettiBurst(false);
      toast("🧩", t("dailySolvedToast") + "  +" + DAILY_XP + " XP");
    }
    if (afterLevel > beforeLevel) {
      SFX.levelUp();
      confettiBurst(true);
      toast("⬆️", t("levelUp") + " " + L(LEVELS[afterLevel]));
    }
    setCatchMoment({ molecule: m, shiny, rarity: m.rarity, xp: baseXP });
    resetIdle();

    return { shiny };
  };

  /* The Catch Moment cinematic finished (or was tapped through) — float
     the XP, open the molecule modal, and let the mascot react. Myth
     finds get their own stunned line under the reality-glitch overlay. */
  const finishCatch = () => {
    if (!catchMoment) return;
    const cm = catchMoment;
    setCatchMoment(null);
    xpPopup(cm.xp, cm.shiny);
    openMolecule(cm.molecule, true);
    const lineKey =
      cm.molecule.category === "myth"
        ? "mythStruck"
        : cm.shiny
          ? "shiny"
          : "discover";
    mascotSay(mascotLine(lineKey, lang));
  };

  /* --- Holo Brag Card (shareable trading card) --- */
  const openBragCard = (m) => setBragCard(m);
  const closeBragCard = () => setBragCard(null);

  /* ============================================================
     THE DAILY CAPSULE — twice-daily reward, squeeze-to-burst
     ============================================================ */
  const claimCapsule = () => {
    if (!capsules || capsules.stockpile <= 0) return null;
    const loot = rollCapsuleLoot({
      discoveries,
      unlockedAtoms,
      stabilizers: buddy.stabilizers || 0,
    });
    setCapsules((c) => claimCapsuleState(c, Date.now()));

    SFX.success();
    if (loot.kind === "xp") {
      setTotalXP((p) => p + loot.amount);
      xpPopup(loot.amount, false);
      toast("💊", t("lootXP", loot.amount));
    } else if (loot.kind === "stabilizer") {
      setBuddy((b) => addStabilizer(b));
      toast("❄️", t("lootStabilizer"));
    } else if (loot.kind === "hint") {
      mascotSay("🧩 " + t("atomHint", atomRecipe(loot.molecule)), 9000);
      toast("📜", t("lootHint"));
    }
    return loot;
  };

  /* ============================================================
     ATOM TECH TREE — milestone picks, unlock flow, cinematic
     ============================================================ */

  // Locked elements still waiting to be earned.
  const lockedAtomList = () => ATOMS.filter((a) => !unlockedAtoms.includes(a.symbol));

  // "Choose Your Path" picks earned (one per milestone) but not yet spent.
  const atomPicksPending = () => {
    const earned = ATOM_MILESTONES.filter((n) => discoveredCount >= n).length;
    const spent = unlockedAtoms.length - STARTER_ATOMS.length;
    return Math.min(earned - spent, lockedAtomList().length);
  };

  // Unlock one element: persist it, award an atom-gated badge if this
  // completes the set, then roll the fullscreen unlock cinematic.
  const unlockAtom = (sym) => {
    if (unlockedAtoms.includes(sym)) return;
    const nextAtoms = [...unlockedAtoms, sym];
    setUnlockedAtoms(nextAtoms);

    const s = buildStats(discoveries, nextAtoms);
    const gotBadges = BADGES.filter((b) => !earnedBadges.includes(b.id) && b.check(s));
    if (gotBadges.length) {
      setEarnedBadges((prev) => [...prev, ...gotBadges.map((b) => b.id)]);
      setTotalXP((prev) => prev + gotBadges.length * BADGE_XP);
      gotBadges.forEach((b) => {
        SFX.badge();
        toast(b.icon, t("badgeEarned") + " " + L(b));
      });
    }

    toast("⚛️", t("atomUnlockToast") + " · " + atomName(sym));
    setCinematic({ symbol: sym, branch: L(ATOM_BRANCHES[sym]) || atomName(sym) });
  };

  // If a pick is owed, grant the last element outright or open the
  // Choose Your Path picker so the player decides which branch to open.
  const maybeOfferAtomPick = () => {
    if (atomPicksPending() <= 0) return;
    const locked = lockedAtomList();
    if (locked.length <= 1) {
      unlockAtom(locked[0].symbol);
    } else {
      SFX.badge();
      setPathModalOpen(true);
    }
  };

  // The player chose an element from the Choose Your Path picker.
  const pickAtomFromPath = (sym) => {
    SFX.click();
    setPathModalOpen(false);
    unlockAtom(sym);
  };

  // The unlock cinematic was dismissed — another pick may now be due.
  const dismissCinematic = () => {
    setCinematic(null);
    maybeOfferAtomPick();
  };

  /* --- wipe all progress (Dex "Reset progress" button) --- */
  const resetProgress = () => {
    setDiscoveries({});
    setTotalXP(0);
    setEarnedBadges([]);
    setClaimedMissions([]);
    setUnlockedAtoms(STARTER_ATOMS.slice());
    const today = todayStr();
    const fresh = pickDailyPuzzle(today, {}, STARTER_ATOMS);
    setDailyState({
      date: today,
      moleculeId: fresh ? fresh.id : null,
      solvedAt: null,
      hintUsed: false,
    });
    setModal(null);
    setPathModalOpen(false);
    setCinematic(null);
    setCapsules(tickCapsules(null));
    setBuddy({ streak: 0, lastDiscoveryDate: "", stabilizers: 0 });
  };

  /* ============================================================
     CLOUD SYNC — push/pull the progress snapshot to the account.
     The server merges (unions), so PUT is idempotent and never
     loses progress; the client only ever applies a merged result.
     ============================================================ */
  const [syncStatus, setSyncStatus] = useState("offline");
  const syncReady = useRef(false); // true once the login pull has run
  const syncedToken = useRef(null);
  const pushTimer = useRef(null);

  // every persistent slice, in the shape the API expects
  const getProgressSnapshot = () => ({
    discoveries,
    xp: totalXP,
    badges: earnedBadges,
    missions: claimedMissions,
    daily: dailyState,
    atoms: unlockedAtoms,
    capsule: capsules,
    buddy,
    lang,
    muted,
  });

  // overwrite local state with a (merged) snapshot from the server
  const applyProgress = (p) => {
    if (!p) return;
    if (p.discoveries) setDiscoveries(p.discoveries);
    if (typeof p.xp === "number") setTotalXP(p.xp);
    if (Array.isArray(p.badges)) setEarnedBadges(p.badges);
    if (Array.isArray(p.missions)) setClaimedMissions(p.missions);
    if (p.daily) setDailyState(p.daily);
    if (Array.isArray(p.atoms) && p.atoms.length) setUnlockedAtoms(p.atoms);
    if (p.capsule) setCapsules(p.capsule);
    if (p.buddy) setBuddy(p.buddy);
    if (p.lang) setLang(p.lang);
    if (typeof p.muted === "boolean") setMuted(p.muted);
  };

  // on login: push local progress, get the merged result back, apply it
  useEffect(() => {
    if (!token || !user) {
      syncedToken.current = null;
      syncReady.current = false;
      setSyncStatus("offline");
      return;
    }
    if (syncedToken.current === token) return; // already synced this session
    syncedToken.current = token;
    setSyncStatus("syncing");
    apiFetch("/progress", { method: "PUT", token, body: getProgressSnapshot() })
      .then((data) => {
        applyProgress(data.progress);
        syncReady.current = true;
        setSyncStatus("synced");
      })
      .catch(() => setSyncStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  // after that, debounce-push whenever any progress slice changes
  useEffect(() => {
    if (!token || !syncReady.current) return;
    clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      setSyncStatus("syncing");
      apiFetch("/progress", { method: "PUT", token, body: getProgressSnapshot() })
        .then(() => setSyncStatus("synced"))
        .catch(() => setSyncStatus("error"));
    }, 1500);
    return () => clearTimeout(pushTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    token,
    discoveries,
    totalXP,
    earnedBadges,
    claimedMissions,
    dailyState,
    unlockedAtoms,
    capsules,
    buddy,
    lang,
    muted,
  ]);

  /* ============================================================
     ONE-TIME INIT — silent badge/mission sync + daily puzzle.
     Guarded by a ref so React StrictMode's double-mount runs it once.
     ============================================================ */
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // catch up any badges/missions a returning player already earned
    const s = buildStats(discoveries, unlockedAtoms);
    const syncBadges = BADGES.filter(
      (b) => !earnedBadges.includes(b.id) && b.check(s)
    ).map((b) => b.id);
    const syncMissions = MISSIONS.filter(
      (mi) => !claimedMissions.includes(mi.id) && mi.progress(s) >= mi.target
    ).map((mi) => mi.id);
    if (syncBadges.length) setEarnedBadges((p) => [...p, ...syncBadges]);
    if (syncMissions.length) setClaimedMissions((p) => [...p, ...syncMissions]);
    const syncXP = syncBadges.length * BADGE_XP + syncMissions.length * MISSION_XP;
    if (syncXP) setTotalXP((p) => p + syncXP);

    // make sure today's puzzle exists for whatever tiers are unlocked now
    const today = todayStr();
    if (dailyState.date !== today || dailyState.moleculeId === undefined) {
      const m = pickDailyPuzzle(today, discoveries, unlockedAtoms);
      setDailyState({
        date: today,
        moleculeId: m ? m.id : null,
        solvedAt: null,
        hintUsed: false,
      });
    }

    // Daily Heartbeat — bring the capsule clock up to date
    setCapsules((c) => tickCapsules(c));

    // pick a warmer "missed you" greeting if it's been a long while away
    const now = Date.now();
    const seenAt = lastSeen ? Date.parse(lastSeen) : 0;
    const greetKey =
      seenAt && now - seenAt > 18 * 60 * 60 * 1000 ? "welcomeBack" : "greet";
    setLastSeen(new Date(now).toISOString());

    // greet the player, then start the idle-nudge timer.
    // these are fire-and-forget — no cleanup, so React StrictMode's
    // double-mount can't cancel them between setup and re-setup.
    setTimeout(() => mascotSay(mascotLine(greetKey, lang), 7000), 900);
    resetIdle();

    // a returning player may already be owed an element pick
    setTimeout(() => maybeOfferAtomPick(), 1600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // any interaction resets the idle countdown
  useEffect(() => {
    const onActivity = () => resetIdle();
    window.addEventListener("pointerdown", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    lang,
    setLang,
    ...i18n, // t, term, molField, L, atomName
    muted,
    toggleMute,
    discoveries,
    setDiscoveries,
    totalXP,
    setTotalXP,
    earnedBadges,
    setEarnedBadges,
    claimedMissions,
    setClaimedMissions,
    dailyState,
    setDailyState,
    useDailyHint,
    unlockedAtoms,
    setUnlockedAtoms,
    discoveredCount,
    tierUnlocked,
    isAtomUnlocked,
    moleculeBuildable,
    discover,
    activeTab,
    setActiveTab,
    modal,
    openMolecule,
    closeMolecule,
    lightbox,
    openLightbox,
    closeLightbox,
    mascot,
    mascotSay,
    showHint,
    authOpen,
    openAuth: () => setAuthOpen(true),
    closeAuth: () => setAuthOpen(false),
    catchMoment,
    finishCatch,
    bragCard,
    openBragCard,
    closeBragCard,
    capsules,
    claimCapsule,
    buddy,
    syncStatus,
    pathModalOpen,
    lockedAtomList,
    atomPicksPending,
    pickAtomFromPath,
    cinematic,
    dismissCinematic,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within <GameProvider>");
  return ctx;
}
