import { useGame } from "../../context/GameContext.jsx";

/* The Leak — a jagged fracture with curling red smoke that appears in
   the corner of the workbench panel after five discoveries.

   Pre-breach: a hairline branch in the panel — tapping breaches the
   Forbidden Shelf (brainstorm #12, discovery-by-rumor).

   Post-breach: a permanent shattered impact pattern with extra smoke
   wisps, acting as a hot link straight to the Dex's forbidden wing.

   The crack is rendered as inline SVG so it actually branches, varies
   in stroke width, and shows tiny shards at the impact point — far
   more believable than the old single-gradient div. */
export default function Leak() {
  const { forbiddenBreached, breachForbidden, goToForbiddenWing, t } = useGame();
  const breached = forbiddenBreached;

  return (
    <button
      type="button"
      className={"leak" + (breached ? " leak-wide" : "")}
      onClick={breached ? goToForbiddenWing : breachForbidden}
      title={t(breached ? "leakBreached" : "leakWhisper")}
      aria-label={t(breached ? "leakBreached" : "leakWhisper")}
    >
      {breached ? <FractureBreached /> : <FractureHairline />}
      <span className="leak-smoke leak-smoke-1" aria-hidden="true" />
      <span className="leak-smoke leak-smoke-2" aria-hidden="true" />
      <span className="leak-smoke leak-smoke-3" aria-hidden="true" />
      {breached && (
        <>
          <span className="leak-smoke leak-smoke-4" aria-hidden="true" />
          <span className="leak-smoke leak-smoke-5" aria-hidden="true" />
          <span className="leak-smoke leak-smoke-6" aria-hidden="true" />
        </>
      )}
    </button>
  );
}

/* Pre-breach — a single jagged trunk with two hairline offshoots and
   a small chip near the top. Stroke widths taper from ~1.4 down to
   ~0.5 so the fracture reads as deepest at the impact point and
   feathers off into the panel. The drop-shadow filter is what gives
   the angry-red glow you'd otherwise need a gradient for.            */
function FractureHairline() {
  return (
    <svg
      className="leak-svg"
      viewBox="0 0 70 70"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="#dc2626"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#leak-glow-sm)"
      >
        <path d="M34 6 L31 14 L36 21 L30 28 L34 36 L29 44 L33 50" strokeWidth="1.3" />
        <path d="M36 21 L42 23 L46 21" strokeWidth="0.7" opacity="0.75" />
        <path d="M30 28 L24 30 L20 33" strokeWidth="0.8" opacity="0.7" />
        <path d="M34 36 L39 38" strokeWidth="0.55" opacity="0.6" />
        <polygon points="33,5 35,2 37,5" fill="#dc2626" opacity="0.65" />
      </g>
      <defs>
        <filter id="leak-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

/* Post-breach — the panel has actually split. Main trunk is a thicker
   asymmetric zigzag; five branches fan out radially with their own
   sub-hairlines, and a small starburst of chips marks the impact at
   the top. Two stroked layers on the trunk (dark outer + bright
   inner) sell the depth — like looking through a real glass crack
   into the hot light behind. The whole group breathes at 1.8s to
   echo the original pulse without animating a filter (cheap).         */
function FractureBreached() {
  const trunkD =
    "M50 3 L46 11 L53 19 L44 27 L51 35 L43 44 L49 53 L42 62 L48 70 L43 80";
  return (
    <svg
      className="leak-svg leak-svg-wide"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#leak-glow-lg)"
        className="leak-svg-pulse"
      >
        <path d={trunkD} stroke="#dc2626" strokeWidth="2.4" />
        <path d={trunkD} stroke="#fb7185" strokeWidth="0.7" opacity="0.85" />
        <path d="M53 19 L62 22 L72 18" stroke="#dc2626" strokeWidth="1.5" />
        <path d="M44 27 L34 25 L24 30" stroke="#dc2626" strokeWidth="1.6" />
        <path d="M51 35 L60 39 L68 36" stroke="#dc2626" strokeWidth="1.2" />
        <path d="M43 44 L33 48 L24 50" stroke="#dc2626" strokeWidth="1.4" />
        <path d="M48 70 L58 73 L64 79" stroke="#dc2626" strokeWidth="1.0" />
        <path d="M62 22 L66 30" stroke="#dc2626" strokeWidth="0.6" opacity="0.7" />
        <path d="M34 25 L28 21" stroke="#dc2626" strokeWidth="0.6" opacity="0.7" />
        <path d="M60 39 L64 44" stroke="#dc2626" strokeWidth="0.55" opacity="0.6" />
        <path d="M33 48 L29 54" stroke="#dc2626" strokeWidth="0.55" opacity="0.6" />
        <path d="M58 73 L63 71" stroke="#dc2626" strokeWidth="0.5" opacity="0.55" />
        <polygon points="48,2 50,0 52,2" fill="#dc2626" opacity="0.85" />
        <polygon points="46,4 48,7 44,7" fill="#dc2626" opacity="0.55" />
        <polygon points="52,3 56,4 54,8" fill="#dc2626" opacity="0.6" />
        <polygon points="50,1 53,5 49,6" fill="#fb7185" opacity="0.7" />
      </g>
      <defs>
        <filter id="leak-glow-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
