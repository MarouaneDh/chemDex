/* ============================================================
   Sound — synthesized with the Web Audio API (no audio files).
   Ported from the vanilla game.js. The mute flag lives here as a
   module variable; GameContext keeps it in sync via setSfxMuted.
   ============================================================ */

let actx = null;
let muted = false;

export function setSfxMuted(value) {
  muted = !!value;
}

function audioCtx() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === "suspended") actx.resume();
  return actx;
}

// one short tone
function tone(freq, dur, type, vol, delay) {
  if (muted) return;
  const c = audioCtx();
  const t0 = c.currentTime + (delay || 0);
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(c.destination);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(vol || 0.18, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function chord(freqs, dur, type, vol, step) {
  freqs.forEach((f, i) => tone(f, dur, type, vol, i * (step || 0.09)));
}

export const SFX = {
  pop: () => tone(440, 0.12, "sine", 0.16),
  place: () => tone(300, 0.1, "triangle", 0.13),
  click: () => tone(540, 0.07, "square", 0.07),
  success: () => chord([523, 659, 784], 0.32, "triangle", 0.18),
  fail: () => {
    tone(180, 0.22, "sawtooth", 0.12);
    tone(120, 0.3, "sawtooth", 0.1, 0.07);
  },
  sparkle: () => chord([880, 1175, 1568, 2093], 0.26, "sine", 0.1, 0.055),
  levelUp: () => chord([523, 659, 784, 1047], 0.4, "triangle", 0.2, 0.12),
  badge: () => chord([659, 988], 0.3, "sine", 0.16, 0.1),
  mission: () => chord([784, 1047], 0.26, "triangle", 0.15, 0.09),
  // the Catch Moment sting — a low impact under a rising fanfare
  discover: () => {
    tone(70, 0.55, "sine", 0.24);
    tone(110, 0.4, "triangle", 0.14, 0.05);
    chord([392, 523, 659, 784], 0.5, "triangle", 0.16, 0.09);
  },
};
