/* ============================================================
   Chemdex app — static, frontend-only
   - Lab: build a molecule from atoms, then Combine to validate.
   - Validation: count atoms, compare to each molecule's atom map.
   - Dex: collection grid; discoveries persist in localStorage.
   ============================================================ */

"use strict";

const STORAGE_KEY = "chemdex.discoveries";

/* ---------- Persistence ---------- */
// discoveries = { [moleculeId]: { date: ISOString, shiny: boolean } }
function loadDiscoveries() {
  let raw;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
  // migrate the old format (id -> ISO string) to (id -> {date, shiny})
  for (const id in raw) {
    if (typeof raw[id] === "string") raw[id] = { date: raw[id], shiny: false };
  }
  return raw;
}
function saveDiscoveries(d) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

let discoveries = loadDiscoveries();

/* ---------- State ---------- */
let workbench = [];           // array of atom symbols, e.g. ["H","H","O"]
let dexFilter = "all";

/* ---------- Helpers ---------- */
const atomBySymbol = sym => ATOMS.find(a => a.symbol === sym);

// Count symbols in an array -> { H: 2, O: 1 }
function countAtoms(symbols) {
  return symbols.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
}

// True if two atom-count maps are exactly equal.
function countsEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if ((a[k] || 0) !== (b[k] || 0)) return false;
  }
  return true;
}

// Build a Hill-notation formula string from a count map (for display).
function hillFormula(counts) {
  const keys = Object.keys(counts);
  if (keys.length === 0) return "—";
  const ordered = [];
  if (counts.C) ordered.push("C");
  if (counts.H) ordered.push("H");
  keys.filter(k => k !== "C" && k !== "H").sort().forEach(k => ordered.push(k));
  // if there is no carbon, Hill notation is purely alphabetical
  if (!counts.C) ordered.sort();
  return ordered.map(k => k + (counts[k] > 1 ? counts[k] : "")).join("");
}

function fmtFormula(str) {
  // turn "H2O" into "H<sub>2</sub>O"
  return str.replace(/(\d+)/g, "<sub>$1</sub>");
}

/* ---------- PubChem structure images ----------
   2D large:   .../cid/{cid}/PNG?image_size=large   (300x300)
   2D custom:  .../cid/{cid}/PNG?image_size=500x500
   3D render:  .../cid/{cid}/PNG?record_type=3d
*/
const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/";

function structureURL(cid, view, size) {
  const base = PUBCHEM + cid + "/PNG";
  if (view === "3d") {
    return base + "?record_type=3d" + (size ? "&image_size=" + size : "");
  }
  return base + "?image_size=" + (size || "large");
}

/* ---------- Internationalization (en / fr) ---------- */
const LANG_KEY = "chemdex.lang";
let lang = localStorage.getItem(LANG_KEY) || "en";

// UI string by key; some entries are functions taking interpolated args.
function t(key, ...args) {
  const v = (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;
  return typeof v === "function" ? v(...args) : v;
}

// Translate a category / type / rarity term.
function term(key) {
  return lang === "fr" ? (TERMS_FR[key] || key) : key;
}

// Pull a molecule field in the active language (falls back to English).
function molField(m, field) {
  if (lang === "fr" && MOL_FR[m.id] && MOL_FR[m.id][field] != null) {
    return MOL_FR[m.id][field];
  }
  return m[field];
}

/* ============================================================
   LAB
   ============================================================ */

const paletteEl   = document.getElementById("palette");
const workbenchEl = document.getElementById("workbench");
const liveFormula = document.getElementById("liveFormula");
const labMessage  = document.getElementById("labMessage");

// Render the atom palette. Locked atoms (the Atom Tech Tree) stay visible
// but greyed with a 🔒 — the tease is the point — and can't be dragged.
function renderPalette() {
  paletteEl.innerHTML = "";
  ATOMS.forEach(atom => {
    const el = document.createElement("div");
    const locked = !isAtomUnlocked(atom.symbol);
    const name = atomDisplayName(atom.symbol);

    if (locked) {
      el.className = "atom locked";
      el.innerHTML = `
        <span class="atom-lock">🔒</span>
        <span class="sym">${atom.symbol}</span>
        <span class="nm">${name}</span>`;
      el.title = t("atomLockedTease", name);
      el.addEventListener("click", () => {
        SFX.fail();
        mascotSay(t("atomLockedHint"), 5000);
      });
    } else {
      el.className = "atom";
      el.style.background = atom.color;
      el.style.color = atom.text;
      el.draggable = true;
      el.innerHTML = `
        <span class="num">${atom.number}</span>
        <span class="sym">${atom.symbol}</span>
        <span class="nm">${name}</span>`;
      el.addEventListener("click", () => addAtom(atom.symbol));
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", atom.symbol);
      });
    }
    paletteEl.appendChild(el);
  });
}

