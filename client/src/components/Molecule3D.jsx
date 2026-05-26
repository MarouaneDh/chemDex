import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext.jsx";
import { probeSdf } from "../game/sdfCache.js";

/* Interactive 3D molecule viewer (brainstorm #85 / #114).
   Pulls the PubChem 3D SDF via the shared probe cache (so the Modal's
   pre-flight check and this viewer share a single network call), then
   lazy-loads 3Dmol.js and renders the molecule in a WebGL canvas with
   drag-rotate + pinch-zoom. Spinning defaults to ON unless the user
   prefers reduced motion; a small play/pause control sits in the
   corner so battery-aware users can stop the loop.

   Failure modes:
   - No 3D record at PubChem  → onFallback() — the parent flips
     the viewer back to the 2D image without showing an error.
   - 3Dmol fails to load      → same fallback path.
   - WebGL unavailable        → 3Dmol throws on createViewer, caught
     in the same try/catch, same fallback.

   Isolation: lives at the modal leaf so its WebGL context never
   re-renders sibling UI. innerHTML is cleared on unmount so we
   don't leak GL contexts across modal opens.                     */

export default function Molecule3D({ cid, onFallback }) {
  const { t } = useGame();
  const hostRef = useRef(null);
  const viewerRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [status, setStatus] = useState("loading"); // loading | ready | failed
  const [spinning, setSpinning] = useState(!prefersReduced);

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      if (!cid) {
        setStatus("failed");
        onFallback?.();
        return;
      }

      try {
        // Shared cache — if the Modal pre-probed this CID the result is
        // already here; otherwise this fetch kicks off (and any future
        // caller deduplicates against the same promise).
        const sdf = await probeSdf(cid);
        if (cancelled) return;
        if (!sdf) throw new Error("no 3d record");

        const mod = await import("3dmol");
        const $3Dmol = mod.default || mod;
        if (cancelled || !hostRef.current) return;

        const viewer = $3Dmol.createViewer(hostRef.current, {
          backgroundColor: "rgba(0,0,0,0)",
          antialias: true,
        });
        viewerRef.current = viewer;

        viewer.addModel(sdf, "sdf");
        // Ball-and-stick: thin bonds + medium spheres — reads well at
        // modal scale (210px tall on desktop, 168px on mobile).
        viewer.setStyle(
          {},
          { stick: { radius: 0.16 }, sphere: { scale: 0.28 } }
        );
        viewer.zoomTo();
        viewer.render();
        if (!prefersReduced) viewer.spin("y", 1);

        setStatus("ready");
      } catch {
        if (cancelled) return;
        setStatus("failed");
        onFallback?.();
      }
    }

    mount();

    return () => {
      cancelled = true;
      const v = viewerRef.current;
      try {
        v?.spin?.(false);
        v?.removeAllModels?.();
      } catch {
        /* ignore — best-effort cleanup */
      }
      // 3Dmol injects its own canvas; clearing innerHTML drops the
      // WebGL context so reopening different molecules doesn't pile up.
      if (hostRef.current) hostRef.current.innerHTML = "";
      viewerRef.current = null;
    };
  }, [cid, onFallback, prefersReduced]);

  const toggleSpin = () => {
    const v = viewerRef.current;
    if (!v) return;
    if (spinning) v.spin(false);
    else v.spin("y", 1);
    setSpinning(!spinning);
  };

  return (
    <div className="mol3d">
      <div ref={hostRef} className="mol3d-host" />
      {status === "loading" && (
        <div className="mol3d-state">{t("mol3dLoading")}</div>
      )}
      {status === "ready" && (
        <button
          type="button"
          className="mol3d-spin"
          onClick={toggleSpin}
          aria-label={spinning ? t("mol3dPause") : t("mol3dPlay")}
          title={spinning ? t("mol3dPause") : t("mol3dPlay")}
        >
          {spinning ? "❚❚" : "▶"}
        </button>
      )}
    </div>
  );
}
