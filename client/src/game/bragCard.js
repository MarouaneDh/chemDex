/* ============================================================
   Holo Brag Card — paints a shareable trading card onto a <canvas>.

   The card is drawn entirely with the 2D API (no external images),
   so export never hits a CORS-tainted canvas and works fully offline.
   `drawBragCard` is a no-op when there is no 2D context (jsdom / SSR).
   ============================================================ */

import { ATOMS } from "../data/gamedata.js";

const CARD_W = 600;
const CARD_H = 840;

const RARITY_COLOR = {
  common: "#94a3b8",
  uncommon: "#34d399",
  rare: "#38bdf8",
  epic: "#c084fc",
};

/* ---------- small colour + path helpers ---------- */

function toRGB(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
function rgba(hex, a) {
  const [r, g, b] = toRGB(hex);
  return `rgba(${r},${g},${b},${a})`;
}
function mix(hexA, hexB, t) {
  const a = toRGB(hexA);
  const b = toRGB(hexB);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// a faceted rarity gem
function drawGem(ctx, cx, cy, s, color) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + s, cy);
  ctx.lineTo(cx, cy + s);
  ctx.lineTo(cx - s, cy);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + s, cy);
  ctx.lineTo(cx - s, cy);
  ctx.closePath();
  ctx.fillStyle = rgba("#ffffff", 0.35);
  ctx.fill();
}

// fit a name into 1–2 centred lines, shrinking the font until it does
function drawName(ctx, name, cx, top, maxW) {
  for (const size of [46, 40, 34, 28, 23]) {
    ctx.font = `700 ${size}px 'Space Grotesk', system-ui, sans-serif`;
    if (ctx.measureText(name).width <= maxW) {
      ctx.fillText(name, cx, top + size);
      return top + size + 10;
    }
    // try two lines
    const words = name.split(" ");
    for (let i = 1; i < words.length; i++) {
      const l1 = words.slice(0, i).join(" ");
      const l2 = words.slice(i).join(" ");
      if (
        ctx.measureText(l1).width <= maxW &&
        ctx.measureText(l2).width <= maxW
      ) {
        ctx.fillText(l1, cx, top + size);
        ctx.fillText(l2, cx, top + size * 2 + 4);
        return top + size * 2 + 14;
      }
    }
  }
  // last resort — draw at the smallest size anyway
  ctx.fillText(name, cx, top + 23);
  return top + 36;
}

// the chemical formula with subscript digits, centred on cx
function drawFormula(ctx, formula, cx, y) {
  const main = 42;
  const sub = 26;
  let width = 0;
  for (const ch of formula) {
    ctx.font = `700 ${/\d/.test(ch) ? sub : main}px 'JetBrains Mono', monospace`;
    width += ctx.measureText(ch).width;
  }
  let x = cx - width / 2;
  for (const ch of formula) {
    const digit = /\d/.test(ch);
    ctx.font = `700 ${digit ? sub : main}px 'JetBrains Mono', monospace`;
    ctx.textAlign = "left";
    ctx.fillText(ch, x, y + (digit ? 8 : 0));
    x += ctx.measureText(ch).width;
  }
  ctx.textAlign = "center";
}