function addAtom(symbol) {
  if (!isAtomUnlocked(symbol)) return;   // locked atoms can't reach the bench
  workbench.push(symbol);
  SFX.pop();
  renderWorkbench();
}

function removeAtom(index) {
  workbench.splice(index, 1);
  SFX.place();
  renderWorkbench();
}

function renderWorkbench() {
  workbenchEl.innerHTML = "";
  if (workbench.length === 0) {
    workbenchEl.innerHTML =
      `<p class="workbench-empty">${t("workbenchEmpty")}</p>`;
  } else {
    workbench.forEach((sym, i) => {
      const atom = atomBySymbol(sym);
      const el = document.createElement("div");
      el.className = "bench-atom";
      el.style.background = atom.color;
      el.style.color = atom.text;
      el.textContent = sym;
      el.title = t("removeAtom");
      el.addEventListener("click", () => removeAtom(i));
      workbenchEl.appendChild(el);
    });
  }
  liveFormula.innerHTML = fmtFormula(hillFormula(countAtoms(workbench)));
  labMessage.textContent = "";
  labMessage.className = "lab-message";
}

// Drag-and-drop onto the workbench
workbenchEl.addEventListener("dragover", e => {
  e.preventDefault();
  workbenchEl.classList.add("drag-over");
});
workbenchEl.addEventListener("dragleave", () => {
  workbenchEl.classList.remove("drag-over");
});
workbenchEl.addEventListener("drop", e => {
  e.preventDefault();
  workbenchEl.classList.remove("drag-over");
  const sym = e.dataTransfer.getData("text/plain");
  if (sym) addAtom(sym);
});

// Combine button — the validation engine
function combine() {
  if (workbench.length === 0) {
    setMessage(t("addAtomsFirst"), "info");
    return;
  }
  const counts = countAtoms(workbench);
  const match = MOLECULES.find(m => countsEqual(m.atoms, counts));

  if (!match) {
    setMessage(t("noMatch", hillFormula(counts)), "bad");
    SFX.fail();
    mascotSay(mascotLine("fail"), 4000);
    return;
  }

  if (!discoveries[match.id]) {
    gameDiscover(match);            // game.js: shiny roll, XP, fx, modal
  } else {
    setMessage(t("alreadyKnown", molField(match, "commonName")), "ok");
    SFX.click();
    openMoleculeModal(match, false);
  }
  checkDailyPuzzleSolved(match);    // no-op unless this matches today's prompt
  workbench = [];
  renderWorkbench();
}

function setMessage(text, kind) {
  labMessage.textContent = text;
  labMessage.className = "lab-message " + kind;
}

document.getElementById("combineBtn").addEventListener("click", combine);
document.getElementById("clearBtn").addEventListener("click", () => {
  workbench = [];
  SFX.click();
  renderWorkbench();
});

/* ============================================================
   DEX
   ============================================================ */

const dexGrid  = document.getElementById("dexGrid");
const filtersEl = document.getElementById("filters");

function discoveredCount() {
  return MOLECULES.filter(m => discoveries[m.id]).length;
}

function updateProgress() {
  const n = discoveredCount();
  const total = MOLECULES.length;
  document.getElementById("progressLabel").textContent = `${n} / ${total}`;
  document.getElementById("progressFill").style.width =
    (n / total) * 100 + "%";
}

// Build filter chips from the categories present in the data
function renderFilters() {
  const cats = ["all", ...new Set(MOLECULES.map(m => m.category))];
  filtersEl.innerHTML = "";
  cats.forEach(cat => {
    const el = document.createElement("button");
    el.className = "filter" + (cat === dexFilter ? " active" : "");
    el.textContent = cat === "all" ? t("filterAll") : term(cat);
    el.addEventListener("click", () => {
      dexFilter = cat;
      renderFilters();
      renderDex();
    });
    filtersEl.appendChild(el);
  });
}

