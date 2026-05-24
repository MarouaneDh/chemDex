import { useGame } from "../../context/GameContext.jsx";

/* The Leak — a hairline crack with curling red smoke that appears in
   the corner of the workbench panel after five discoveries.

   Pre-breach: a discreet whisper of a crack — tapping breaches the
   Forbidden Shelf (brainstorm #12, discovery-by-rumor).

   Post-breach: a permanent, much wider gash with extra smoke wisps,
   acting as a hot link straight to the Dex's forbidden wing. */
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
      <span className="leak-crack" aria-hidden="true" />
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
