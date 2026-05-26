import { useEffect } from "react";
import TopBar from "./components/TopBar.jsx";
import Lab from "./components/lab/Lab.jsx";
import Dex from "./components/dex/Dex.jsx";
import Quests from "./components/quests/Quests.jsx";
import Sandbox from "./components/sandbox/Sandbox.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import Modal from "./components/Modal.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Lightbox from "./components/Lightbox.jsx";
import Mascot from "./components/Mascot.jsx";
import AuthModal from "./components/auth/AuthModal.jsx";
import ChatModal from "./components/chat/ChatModal.jsx";
import CatchMoment from "./components/CatchMoment.jsx";
import BragCard from "./components/BragCard.jsx";
import ChoosePathModal from "./components/atom/ChoosePathModal.jsx";
import AtomCinematic from "./components/atom/AtomCinematic.jsx";
import BreachCinematic from "./components/BreachCinematic.jsx";
import Landing from "./components/landing/Landing.jsx";
import { useGame } from "./context/GameContext.jsx";

/* The app shell. Each tab's view is always mounted and toggled with the
   `active` class — this preserves the CSS fade and keeps view-local
   state (e.g. the Lab workbench) alive across tab switches.

   Auth gate: the lab is members-only. Unauthenticated visitors see the
   Landing instead of the full shell; signing in causes `isAuthed` to
   flip true and the shell mounts. Logout reverses it — the landing
   re-mounts automatically because the gate keys on `isAuthed` alone.
   AuthModal lives at the root regardless so the landing's CTAs can
   pop it without rendering its own copy of the auth flow. */
export default function App() {
  const { activeTab, setActiveTab, modal, lightbox, bragCard, closeMolecule, closeLightbox, closeBragCard, openAuth } =
    useGame();
  const { isAdmin, isAuthed } = useAuth();

  // Escape unwinds the overlays from the top: brag card, lightbox, modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (bragCard) closeBragCard();
      else if (lightbox) closeLightbox();
      else if (modal) closeMolecule();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bragCard, lightbox, modal, closeBragCard, closeLightbox, closeMolecule]);

  // /admin deep-link guard: an authed non-admin landing on /admin would
  // otherwise see a blank <main> because no section's .active class
  // matches. Quietly demote to /lab; admins pass through untouched.
  useEffect(() => {
    if (isAuthed && !isAdmin && activeTab === "admin") {
      setActiveTab("lab");
    }
  }, [isAuthed, isAdmin, activeTab, setActiveTab]);

  const showLanding = !isAuthed;

  return (
    <>
      {showLanding ? (
        <Landing onSignIn={openAuth} />
      ) : (
        <>
          <TopBar />
          <main>
            <section className={"view" + (activeTab === "lab" ? " active" : "")}>
              <Lab />
            </section>

            <section className={"view" + (activeTab === "sandbox" ? " active" : "")}>
              <Sandbox />
            </section>

            <section className={"view" + (activeTab === "dex" ? " active" : "")}>
              <Dex />
            </section>

            <section className={"view" + (activeTab === "quests" ? " active" : "")}>
              <Quests />
            </section>

            {isAdmin && (
              <section className={"view" + (activeTab === "admin" ? " active" : "")}>
                <AdminPanel />
              </section>
            )}
          </main>

          <Mascot />
          <ChatModal />
          <Modal />
          <BragCard />
          <Lightbox />
          <ChoosePathModal />
          <AtomCinematic />
          <BreachCinematic />
          <CatchMoment />
        </>
      )}

      {/* AuthModal lives outside the landing/shell branch so the landing
          can pop it without owning a second copy of the auth flow. */}
      <AuthModal />
    </>
  );
}
