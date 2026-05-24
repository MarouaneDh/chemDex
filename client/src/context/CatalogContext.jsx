/* ============================================================
   CatalogContext — the live atoms + molecules catalog.

   The app boots synchronously with the bundled data (so the PWA
   stays offline-first and there is no loading state to design),
   then fetches `/api/catalog` once and replaces the catalog with
   the server's copy if it arrives. A network failure or a 404 is
   silently ignored — the bundled fallback simply stays in place.

   Molecules are "fat" in this context: the FR translation block
   (MOL_FR), pop-culture origin (MOL_ORIGIN), and hazard tags
   (MOL_HAZARDS) are merged into each molecule, matching the
   shape the API returns from MongoDB.
   ============================================================ */

import { createContext, useContext, useEffect, useState } from "react";
import {
  ATOMS as BUNDLED_ATOMS,
  MOLECULES as BUNDLED_MOLECULES,
  MOL_ORIGIN,
} from "../data/gamedata.js";
import { MOL_FR } from "../data/i18n.js";
import { MOL_HAZARDS } from "../game/hazards.js";
import { apiFetch } from "../api/client.js";

const CatalogContext = createContext(null);

// Fold the side-tables into each molecule so bundled docs look like API docs.
function enrichBundled(molecules) {
  return molecules.map((m) => ({
    ...m,
    fr: MOL_FR[m.id] || undefined,
    origin: MOL_ORIGIN[m.id] || undefined,
    hazards: MOL_HAZARDS[m.id] || [],
  }));
}

const INITIAL = {
  atoms: BUNDLED_ATOMS,
  molecules: enrichBundled(BUNDLED_MOLECULES),
  source: "bundled",
};

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState(INITIAL);

  // Fetch the catalog from the API; on success, replace the in-memory
  // copy. Used both on first mount and by the admin panel after every
  // successful save so the UI updates without a page reload.
  const refresh = async () => {
    try {
      const data = await apiFetch("/catalog");
      if (Array.isArray(data?.atoms) && Array.isArray(data?.molecules)) {
        setCatalog({ atoms: data.atoms, molecules: data.molecules, source: "api" });
        return true;
      }
    } catch {
      /* offline / server down — bundled fallback stays live */
    }
    return false;
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CatalogContext.Provider value={{ ...catalog, refresh }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const c = useContext(CatalogContext);
  if (!c) throw new Error("useCatalog must be used within <CatalogProvider>");
  return c;
}
