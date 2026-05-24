/* The Sunlight Easter Egg — Brainstorm #34.

   Vitamin D₃'s card is "activated" by real outdoor light. We use the
   Generic Sensor API's AmbientLightSensor (Chromium on Android, behind
   a permission prompt). When unavailable (the typical desktop case)
   we offer an honor-system fallback — the player confirms they are
   genuinely outdoors. Either way the goal is the same: nudge a kid
   to step outside, even briefly. */

// Bright daylight is roughly 10,000-100,000 lux; a clouded sky is
// 1,000-10,000; a well-lit office is 300-500. We accept anything from
// open shade upwards.
export const SUNLIGHT_LUX_THRESHOLD = 3000;
export const SUNLIGHT_XP = 100;

/* Try to take an ambient-light reading. Resolves to one of:
   - { ok: true,  lux }   — sensor read a value above the threshold
   - { ok: false, lux }   — sensor read a value but it was too dim
   - { ok: false, supported: false } — no sensor / permission denied
*/
export async function readSunlight() {
  if (typeof AmbientLightSensor === "undefined") {
    return { ok: false, supported: false };
  }
  try {
    const lux = await new Promise((resolve) => {
      let done = false;
      const sensor = new AmbientLightSensor({ frequency: 2 });
      const finish = (v) => {
        if (done) return;
        done = true;
        try { sensor.stop(); } catch { /* ignore */ }
        resolve(v);
      };
      sensor.onreading = () => finish(sensor.illuminance);
      sensor.onerror = () => finish(null);
      sensor.start();
      // safety stop — never wait more than ~3.5 s for a reading
      setTimeout(() => finish(null), 3500);
    });
    if (lux == null) return { ok: false, supported: false };
    return { ok: lux >= SUNLIGHT_LUX_THRESHOLD, lux };
  } catch {
    return { ok: false, supported: false };
  }
}