function renderDex() {
  dexGrid.innerHTML = "";
  const list =
    dexFilter === "all"
      ? MOLECULES
      : MOLECULES.filter(m => m.category === dexFilter);

  // sort by tier so the difficulty curve reads top-to-bottom
  list.slice().sort((a, b) => a.tier - b.tier || a.id.localeCompare(b.id))
    .forEach(m => {
      const found = !!discoveries[m.id];
      const shiny = found && isShiny(m.id);
      const card = document.createElement("div");
      card.className = "dex-card " +
        (found ? "discovered r-" + m.rarity + (shiny ? " shiny" : "") : "locked");

      const idTag = `<span class="id">${m.id.replace("mol_", "#")}</span>`;

      if (found) {
        card.innerHTML = `
          ${idTag}
          ${shiny ? '<span class="shiny-star">✨</span>' : ""}
          <div class="img-wrap">
            <img src="${structureURL(m.pubchemCid, "2d")}" alt="${molField(m, "commonName")}"
                 onerror="this.replaceWith(document.createTextNode('🧬'))" />
          </div>
          <div class="name">${molField(m, "commonName")}</div>
          <div class="formula">${fmtFormula(m.formula)}</div>
          <div class="badges">
            <span class="badge rarity-${m.rarity}">${term(m.rarity)}</span>
            <span class="badge badge-type">${term(m.type)}</span>
          </div>`;
        card.addEventListener("click", () => openMoleculeModal(m, false));
      } else if (!tierUnlocked(m.tier)) {
        // tier not yet unlocked
        card.classList.add("tier-locked");
        card.innerHTML = `
          ${idTag}
          <div class="img-wrap">🔒</div>
          <div class="name">${t("locked")}</div>
          <div class="clue">${t("tierLocked", TIER_UNLOCK[m.tier])}</div>`;
      } else if (!moleculeBuildable(m)) {
        // needs an atom still locked in the tech tree — tease what's missing
        card.classList.add("atom-locked");
        const missing = Object.keys(m.atoms)
          .filter(s => !isAtomUnlocked(s))
          .map(atomDisplayName)
          .join(" + ");
        card.innerHTML = `
          ${idTag}
          <div class="img-wrap">🔒</div>
          <div class="name">${t("locked")}</div>
          <div class="clue">${t("requiresAtoms", missing)}</div>`;
        card.title = t("atomLockedHint");
      } else {
        // discoverable — show a riddle clue instead of the answer
        card.innerHTML = `
          ${idTag}
          <div class="img-wrap">?</div>
          <div class="name">${t("locked")}</div>
          <div class="clue">${t("clueLabel")} ${clueFor(m)}</div>`;
        card.title = t("lockedTitle");
      }
      dexGrid.appendChild(card);
    });
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm(t("resetConfirm"))) {
    discoveries = {};
    saveDiscoveries(discoveries);
    gameReset();        // also wipe XP / badges / missions
    updateProgress();
    renderDex();
  }
});

/* ============================================================
   MODAL
   ============================================================ */

const modalOverlay = document.getElementById("modal");
const modalCard    = document.getElementById("modalCard");

// Build the "Related discoveries" row that lives at the bottom of the
// detail modal. Discovered neighbors render as clickable thumbnails;
// undiscovered ones in unlocked tiers show their riddle clue to entice
// the player; tier-locked ones show 🔒. Returns "" when there's nothing
// to show, so we don't render an empty heading.
function renderRelatedSection(m) {
  const ids = (typeof RELATED !== "undefined" && RELATED[m.id]) || [];
  if (ids.length === 0) return "";
  const neighbors = ids
    .map(id => MOLECULES.find(x => x.id === id))
    .filter(Boolean);
  if (neighbors.length === 0) return "";

  const chips = neighbors.map(r => {
    const found = !!discoveries[r.id];
    if (found) {
      return `
        <button class="related-chip found" data-id="${r.id}" type="button">
          <span class="rc-img"><img src="${structureURL(r.pubchemCid, "2d")}" alt=""
              onerror="this.replaceWith(document.createTextNode('🧬'))" /></span>
          <span class="rc-text">
            <span class="rc-name">${molField(r, "commonName")}</span>
            <span class="rc-formula">${fmtFormula(r.formula)}</span>
          </span>
        </button>`;
    }
    if (!tierUnlocked(r.tier)) {
      return `
      <div class="related-chip tier-locked">
        <span class="rc-img">🔒</span>
        <span class="rc-text">
          <span class="rc-name">${t("locked")}</span>
          <span class="rc-clue">${t("tierLocked", TIER_UNLOCK[r.tier])}</span>
        </span>
      </div>`;
    }
    if (!moleculeBuildable(r)) {
      // needs an atom still locked in the tech tree
      const missing = Object.keys(r.atoms)
        .filter(s => !isAtomUnlocked(s))
        .map(atomDisplayName)
        .join(" + ");
      return `
      <div class="related-chip tier-locked">
        <span class="rc-img">🔒</span>
        <span class="rc-text">
          <span class="rc-name">${t("locked")}</span>
          <span class="rc-clue">${t("requiresAtoms", missing)}</span>
        </span>
      </div>`;
    }
    return `
        <button class="related-chip locked" data-id="${r.id}" type="button" title="${t("lockedTitle")}">
          <span class="rc-img rc-q">?</span>
          <span class="rc-text">
            <span class="rc-name">${t("locked")}</span>
            <span class="rc-clue">${clueFor(r)}</span>
          </span>
        </button>`;
  }).join("");

  return `
    <div class="section-title">${t("relatedTitle")}</div>
    <div class="related-grid">${chips}</div>`;
}

