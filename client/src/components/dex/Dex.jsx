import { useMemo, useState } from "react";
import { MOLECULES } from "../../data/gamedata.js";
import { useGame } from "../../context/GameContext.jsx";
import DexCard from "./DexCard.jsx";

/* The Dex — the molecule collection, filterable by category. Cards are
   sorted by tier so the difficulty curve reads top-to-bottom. */
export default function Dex() {
  const { t, term, resetProgress } = useGame();
  const [filter, setFilter] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(MOLECULES.map((m) => m.category))],
    []
  );

  const list = useMemo(() => {
    const base =
      filter === "all" ? MOLECULES : MOLECULES.filter((m) => m.category === filter);
    return base.slice().sort((a, b) => a.tier - b.tier || a.id.localeCompare(b.id));
  }, [filter]);

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
