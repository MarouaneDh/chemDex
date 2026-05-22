/* Tiny fetch wrapper for the Chemdex API.

   In dev, Vite proxies /api to the Express server (see vite.config.js);
   in production the client and API are served from the same origin, so a
   relative base works everywhere. Auth is a Bearer token, passed per call. */

const BASE = "/api";

export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = "Bearer " + token;

  let res;
  try {
    res = await fetch(BASE + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // network down / server unreachable — surface a uniform error
    throw new Error("Cannot reach the server. Check your connection.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}