function openMoleculeModal(m, isNew) {
  const rec = discoveries[m.id];
  const date = rec ? new Date(rec.date).toLocaleString() : null;
  const shiny = !!(rec && rec.shiny);
  const tag = shiny ? t("shinyDiscovery") : (isNew ? t("newDiscovery") : "");

  modalCard.className = "modal" + (shiny ? " shiny" : "") + (isNew ? " reveal" : "");

  const name = molField(m, "commonName");
  modalCard.innerHTML = `
    ${tag ? `<span class="discovery-tag">${tag}</span>` : ""}
    <h2>${name}</h2>
    <div class="sub">${molField(m, "iupacName")} &nbsp;·&nbsp; ${fmtFormula(m.formula)}</div>
    <div class="struct" id="structBox" title="${t("clickZoom")}">
      <img id="structImg" src="${structureURL(m.pubchemCid, "2d")}" alt="${name}" />
    </div>
    <div class="struct-tools">
      <button class="seg active" data-view="2d">2D</button>
      <button class="seg" data-view="3d">3D</button>
      <span class="zoom-hint">${t("zoomHint")}</span>
    </div>
    <p class="desc">${molField(m, "description")}</p>

    <div class="badges">
      <span class="badge rarity-${m.rarity}">${term(m.rarity)}</span>
      <span class="badge badge-type">${term(m.type)}</span>
      <span class="badge badge-type">${term(m.category)}</span>
      <span class="badge badge-type">${t("tier")} ${m.tier}</span>
    </div>

    <div class="section-title">${t("uses")}</div>
    <ul>${molField(m, "uses").map(u => `<li>${u}</li>`).join("")}</ul>

    <div class="stats">
      <span>${t("molarMass")} <strong>${m.molarMass} g/mol</strong></span>
      <span>${t("pubchemCid")} <strong>${m.pubchemCid}</strong></span>
      <span style="grid-column:1/-1">${t("inchiKey")} <strong>${m.inchiKey}</strong></span>
    </div>

    <div class="funfact">💡 ${molField(m, "funFact")}</div>

    ${renderRelatedSection(m)}

    ${date ? `<div class="discovered-on">${t("discoveredOn")} ${date}</div>` : ""}

    <button class="btn modal-close">${t("close")}</button>
  `;
  modalCard.querySelector(".modal-close")
    .addEventListener("click", closeModal);
  modalCard.querySelectorAll(".related-chip.found").forEach(chip => {
    chip.addEventListener("click", () => {
      const target = MOLECULES.find(x => x.id === chip.dataset.id);
      if (target) openMoleculeModal(target, false);
    });
  });
  modalCard.querySelectorAll(".related-chip.locked").forEach(chip => {
    chip.addEventListener("click", () => {
      // Close so the player can hop to the Lab and try to build it.
      closeModal();
      document.querySelector('.tab[data-tab="lab"]').click();
    });
  });
  setupStructureViewer(m);
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
  // a discovery may have earned an element pick — offer it now the modal's gone
  if (typeof afterMoleculeModalClose === "function") afterMoleculeModalClose();
}
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});

// Wires the 2D/3D toggle and click-to-zoom for the modal's structure image.
function setupStructureViewer(m) {
  const box = document.getElementById("structBox");
  const img = document.getElementById("structImg");
  let view = "2d";

  box.dataset.fallback = t("imgUnavailable");

  // keep the <img> element alive on failure so toggling still works
  img.addEventListener("error", () => box.classList.add("img-error"));
  img.addEventListener("load",  () => box.classList.remove("img-error"));

  modalCard.querySelectorAll(".seg").forEach(btn => {
    btn.addEventListener("click", () => {
      view = btn.dataset.view;
      modalCard.querySelectorAll(".seg").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      box.classList.remove("img-error");
      img.src = structureURL(m.pubchemCid, view);
    });
  });

  box.addEventListener("click", () => {
    if (!box.classList.contains("img-error")) openLightbox(m, view);
  });
}

/* ============================================================
   LIGHTBOX — zoomable structure image
   ============================================================ */

const lightbox = document.getElementById("lightbox");
const lbImg    = document.getElementById("lbImg");
const lbStage  = document.getElementById("lbStage");
const lbLabel  = document.getElementById("lbLabel");

