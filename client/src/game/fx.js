/* ============================================================
   Visual FX — confetti, floating XP, toasts.

   These are transient, fire-and-forget DOM overlays appended to
   <body> and removed on a timer — there is no React state to keep,
   so an imperative helper is simpler and matches the original. The
   matching CSS lives in styles.css (.confetti / .xp-popup / .toast).
   ============================================================ */

const CONFETTI_COLORS = ["#2dd4bf", "#818cf8", "#fbbf24", "#fb7185", "#34d399", "#f472b6"];

// A burst of falling confetti. `big` is used for shiny finds and level-ups.
export function confettiBurst(big = false) {
  if (typeof document === "undefined") return;
  const n = big ? 80 : 46;
  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.style.left = 46 + Math.random() * 8 + "vw";
    d.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    d.style.setProperty("--dx", (Math.random() * 2 - 1) * 46 + "vw");
    d.style.setProperty("--rot", Math.random() * 900 - 450 + "deg");
    d.style.animationDelay = Math.random() * 0.18 + "s";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2400);
  }
}

// A "+N XP" number that floats up from the centre of the screen.
export function xpPopup(amount, shiny = false) {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.className = "xp-popup" + (shiny ? " shiny" : "");
  el.textContent = "+" + amount + " XP";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

// A stacked, self-dismissing notification (badge / mission / level-up).
export function toast(icon, text) {
  if (typeof document === "undefined") return;
  let wrap = document.getElementById("toastWrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toastWrap";
    document.body.appendChild(wrap);
  }
  const el = document.createElement("div");
  el.className = "toast";
  const ic = document.createElement("span");
  ic.className = "toast-icon";
  ic.textContent = icon;
  const tx = document.createElement("span");
  tx.textContent = text;
  el.append(ic, tx);
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 400);
  }, 3400);
}
