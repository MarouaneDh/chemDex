/* ============================================================
   Internationalization helpers (en / fr).
   makeI18n(lang) returns the four lookups the UI needs, bound to
   the active language. GameContext re-memoizes it whenever lang
   changes, so components just read t / term / molField / L.
   ============================================================ */

import { I18N, TERMS_FR, ATOM_NAMES_FR, MOL_FR } from "../data/i18n.js";
import { ATOMS } from "../data/gamedata.js";

export function makeI18n(lang) {
  // UI string by key; some entries are functions taking interpolated args.
  const t = (key, ...args) => {
    const v = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
    return typeof v === "function" ? v(...args) : v;
  };

  // Translate a category / type / rarity term.
  const term = (key) => (lang === "fr" ? TERMS_FR[key] || key : key);

  // Pull a molecule field in the active language (falls back to English).
  const molField = (m, field) => {
    if (lang === "fr" && MOL_FR[m.id] && MOL_FR[m.id][field] != null) {
      return MOL_FR[m.id][field];
    }
    return m[field];
  };

  // Pick the active-language string from a { en, fr } object.
  const L = (o) => (o && o[lang]) || (o && o.en) || "";

  // Atom name in the active language (English names live in gamedata).
  const atomName = (sym) => {
    if (lang === "fr" && ATOM_NAMES_FR[sym]) return ATOM_NAMES_FR[sym];
    const a = ATOMS.find((x) => x.symbol === sym);
    return a ? a.name : sym;
  };

  return { t, term, molField, L, atomName };
}
