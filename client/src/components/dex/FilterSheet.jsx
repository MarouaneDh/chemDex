import { useEffect } from "react";
import { createPortal } from "react-dom";

/* Bottom-sheet filter picker for the Dex (brainstorm #18).
   Compresses the long flat filter strip into a single tap target;
   sections separate categories from hazards. Selecting an option
   commits the filter and closes the sheet immediately. Tapping the
   backdrop or the X also closes.                                     */
export default function FilterSheet({
  open,
  current,
  categories,
  hazards,
  onSelect,
  onClose,
  t,
  term,
  L,
}) {
  // lock body scroll while the sheet is up
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pick = (value) => {
    onSelect(value);
    onClose();
  };

  return createPortal(
    <div
      className="sheet-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet" role="dialog" aria-modal="true">
        <div className="sheet-handle" aria-hidden="true" />
        <header className="sheet-header">
          <h3>{t("filterTitle")}</h3>
          <button
            type="button"
            className="lb-close sheet-close"
            onClick={onClose}
            aria-label={t("close")}
          >
            ✕
          </button>
        </header>

        <div className="sheet-body">
          <section className="sheet-section">
            <h4 className="sheet-section-title">{t("filterCategories")}</h4>
            <div className="sheet-grid">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={"sheet-option" + (cat === current ? " active" : "")}
                  onClick={() => pick(cat)}
                >
                  {cat === "all" ? t("filterAll") : term(cat)}
                </button>
              ))}
            </div>
          </section>

          <section className="sheet-section">
            <h4 className="sheet-section-title">{t("filterHazards")}</h4>
            <div className="sheet-grid">
              {hazards.map((h) => {
                const key = "hazard:" + h.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    className={"sheet-option" + (key === current ? " active" : "")}
                    onClick={() => pick(key)}
                  >
                    <span className="sheet-option-icon" aria-hidden="true">
                      {h.icon}
                    </span>
                    {L(h)}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}
