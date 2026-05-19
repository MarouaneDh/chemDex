/* ============================================================
   Chemdex app — static, frontend-only
   - Lab: build a molecule from atoms, then Combine to validate.
   - Validation: count atoms, compare to each molecule's atom map.
   - Dex: collection grid; discoveries persist in localStorage.
   ============================================================ */

"use strict";

const STORAGE_KEY = "chemdex.discoveries";

/* ---------- Persistence ---------- */
// discoveries = { [moleculeId]: ISODateString }
function loadDiscoveries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
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

/* ============================================================
   LAB
   ============================================================ */

const paletteEl   = document.getElementById("palette");
const workbenchEl = document.getElementById("workbench");
const liveFormula = document.getElementById("liveFormula");
const labMessage  = document.getElementById("labMessage");

// Render the atom palette
function renderPalette() {
  paletteEl.innerHTML = "";
  ATOMS.forEach(atom => {
    const el = document.createElement("div");
    el.className = "atom";
    el.style.background = atom.color;
    el.style.color = atom.text;
    el.draggable = true;
    el.innerHTML = `
      <span class="num">${atom.number}</span>
      <span class="sym">${atom.symbol}</span>
      <span class="nm">${atom.name}</span>`;
    el.addEventListener("click", () => addAtom(atom.symbol));
    el.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", atom.symbol);
    });
    paletteEl.appendChild(el);
  });
}

function addAtom(symbol) {
  workbench.push(symbol);
  renderWorkbench();
}

function removeAtom(index) {
  workbench.splice(index, 1);
  renderWorkbench();
}

function renderWorkbench() {
  workbenchEl.innerHTML = "";
  if (workbench.length === 0) {
    workbenchEl.innerHTML =
      '<p class="workbench-empty">Drop atoms here to build a molecule</p>';
  } else {
    workbench.forEach((sym, i) => {
      const atom = atomBySymbol(sym);
      const el = document.createElement("div");
      el.className = "bench-atom";
      el.style.background = atom.color;
      el.style.color = atom.text;
      el.textContent = sym;
      el.title = "Click to remove";
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
    setMessage("Add some atoms first.", "info");
    return;
  }
  const counts = countAtoms(workbench);
  const match = MOLECULES.find(m => countsEqual(m.atoms, counts));

  if (!match) {
    setMessage(
      `No stable molecule has the formula ${hillFormula(counts)}. Try a different mix.`,
      "bad"
    );
    return;
  }

  const alreadyKnown = !!discoveries[match.id];
  if (!alreadyKnown) {
    discoveries[match.id] = new Date().toISOString();
    saveDiscoveries(discoveries);
    updateProgress();
    renderDex();
    openMoleculeModal(match, true);
  } else {
    setMessage(
      `That's ${match.commonName} — already in your Dex. Built it again anyway!`,
      "ok"
    );
    openMoleculeModal(match, false);
  }
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
    el.textContent = cat;
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

  list.forEach(m => {
    const found = !!discoveries[m.id];
    const card = document.createElement("div");
    card.className =
      "dex-card " +
      (found ? "discovered r-" + m.rarity : "locked");

    if (found) {
      card.innerHTML = `
        <span class="id">${m.id.replace("mol_", "#")}</span>
        <div class="img-wrap">
          <img src="${structureURL(m.pubchemCid, "2d")}" alt="${m.commonName}"
               onerror="this.replaceWith(document.createTextNode('🧬'))" />
        </div>
        <div class="name">${m.commonName}</div>
        <div class="formula">${fmtFormula(m.formula)}</div>
        <div class="badges">
          <span class="badge rarity-${m.rarity}">${m.rarity}</span>
          <span class="badge badge-type">${m.type}</span>
        </div>`;
      card.addEventListener("click", () => openMoleculeModal(m, false));
    } else {
      // Locked: name hidden, but formula shown as a build hint
      card.innerHTML = `
        <span class="id">${m.id.replace("mol_", "#")}</span>
        <div class="img-wrap">?</div>
        <div class="name">??? </div>
        <div class="formula">Hint: ${fmtFormula(m.formula)}</div>
        <div class="badges">
          <span class="badge rarity-common">undiscovered</span>
        </div>`;
      card.title = "Build this formula in the Lab to discover it";
    }
    dexGrid.appendChild(card);
  });
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Reset all discoveries? This cannot be undone.")) {
    discoveries = {};
    saveDiscoveries(discoveries);
    updateProgress();
    renderDex();
  }
});

