import { useMemo, useState } from "react";
import { HAZARDS, hazardsOf, hazardById } from "../../game/hazards.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useGame } from "../../context/GameContext.jsx";
import DexCard from "./DexCard.jsx";
import FilterSheet from "./FilterSheet.jsx";

/* The Dex — the molecule collection, filterable by category or hazard.
   Cards are sorted by tier so the difficulty curve reads top-to-bottom.

   Filter UI (brainstorm #18): one "Filter" pill that opens a bottom
   sheet. Active filter (non-"all") surfaces as a removable chip above
   the grid. The flat row of buttons it replaces couldn't scale past a
   handful of categories without wrapping into 2-3 lines on mobile.    */
export default function Dex() {
  const {
    t, L, term, resetProgress, forbiddenBreached,
    dexFilter: filter, setDexFilter: setFilter,
  } = useGame();
  const { molecules } = useCatalog();
  const [sheetOpen, setSheetOpen] = useState(false);

  // forbidden molecules don't appear in the Dex until the player has
  // breached the Leak — the wing is literally sealed behind a blast door
  const visible = useMemo(
    () => molecules.filter((m) => forbiddenBreached || m.category !== "forbidden"),
    [forbiddenBreached, molecules]
  );

  const categories = useMemo(
    () => ["all", ...new Set(visible.map((m) => m.category))],
    [visible]
  );

  const list = useMemo(() => {
    let base = visible;
    if (filter !== "all") {
      if (filter.startsWith("hazard:")) {
        const hz = filter.slice(7);
        base = base.filter((m) => hazardsOf(m).includes(hz));
      } else {
        base = base.filter((m) => m.category === filter);
      }
    }
    return base.slice().sort((a, b) => a.tier - b.tier || a.id.localeCompare(b.id));
  }, [filter, visible]);

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) resetProgress();
  };

  // Human-readable label for the current filter — shown both inside the
  // pill (compact) and on the removable chip above the grid.
  const currentLabel = useMemo(() => {
    if (filter === "all") return null;
    if (filter.startsWith("hazard:")) {
      const h = hazardById(filter.slice(7));
      return h ? `${h.icon} ${L(h)}` : null;
    }
    return term(filter);
  }, [filter, L, term]);

  return (
    <>
      <div className="dex-controls">
        <button
          type="button"
          className={"filter-pill" + (filter !== "all" ? " is-active" : "")}
          onClick={() => setSheetOpen(true)}
          aria-expanded={sheetOpen}
        >
          <svg
            className="filter-pill-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
          >
            <path
              d="M2 3h10M3.5 7h7M5.5 11h3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="filter-pill-label">{t("filter")}</span>
          {currentLabel && (
            <span className="filter-pill-current">{currentLabel}</span>
          )}
        </button>
        <button className="btn btn-danger btn-compact" onClick={handleReset}>
          {t("resetProgress")}
        </button>
      </div>

      {filter !== "all" && (
        <div className="dex-active-filters">
          <button
            type="button"
            className="dex-active-chip"
            onClick={() => setFilter("all")}
            title={t("clearFilter")}
          >
            <span>{currentLabel}</span>
            <span className="dex-active-chip-x" aria-hidden="true">✕</span>
          </button>
        </div>
      )}

      <div className="dex-grid">
        {list.map((m) => (
          <DexCard key={m.id} m={m} />
        ))}
      </div>

      <FilterSheet
        open={sheetOpen}
        current={filter}
        categories={categories}
        hazards={HAZARDS}
        onSelect={setFilter}
        onClose={() => setSheetOpen(false)}
        t={t}
        term={term}
        L={L}
      />
    </>
  );
}
