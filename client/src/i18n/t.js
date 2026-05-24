/* ============================================================
   Internationalization helpers (en / fr).
   makeI18n(lang, atoms) returns the four lookups the UI needs,
   bound to the active language and the live atoms catalog (so a
   molecule fetched from MongoDB resolves its element names from
   the same source as the rest of the UI).
   ============================================================ */

import { I18N, TERMS_FR, ATOM_NAMES_FR } from "../data/i18n.js";

export function makeI18n(lang, atoms) {
  // UI string by key; some entries are functions taking interpolated args.
  const t = (key, ...args) => {
    const v = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
    return typeof v === "function" ? v(...args) : v;
  };

  // Translate a category / type / rarity term.
  const term = (key) => (lang === "fr" ? TERMS_FR[key] || key : key);

  // Pull a molecule field in the active language. The translation
  // block now travels INSIDE each molecule document (m.fr), set by
  // the catalog provider (bundled enrichment or API response).
  const molField = (m, field) => {
    if (lang === "fr" && m?.fr && m.fr[field] != null) {
      return m.fr[field];
    }
    return m?.[field];
  };

  // Pick the active-language string from a { en, fr } object.
  const L = (o) => (o && o[lang]) || (o && o.en) || "";

  // Atom name in the active language (English names live in the
  // catalog; French overrides come from the bundled ATOM_NAMES_FR map).
  const atomName = (sym) => {
    if (lang === "fr" && ATOM_NAMES_FR[sym]) return ATOM_NAMES_FR[sym];
    const a = (atoms || []).find((x) => x.symbol === sym);
    return a ? a.name : sym;
  };

  return { t, term, molField, L, atomName };
}
