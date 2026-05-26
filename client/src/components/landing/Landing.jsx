/* ============================================================
   Landing — the pre-auth marketing surface.

   Rendered in App.jsx instead of the full shell whenever the
   visitor is not signed in. The lab is members-only — every CTA
   on this surface opens the existing AuthModal, which handles
   both register and login via its internal mode toggle.

   Logout re-mounts this surface automatically because App.jsx
   keys the gate on `isAuthed` alone (no extra state to clear).

   Mobile-first dark theme. All styling lives in ./landing.css
   scoped under .landing so it cannot leak into the app shell.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import BrandLogo from "../BrandLogo.jsx";
import "./landing.css";

/* Small intersection-observer hook — adds .is-in once an element
   scrolls into view. Done once per element (no toggle on exit) so
   the reveal isn't re-fired when scrolling back up.            */
function useInView(options = { rootMargin: "-10% 0px", threshold: 0.15 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/* Reveal wrapper — single hook per use, no children-cloning gymnastics. */
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useInView();
  return (
    <Tag
      ref={ref}
      className={"lp-reveal " + className}
      data-delay={delay || undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* The atomic orbit — pure CSS animation, GPU-only. */
function AtomOrbit() {
  return (
    <div className="lp-orbit" aria-hidden="true">
      <div className="lp-orbit-ring lp-orbit-ring--3">
        <span className="lp-orbit-atom lp-atom-inert" />
      </div>
      <div className="lp-orbit-ring lp-orbit-ring--2">
        <span className="lp-orbit-atom lp-atom-locked" />
      </div>
      <div className="lp-orbit-ring lp-orbit-ring--1">
        <span className="lp-orbit-atom lp-atom-rare" />
      </div>
      <div className="lp-orbit-nucleus" />
    </div>
  );
}

export default function Landing({ onSignIn, onTryLab }) {
  // year computed once — avoids the "© 2024 forever" trap when the
  // app outlives the build it shipped in
  const [year] = useState(() => new Date().getFullYear());

  return (
    <div className="landing">
      {/* --- top strip --- */}
      <nav className="lp-nav">
        <div className="lp-brand">
          <BrandLogo size={32} />
          <div className="lp-brand-name">
            Chem<span>dex</span>
          </div>
        </div>
        <div className="lp-nav-actions">
          <button className="btn btn-compact btn-ghost" onClick={onSignIn}>
            Sign in
          </button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="lp-wrap lp-hero">
        <div className="lp-hero-copy">
          <Reveal as="span" className="lp-eyebrow">
            A pocket lab disguised as a Dex
          </Reveal>
          <Reveal as="h1" className="lp-headline" delay={1}>
            Mix atoms.<br />
            Catch molecules.<br />
            <span className="accent">Build your Dex.</span>
          </Reveal>
          <Reveal as="p" className="lp-subhead" delay={2}>
            Drag elements onto a workbench. Combine them into real chemistry.
            Each first-time find triggers a catch moment — vitamins, fuels,
            venoms, even the molecules a textbook won&apos;t name.
          </Reveal>
          <Reveal className="lp-cta-row" delay={3}>
            <button className="btn btn-hero btn-primary" onClick={onTryLab}>
              Try the lab — no signup
            </button>
            <button className="btn btn-hero btn-ghost" onClick={onSignIn}>
              Sign in
            </button>
          </Reveal>
          <Reveal as="div" className="lp-meta" delay={4}>
            <span>Installable PWA</span>
            <span>Plays offline</span>
            <span>EN · FR</span>
          </Reveal>
        </div>
        <Reveal className="lp-hero-visual" delay={2}>
          <AtomOrbit />
        </Reveal>
      </section>

      {/* --- HOW IT WORKS — zig-zag rows --- */}
      <section className="lp-wrap lp-section">
        <Reveal className="lp-section-head">
          <div className="lp-section-eyebrow">How it plays</div>
          <h2 className="lp-section-title">Three verbs. That&apos;s the whole game.</h2>
          <p className="lp-section-sub">
            No tutorials, no walls of text. Build, catch, share — the loop
            takes thirty seconds to learn and a few hundred molecules to outgrow.
          </p>
        </Reveal>

        <div className="lp-rows">
          <Reveal className="lp-row">
            <div className="lp-row-copy">
              <div className="lp-step">Step 01 · Build</div>
              <h3 className="lp-row-title">Drag atoms. Hit Combine.</h3>
              <p className="lp-row-body">
                The workbench takes hydrogen, oxygen, carbon — whatever
                you&apos;ve unlocked — and checks the formula against real
                molecules. Two H plus an O? That&apos;s water. And it&apos;s
                yours.
              </p>
            </div>
            <div className="lp-row-visual">
              <div className="lp-viz-build">
                <span className="atom h1">H</span>
                <span className="atom h2">H</span>
                <span className="bond b1" />
                <span className="bond b2" />
                <span className="atom o">O</span>
                <span className="label">Workbench · live</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lp-row lp-row--flip">
            <div className="lp-row-copy">
              <div className="lp-step">Step 02 · Catch</div>
              <h3 className="lp-row-title">First find triggers a cinematic.</h3>
              <p className="lp-row-body">
                Every discovery plays a tiny celebration scaled to its
                rarity — a soft pop for commons, a full-screen burst for
                the shinies. Rare ones shimmer in the Dex forever.
              </p>
            </div>
            <div className="lp-row-visual">
              <div className="lp-viz-catch">
                <span className="ring r1" />
                <span className="ring r2" />
                <span className="ring r3" />
                <span className="glyph">Au</span>
                <span className="label">Catch moment · rare</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lp-row">
            <div className="lp-row-copy">
              <div className="lp-step">Step 03 · Share</div>
              <h3 className="lp-row-title">Brag cards land in chat.</h3>
              <p className="lp-row-body">
                Pull any discovery into a holographic trading card, send it
                to a friend, get reactions back. They tap, the recipe opens
                in their lab — &ldquo;catch this too.&rdquo;
              </p>
            </div>
            <div className="lp-row-visual">
              <div className="lp-viz-share">
                <div className="tile t1">
                  <span className="nm">Caffeine</span>
                  <span className="fm">C₈H₁₀N₄O₂</span>
                </div>
                <div className="tile t2">
                  <span className="nm">Mercury Fulminate</span>
                  <span className="fm">Hg(CNO)₂</span>
                </div>
                <div className="tile t3">
                  <span className="nm">Vitamin D₃</span>
                  <span className="fm">C₂₇H₄₄O</span>
                </div>
                <span className="label">Friend chat · 3 cards</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- THREE WORLDS — bento --- */}
      <section className="lp-wrap lp-section">
        <Reveal className="lp-section-head">
          <div className="lp-section-eyebrow">Three rooms in one lab</div>
          <h2 className="lp-section-title">Same world. Different moods.</h2>
          <p className="lp-section-sub">
            The Lab is where you make things. The Dex is where you keep them.
            The Sandbox is where the rules bend.
          </p>
        </Reveal>

        <div className="lp-bento">
          <Reveal className="lp-bento-card is-lab">
            <div className="lp-bento-tag">Lab</div>
            <h3 className="lp-bento-title">Where you make things.</h3>
            <p className="lp-bento-body">
              Workbench, atom palette, combine button. A daily puzzle nudges
              you toward one specific find. A mascot whispers hints when you
              stall — only when you ask.
            </p>
            <div className="lp-bento-mockup">
              <span className="atom-pill" style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "rgba(45, 212, 191, 0.12)",
                border: "1px solid rgba(45, 212, 191, 0.3)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: "var(--role-live)",
              }}>H · O · C · N</span>
            </div>
          </Reveal>

          <Reveal className="lp-bento-card is-dex" delay={1}>
            <div className="lp-bento-tag">Dex</div>
            <h3 className="lp-bento-title">Where you keep them.</h3>
            <p className="lp-bento-body">
              A grid of everything you&apos;ve caught — and silhouettes of
              what&apos;s still out there. Filter by family, hazard, rarity,
              or just scroll the wing of forbidden things.
            </p>
          </Reveal>

          <Reveal className="lp-bento-card is-sandbox" delay={2}>
            <div className="lp-bento-tag">Sandbox</div>
            <h3 className="lp-bento-title">Where the rules bend.</h3>
            <p className="lp-bento-body">
              Invent a compound. Name it. If the atoms happen to spell a
              real molecule, it auto-promotes to a real discovery.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- CATEGORIES — scroll strip --- */}
      <section className="lp-section">
        <Reveal className="lp-wrap lp-section-head">
          <div className="lp-section-eyebrow">Wings of the Dex</div>
          <h2 className="lp-section-title">Not all molecules are made equal.</h2>
          <p className="lp-section-sub">
            Some wings stay sealed until you trip the right combination.
            Each one earns its own colour, its own rules, its own catch.
          </p>
        </Reveal>

        <Reveal className="lp-wrap">
          <div className="lp-cat-strip">
            <div className="lp-cat is-vitamins">
              <div className="lp-cat-tag">Live</div>
              <div className="lp-cat-title">Vitamins</div>
              <p className="lp-cat-body">
                Compounds your body actually needs. D₃ rewards real sunlight.
              </p>
            </div>
            <div className="lp-cat is-forbidden">
              <div className="lp-cat-tag">Forbidden</div>
              <div className="lp-cat-title">The Shelf</div>
              <p className="lp-cat-body">
                Sealed behind a blast door. Trip the leak to unlock it.
              </p>
            </div>
            <div className="lp-cat is-dangerous">
              <div className="lp-cat-tag">Dangerous</div>
              <div className="lp-cat-title">Hazardous</div>
              <p className="lp-cat-body">
                Real-world warnings: corrosive, explosive, neurotoxic.
              </p>
            </div>
            <div className="lp-cat is-myths">
              <div className="lp-cat-tag">Mythic</div>
              <div className="lp-cat-title">Myths</div>
              <p className="lp-cat-body">
                Stumble-upon legends — never spoiled by a hint. You find them or you don&apos;t.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- BRAG CARD SAMPLE --- */}
      <section className="lp-wrap lp-section">
        <Reveal className="lp-section-head">
          <div className="lp-section-eyebrow">Made for showing off</div>
          <h2 className="lp-section-title">Every find is a card worth sending.</h2>
          <p className="lp-section-sub">
            Brag cards carry the full context — molecule, rarity, formula,
            who found it. Tap one in chat and the recipe opens in your lab.
          </p>
        </Reveal>
        <Reveal>
          <div className="lp-brag" role="img" aria-label="Sample brag card">
            <div className="lp-brag-meta">
              <span>RARE FIND</span>
              <span className="lp-brag-rarity">★ EPIC</span>
            </div>
            <div className="lp-brag-mol">
              <div className="lp-brag-glyph">Hg</div>
              <div>
                <div className="lp-brag-name">Mercury Fulminate</div>
                <div className="lp-brag-formula">Hg(CNO)₂</div>
              </div>
            </div>
            <p className="lp-brag-line">
              &ldquo;Took me forty tries. The Shelf hates me.&rdquo;
            </p>
            <div className="lp-brag-sender">FROM MAYA · 2 MIN AGO</div>
          </div>
        </Reveal>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="lp-final">
        <Reveal className="lp-wrap">
          <h2 className="lp-final-title">Start with hydrogen and oxygen.</h2>
          <p className="lp-final-sub">
            Sign in to save every find, sync across devices, and send brag
            cards to friends. Thirty seconds to your first molecule.
          </p>
          <div className="lp-final-cta-row">
            <button className="btn btn-hero btn-primary" onClick={onTryLab}>
              Try the lab — no signup
            </button>
            <button className="btn btn-hero btn-ghost" onClick={onSignIn}>
              Sign in
            </button>
          </div>
        </Reveal>
      </section>

      {/* --- FOOTER --- */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <BrandLogo size={22} />
          Chem<span style={{
            background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}>dex</span>
        </div>
        <div className="lp-footer-meta lp-footer-pwa">
          Installable PWA · plays offline
        </div>
        <div className="lp-footer-meta">© {year} · Built for chemistry curiosity</div>
      </footer>
    </div>
  );
}
