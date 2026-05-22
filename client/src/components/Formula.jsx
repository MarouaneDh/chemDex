/* Renders a formula string with numeric subscripts: "H2O" -> H₂O. */
export default function Formula({ text }) {
  const parts = String(text ?? "")
    .split(/(\d+)/)
    .filter((p) => p !== "");
  return (
    <>
      {parts.map((p, i) =>
        /^\d+$/.test(p) ? <sub key={i}>{p}</sub> : <span key={i}>{p}</span>
      )}
    </>
  );
}
