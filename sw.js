/* ============================================================
   Chemdex — service worker
   Precaches the app shell so the lab works fully offline.
   Bump CACHE whenever a precached asset changes, so clients
   pick up the new version on next load.
   ============================================================ */

const CACHE = "chemdex-v2";

// App shell — paths are relative to this worker's location.
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./i18n.js",
  "./game.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Google Fonts (cross-origin) — stale-while-revalidate.
  if (
    url.hostname.endsWith("googleapis.com") ||
    url.hostname.endsWith("gstatic.com")
  ) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Same-origin — cache-first, then network, then offline shell.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((cache) => cache.put(req, copy));
              return res;
            })
            .catch(() => caches.match("./index.html"))
      )
    );
  }
});

function staleWhileRevalidate(req) {
  return caches.open(CACHE).then((cache) =>
    cache.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
}
