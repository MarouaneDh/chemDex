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
import { useGame } from "./context/GameContext.jsx";

/* The app shell. Each tab's view is always mounted and toggled with the
   `active` class — this preserves the CSS fade and keeps view-local
   state (e.g. the Lab workbench) alive across tab switches. */
export default function App() {
  const { activeTab, modal, lightbox, bragCard, closeMolecule, closeLightbox, closeBragCard } =
    useGame();
  const { isAdmin } = useAuth();

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

  return (
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
      <AuthModal />
      <ChatModal />
      <Modal />
      <BragCard />
      <Lightbox />
      <ChoosePathModal />
      <AtomCinematic />
      <BreachCinematic />
      <CatchMoment />
    </>
  );
}
