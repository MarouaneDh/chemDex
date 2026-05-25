/* ============================================================
   BrandLogo — inline SVG mark, replaces the ⚗️ emoji.

   Scales from 16px (favicon) to 200px+ (landing hero) without
   pixel rot. The mark renders as inline SVG so container CSS can
   tint, glow, or float it via filter/box-shadow when needed.

   Gradient IDs are scoped via useId() so multiple instances on
   the same page (TopBar + Landing hero + Footer) never collide.
   ============================================================ */

import { useId } from "react";

export default function BrandLogo({ size = 28, className = "", title = "Chemdex" }) {
  const uid = useId();
  const edgeId = `bl-edge-${uid}`;
  const atomId = `bl-atom-${uid}`;
  return (
    <svg
      className={"brand-logo " + className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={edgeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <radialGradient id={atomId} cx="0.32" cy="0.28" r="0.78">
          <stop offset="0%" stopColor="#aef5e6" />
          <stop offset="55%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0f8a7d" />
        </radialGradient>
      </defs>
      <polygon
        points="32,8 52.78,20 52.78,44 32,56 11.22,44 11.22,20"
        stroke={`url(#${edgeId})`}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="14"
        stroke={`url(#${edgeId})`}
        strokeWidth="2"
        opacity="0.55"
      />
      <circle cx="32" cy="11" r="5.5" fill={`url(#${atomId})`} />
      <circle cx="32" cy="32" r="2.6" fill="#818cf8" />
    </svg>
  );
}
