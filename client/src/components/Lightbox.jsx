import { useEffect, useReducer, useRef } from "react";
import { structureURL } from "../game/rules.js";
import { useGame } from "../context/GameContext.jsx";

/* Zoomable structure image. One pointer pans (when zoomed in), two
   pointers pinch-zoom; the wheel zooms. Transform state lives in a ref
   (imperative, like the original) with a forced re-render on change. */
export default function Lightbox() {
  const { lightbox, closeLightbox, molField, t } = useGame();

  const stageRef = useRef(null);
  const st = useRef({ zoom: 1, x: 0, y: 0 });
  const pointers = useRef(new Map());
  const drag = useRef({ active: false, sx: 0, sy: 0 });
  const pinch = useRef({ start: 0, zoom: 1 });
  const [, force] = useReducer((n) => n + 1, 0);

  // recenter whenever a new image opens
  useEffect(() => {
    if (lightbox) {
      st.current = { zoom: 1, x: 0, y: 0 };
      force();
    }
  }, [lightbox]);

  const setZoom = (z) => {
    const zoom = Math.min(6, Math.max(1, Math.round(z * 10) / 10));
    st.current.zoom = zoom;
    if (zoom === 1) {
      st.current.x = 0;
      st.current.y = 0;
    }
    force();
  };

  // wheel zoom — registered manually so preventDefault works (React's
  // onWheel is passive and cannot block the page scroll)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !lightbox) return;
    const onWheel = (e) => {
      e.preventDefault();
      setZoom(st.current.zoom + (e.deltaY < 0 ? 0.3 : -0.3));
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [lightbox]);

  if (!lightbox) return null;

  const { molecule: m, view } = lightbox;
  const { zoom, x, y } = st.current;

  const pointerDist = () => {
    const p = [...pointers.current.values()];
    return Math.hypot(p[0].clientX - p[1].clientX, p[0].clientY - p[1].clientY);
  };

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, e);
    if (pointers.current.size === 2) {
      drag.current.active = false;
      pinch.current.start = pointerDist();
      pinch.current.zoom = st.current.zoom;
    } else if (st.current.zoom > 1) {
      drag.current = {
        active: true,
        sx: e.clientX - st.current.x,
        sy: e.clientY - st.current.y,
      };
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, e);
    if (pointers.current.size >= 2) {
      if (pinch.current.start > 0) {
        setZoom(pinch.current.zoom * (pointerDist() / pinch.current.start));
      }
    } else if (drag.current.active) {
      st.current.x = e.clientX - drag.current.sx;
      st.current.y = e.clientY - drag.current.sy;
      force();
    }
  };

  const endPointer = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current.start = 0;
    if (pointers.current.size === 0) drag.current.active = false;
  };

  return (
    <div
      className="lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox();
      }}
    >
      <div className="lightbox-toolbar">
        <button onClick={() => setZoom(zoom - 0.5)} title="Zoom out">
          −
        </button>
        <button onClick={() => setZoom(1)} title="Reset">
          {t("lbReset")}
        </button>
        <button onClick={() => setZoom(zoom + 0.5)} title="Zoom in">
          +
        </button>
        <span className="lb-label">
          {molField(m, "commonName")} · {view.toUpperCase()}
        </span>
        <button className="lb-close" onClick={closeLightbox} title="Close">
          ✕
        </button>
      </div>

      <div
        className={"lightbox-stage" + (drag.current.active ? " panning" : "")}
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <img
          id="lbImg"
          alt="structure"
          draggable={false}
          src={structureURL(m.pubchemCid, view, view === "3d" ? null : "500x500")}
          style={{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }}
        />
      </div>

      <p className="lb-hint">{t("lbHint")}</p>
    </div>
  );
}