// a decorative atom constellation: a centre atom ringed by the rest
function drawMotif(ctx, atomsMap, cx, cy, color) {
  const instances = [];
  for (const [sym, n] of Object.entries(atomsMap)) {
    for (let i = 0; i < n; i++) instances.push(sym);
  }
  const shown = instances.slice(0, 14);
  const colorOf = (sym) => {
    const a = ATOMS.find((x) => x.symbol === sym);
    return a ? { bg: a.color, fg: a.text } : { bg: "#3a4150", fg: "#eef2f6" };
  };

  const ring = shown.slice(1);
  const R = ring.length > 8 ? 122 : 100;
  const positions = shown.map((sym, i) => {
    if (i === 0) return { sym, x: cx, y: cy };
    const a = ((i - 1) / ring.length) * Math.PI * 2 - Math.PI / 2;
    return { sym, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  });

  // bonds from the centre outward
  ctx.strokeStyle = rgba(color, 0.5);
  ctx.lineWidth = 3;
  for (let i = 1; i < positions.length; i++) {
    ctx.beginPath();
    ctx.moveTo(positions[0].x, positions[0].y);
    ctx.lineTo(positions[i].x, positions[i].y);
    ctx.stroke();
  }

  // atom bubbles
  const r = shown.length > 9 ? 23 : 28;
  for (const p of positions) {
    const c = colorOf(p.sym);
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = c.bg;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = rgba("#ffffff", 0.25);
    ctx.stroke();
    ctx.fillStyle = c.fg;
    ctx.font = `700 ${r - 6}px 'Space Grotesk', system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(p.sym, p.x, p.y + 1);
  }
  ctx.textBaseline = "alphabetic";
}

/* ---------- the card ---------- */

export function drawBragCard(canvas, opts) {
  if (!canvas) return;
  const ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return; // jsdom / SSR — nothing to paint

  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const W = CARD_W;
  const H = CARD_H;
  const accent = RARITY_COLOR[opts.rarity] || RARITY_COLOR.common;
  const holo = opts.shiny || opts.rarity === "rare" || opts.rarity === "epic";

  ctx.clearRect(0, 0, W, H);

  // background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0b0e14");
  bg.addColorStop(1, mix("#0b0e14", accent, 0.34));
  roundRect(ctx, 0, 0, W, H, 36);
  ctx.fillStyle = bg;
  ctx.fill();

  // soft glow behind the motif
  const glow = ctx.createRadialGradient(W / 2, 380, 40, W / 2, 380, 460);
  glow.addColorStop(0, rgba(accent, 0.28));
  glow.addColorStop(1, rgba(accent, 0));
  roundRect(ctx, 0, 0, W, H, 36);
  ctx.fillStyle = glow;
  ctx.fill();

  // holo foil sweep for rares
  if (holo) {
    ctx.save();
    roundRect(ctx, 0, 0, W, H, 36);
    ctx.clip();
    const sweep = ctx.createLinearGradient(0, 0, W, H);
    sweep.addColorStop(0.0, rgba("#ffffff", 0));
    sweep.addColorStop(0.4, rgba("#ffffff", 0.1));
    sweep.addColorStop(0.5, rgba(accent, 0.22));
    sweep.addColorStop(0.6, rgba("#ffffff", 0.1));
    sweep.addColorStop(1.0, rgba("#ffffff", 0));
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // frame
  roundRect(ctx, 11, 11, W - 22, H - 22, 28);
  ctx.lineWidth = 3;
  ctx.strokeStyle = accent;
  ctx.stroke();
  roundRect(ctx, 20, 20, W - 40, H - 40, 21);
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba("#ffffff", 0.08);
  ctx.stroke();

  // header — rarity gem + label, shiny tag
  drawGem(ctx, 56, 64, 15, accent);
  ctx.font = "700 19px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = accent;
  ctx.textAlign = "left";
  ctx.fillText((opts.rarityLabel || opts.rarity || "").toUpperCase(), 80, 71);
  if (opts.shiny) {
    ctx.font = "700 18px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#fbbf24";
    ctx.textAlign = "right";
    ctx.fillText("✨ SHINY", W - 56, 71);
  }

  // molecule name + type
  ctx.textAlign = "center";
  ctx.fillStyle = "#eef2f6";
  const afterName = drawName(ctx, opts.name || "", W / 2, 96, W - 130);
  ctx.font = "600 16px 'Inter', system-ui, sans-serif";
  ctx.fillStyle = "#8b95a5";
  ctx.fillText((opts.typeLabel || "").toUpperCase(), W / 2, afterName + 14);

  // motif panel
  roundRect(ctx, 60, 250, W - 120, 300, 22);
  ctx.fillStyle = rgba("#ffffff", 0.035);
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba("#ffffff", 0.07);
  ctx.stroke();
  drawMotif(ctx, opts.atoms || {}, W / 2, 400, accent);

  // formula
  ctx.fillStyle = "#eef2f6";
  drawFormula(ctx, opts.formula || "", W / 2, 622);

  // divider
  ctx.beginPath();
  ctx.moveTo(60, 668);
  ctx.lineTo(W - 60, 668);
  ctx.strokeStyle = rgba("#ffffff", 0.1);
  ctx.lineWidth = 1;
  ctx.stroke();

  // footer — owner + date
  ctx.textAlign = "left";
  ctx.font = "600 12px 'Inter', system-ui, sans-serif";
  ctx.fillStyle = "#5b6472";
  ctx.fillText((opts.ownerLabel || "DISCOVERED BY").toUpperCase(), 60, 700);
  ctx.font = "700 20px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = "#eef2f6";
  ctx.fillText(opts.owner || "", 60, 726);

  if (opts.dateText) {
    ctx.textAlign = "right";
    ctx.font = "600 12px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "#5b6472";
    ctx.fillText("DATE", W - 60, 700);
    ctx.font = "700 18px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#eef2f6";
    ctx.fillText(opts.dateText, W - 60, 726);
  }

  // wordmark
  ctx.textAlign = "center";
  ctx.font = "700 22px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillText("CHEMDEX", W / 2, 792);
  if (opts.cid) {
    ctx.font = "600 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#5b6472";
    ctx.fillText("PubChem CID " + opts.cid, W / 2, 812);
  }
}

/* Export the card — share via the Web Share API, else download a PNG. */
export function exportBragCard(canvas, filename) {
  if (!canvas || typeof canvas.toBlob !== "function") return;
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], filename, { type: "image/png" });
    if (
      navigator.canShare &&
      navigator.canShare({ files: [file] }) &&
      navigator.share
    ) {
      try {
        await navigator.share({ files: [file], title: "Chemdex discovery" });
        return;
      } catch {
        /* user cancelled — fall through to download */
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
