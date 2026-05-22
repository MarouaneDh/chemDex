import { useGame } from "../context/GameContext.jsx";

/* Atomo — the friendly mascot. Tap to escalate the hint ladder.
   The bubble text and a re-render `nonce` come from context; keying
   the avatar on the nonce restarts its bounce on every new line. */
export default function Mascot() {
  const { mascot, showHint } = useGame();

  return (
    <div className="mascot" title="Hint" onClick={() => showHint()}>
      {mascot && <div className="mascot-bubble">{mascot.text}</div>}
      <div key={mascot?.nonce} className={"mascot-avatar" + (mascot ? " bounce" : "")}>
        ⚛️
      </div>
    </div>
  );
}
