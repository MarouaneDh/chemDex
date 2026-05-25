import { useRef, useState } from "react";
import { useGame } from "../context/GameContext.jsx";

/* Atomo — the friendly mascot. Tap to escalate the hint ladder;
   drag to relocate to a different corner.

   Anchor model (brainstorm #16): the user owns Atomo's position.
   Four valid corners — top-left, top-right, bottom-left, bottom-right —
   persisted as `mascotAnchor` in GameContext. The drag handler tracks
   pointer movement: anything under 8px is a tap (showHint), anything
   over is a drag that snaps to the nearest corner on pointer-up.

   The avatar keys on `mascot?.nonce` so its bounce restarts every
   time a new hint line arrives.                                  */

const DRAG_THRESHOLD = 8;  // px movement before a press becomes a drag

export default function Mascot() {
  const { mascot, showHint, mascotAnchor, setMascotAnchor } = useGame();

  const rootRef = useRef(null);
  const pressRef = useRef(null);              // { startX, startY, offsetX, offsetY, moved, id }
  const [dragPos, setDragPos] = useState(null); // { left, top } while actively dragging

  const onPointerDown = (e) => {
    // ignore secondary clicks
    if (e.button !== undefined && e.button !== 0) return;
    const rect = rootRef.current.getBoundingClientRect();
    pressRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      moved: false,
      id: e.pointerId,
    };
    try {
      rootRef.current.setPointerCapture(e.pointerId);
    } catch {
      /* not all environments support pointer capture — drag still works */
    }
  };

  const onPointerMove = (e) => {
    const p = pressRef.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    if (!p.moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
    p.moved = true;
    setDragPos({
      left: e.clientX - p.offsetX,
      top: e.clientY - p.offsetY,
    });
  };

  const finishPress = (e) => {
    const p = pressRef.current;
    if (!p || p.id !== e.pointerId) return;
    try {
      rootRef.current.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (p.moved) {
      // snap to nearest corner based on the pointer's final viewport quadrant
      const cx = e.clientX;
      const cy = e.clientY;
      const isTop = cy < window.innerHeight / 2;
      const isLeft = cx < window.innerWidth / 2;
      const corner =
        (isTop ? "top" : "bottom") + "-" + (isLeft ? "left" : "right");
      setMascotAnchor(corner);
    } else {
      // a tap, not a drag — escalate the hint ladder
      showHint();
    }
    pressRef.current = null;
    setDragPos(null);
  };

  const validAnchor =
    ["top-left", "top-right", "bottom-left", "bottom-right"].includes(mascotAnchor)
      ? mascotAnchor
      : "bottom-left";

  // While dragging, lift the element out of its corner-anchored slot and
  // position it at the pointer. CSS handles the rest of the visual states.
  const style = dragPos
    ? {
        left: `${dragPos.left}px`,
        top: `${dragPos.top}px`,
        right: "auto",
        bottom: "auto",
        transition: "none",
      }
    : undefined;

  const cls =
    "mascot mascot--" + validAnchor + (dragPos ? " mascot--dragging" : "");

  return (
    <div
      ref={rootRef}
      className={cls}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishPress}
      onPointerCancel={finishPress}
      title="Hint · drag to move"
    >
      {mascot && <div className="mascot-bubble">{mascot.text}</div>}
      <div key={mascot?.nonce} className={"mascot-avatar" + (mascot ? " bounce" : "")}>
        ⚛️
      </div>
    </div>
  );
}
