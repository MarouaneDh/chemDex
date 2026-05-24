import { useMemo } from "react";
import { MOLECULES } from "../../data/gamedata.js";
import { HAZARDS, hazardsOf } from "../../game/hazards.js";
import { useGame } from "../../context/GameContext.jsx";
import DexCard from "./DexCard.jsx";

/* The Dex — the molecule collection, filterable by category or hazard.
   Cards are sorted by tier so the difficulty curve reads top-to-bottom. */
export default function Dex() {
  const {
    t, L, term, resetProgress, forbiddenBreached,
    dexFilter: filter, setDexFilter: setFilter,
  } = useGame();

  // forbidden molecules don't appear in the Dex until the player has
  // breached the Leak — the wing is literally sealed behind a blast door
  const visible = useMemo(
    () => MOLECULES.filter((m) => forbiddenBreached || m.category !== "forbidden"),
    [forbiddenBreached]
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

  return (
    <>
      <div className="dex-controls">
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={"filter" + (cat === filter ? " active" : "")}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? t("filterAll") : term(cat)}
            </button>
          ))}
          <span className="filter-sep" aria-hidden="true">
            {t("filterSeparator")}
          </span>
          {HAZARDS.map((h) => {
            const key = "hazard:" + h.id;
            return (
              <button
                key={h.id}
                className={"filter filter-hazard" + (key === filter ? " active" : "")}
                onClick={() => setFilter(key)}
                title={L(h)}
              >
                {h.icon} {L(h)}
              </button>
            );
          })}
        </div>
        <button className="btn btn-danger" onClick={handleReset}>
          {t("resetProgress")}
        </button>
      </div>

      <div className="dex-grid">
        {list.map((m) => (
          <DexCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
}