let lbZoom = 1, lbX = 0, lbY = 0;

function lbApply() {
  lbImg.style.transform = `translate(${lbX}px, ${lbY}px) scale(${lbZoom})`;
}

function lbSetZoom(z) {
  lbZoom = Math.min(6, Math.max(1, Math.round(z * 10) / 10));
  if (lbZoom === 1) { lbX = 0; lbY = 0; }   // recenter at 100%
  lbApply();
}

function openLightbox(m, view) {
  lbZoom = 1; lbX = 0; lbY = 0;
  // 2D supports a custom render size for crisper zooming; the 3D
  // endpoint does NOT — appending image_size to a record_type=3d
  // request makes the image fail to load, so leave 3D unsized.
  const size = view === "3d" ? null : "500x500";
  lbImg.src = structureURL(m.pubchemCid, view, size);
  lbLabel.textContent = `${molField(m, "commonName")} · ${view.toUpperCase()}`;
  lbApply();
  lightbox.hidden = false;
}
function closeLightbox() { lightbox.hidden = true; }

document.getElementById("lbIn")   .addEventListener("click", () => lbSetZoom(lbZoom + 0.5));
document.getElementById("lbOut")  .addEventListener("click", () => lbSetZoom(lbZoom - 0.5));
document.getElementById("lbReset").addEventListener("click", () => lbSetZoom(1));
document.getElementById("lbClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// scroll wheel to zoom
lbStage.addEventListener("wheel", e => {
  e.preventDefault();
  lbSetZoom(lbZoom + (e.deltaY < 0 ? 0.3 : -0.3));
}, { passive: false });

// pointer handling: 1 pointer pans (when zoomed in), 2 pointers pinch-zoom.
// Works for both mouse and touch.
const lbPointers = new Map();
let lbDragging = false, lbStartX = 0, lbStartY = 0;
let lbPinchStart = 0, lbPinchZoom = 1;

function lbPointerDist() {
  const p = [...lbPointers.values()];
  return Math.hypot(p[0].clientX - p[1].clientX, p[0].clientY - p[1].clientY);
}

lbStage.addEventListener("pointerdown", e => {
  lbPointers.set(e.pointerId, e);
  if (lbPointers.size === 2) {
    lbDragging = false;
    lbStage.classList.remove("panning");
    lbPinchStart = lbPointerDist();
    lbPinchZoom = lbZoom;
  } else if (lbZoom > 1) {
    lbDragging = true;
    lbStartX = e.clientX - lbX;
    lbStartY = e.clientY - lbY;
    lbStage.classList.add("panning");
  }
});
lbStage.addEventListener("pointermove", e => {
  if (!lbPointers.has(e.pointerId)) return;
  lbPointers.set(e.pointerId, e);
  if (lbPointers.size >= 2) {
    if (lbPinchStart > 0) lbSetZoom(lbPinchZoom * (lbPointerDist() / lbPinchStart));
  } else if (lbDragging) {
    lbX = e.clientX - lbStartX;
    lbY = e.clientY - lbStartY;
    lbApply();
  }
});
function lbEndPointer(e) {
  lbPointers.delete(e.pointerId);
  if (lbPointers.size < 2) lbPinchStart = 0;
  if (lbPointers.size === 0) {
    lbDragging = false;
    lbStage.classList.remove("panning");
  }
}
lbStage.addEventListener("pointerup", lbEndPointer);
lbStage.addEventListener("pointercancel", lbEndPointer);

// Escape closes the lightbox first, then the modal
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (!lightbox.hidden) closeLightbox();
  else closeModal();
});

/* ============================================================
   TABS
   ============================================================ */

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* ============================================================
   LANGUAGE
   ============================================================ */

function applyLanguage() {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  // translate static elements tagged with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  // highlight the active language button
  document.querySelectorAll(".lang").forEach(b =>
    b.classList.toggle("active", b.dataset.lang === lang));

  // re-render everything that contains translated content
  renderPalette();
  renderWorkbench();
  renderFilters();
  renderDex();
  updateProgress();
  renderQuests();
  updateTopbarLevel();
  updateMuteButton();
  renderDailyPuzzle();
}

document.querySelectorAll(".lang").forEach(btn => {
  btn.addEventListener("click", () => {
    if (lang === btn.dataset.lang) return;
    lang = btn.dataset.lang;
    applyLanguage();
  });
});

/* ============================================================
   INIT
   ============================================================ */

applyLanguage();   // renders palette, workbench, filters, dex, quests + progress
initGame();        // game.js: badges/missions sync, mascot, listeners