/* ============================================================
   MODAL
   ============================================================ */

const modalOverlay = document.getElementById("modal");
const modalCard    = document.getElementById("modalCard");

function openMoleculeModal(m, isNew) {
  const date = discoveries[m.id]
    ? new Date(discoveries[m.id]).toLocaleString()
    : null;

  modalCard.innerHTML = `
    ${isNew ? '<span class="discovery-tag">✨ NEW DISCOVERY</span>' : ""}
    <h2>${m.commonName}</h2>
    <div class="sub">${m.iupacName} &nbsp;·&nbsp; ${fmtFormula(m.formula)}</div>
    <div class="struct" id="structBox" title="Click to zoom">
      <img id="structImg" src="${structureURL(m.pubchemCid, "2d")}" alt="${m.commonName}" />
    </div>
    <div class="struct-tools">
      <button class="seg active" data-view="2d">2D</button>
      <button class="seg" data-view="3d">3D</button>
      <span class="zoom-hint">🔍 click image to zoom</span>
    </div>
    <p class="desc">${m.description}</p>

    <div class="badges">
      <span class="badge rarity-${m.rarity}">${m.rarity}</span>
      <span class="badge badge-type">${m.type}</span>
      <span class="badge badge-type">${m.category}</span>
      <span class="badge badge-type">tier ${m.tier}</span>
    </div>

    <div class="section-title">Real-world uses</div>
    <ul>${m.uses.map(u => `<li>${u}</li>`).join("")}</ul>

    <div class="stats">
      <span>Molar mass: <strong>${m.molarMass} g/mol</strong></span>
      <span>PubChem CID: <strong>${m.pubchemCid}</strong></span>
      <span style="grid-column:1/-1">InChIKey: <strong>${m.inchiKey}</strong></span>
    </div>

    <div class="funfact">💡 ${m.funFact}</div>
    ${date ? `<div class="discovered-on">Discovered: ${date}</div>` : ""}

    <button class="btn modal-close">Close</button>
  `;
  modalCard.querySelector(".modal-close")
    .addEventListener("click", closeModal);
  setupStructureViewer(m);
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
}
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});

// Wires the 2D/3D toggle and click-to-zoom for the modal's structure image.
function setupStructureViewer(m) {
  const box = document.getElementById("structBox");
  const img = document.getElementById("structImg");
  let view = "2d";

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
  lbLabel.textContent = `${m.commonName} · ${view.toUpperCase()}`;
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

// drag to pan (only meaningful when zoomed in)
let lbDragging = false, lbStartX = 0, lbStartY = 0;
lbStage.addEventListener("pointerdown", e => {
  if (lbZoom === 1) return;
  lbDragging = true;
  lbStartX = e.clientX - lbX;
  lbStartY = e.clientY - lbY;
  lbStage.classList.add("panning");
  lbStage.setPointerCapture(e.pointerId);
});
lbStage.addEventListener("pointermove", e => {
  if (!lbDragging) return;
  lbX = e.clientX - lbStartX;
  lbY = e.clientY - lbStartY;
  lbApply();
});
lbStage.addEventListener("pointerup", () => {
  lbDragging = false;
  lbStage.classList.remove("panning");
});

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
   INIT
   ============================================================ */

renderPalette();
renderWorkbench();
renderFilters();
renderDex();
updateProgress();
