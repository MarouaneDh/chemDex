/* PubChem 3D-SDF probe cache.
   One shared fetch per CID, results memoised for the session, so the
   Modal can disable the "3D" segment for molecules without a 3D record
   AND the Molecule3D viewer can reuse the same response without
   re-hitting the network.

   Cache entries are { promise, sdf, status } where status is one of:
   - "pending"  — fetch in flight
   - "ok"       — SDF present (sdf is the text body)
   - "none"     — no 3D record (404 / empty body / network error)         */

const SDF_URL = (cid) =>
  `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`;

const cache = new Map();

export function probeSdf(cid) {
  if (!cid) return Promise.resolve(null);
  const hit = cache.get(cid);
  if (hit) return hit.promise;

  const promise = fetch(SDF_URL(cid))
    .then((res) => (res.ok ? res.text() : null))
    .then((sdf) => {
      // PubChem occasionally returns 200 with an empty body when a CID
      // has no real 3D record — treat empty bodies as "none" too.
      const text = sdf && sdf.trim().length > 0 ? sdf : null;
      const entry = cache.get(cid);
      if (entry) {
        entry.sdf = text;
        entry.status = text ? "ok" : "none";
      }
      return text;
    })
    .catch(() => {
      const entry = cache.get(cid);
      if (entry) entry.status = "none";
      return null;
    });

  cache.set(cid, { promise, sdf: null, status: "pending" });
  return promise;
}

export function getSdfStatus(cid) {
  return cache.get(cid)?.status ?? "unknown";
}

export function getSdf(cid) {
  return cache.get(cid)?.sdf ?? null;
}
