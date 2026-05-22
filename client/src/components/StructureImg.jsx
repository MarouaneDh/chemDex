import { useEffect, useState } from "react";
import { structureURL } from "../game/rules.js";

/* A PubChem structure image that falls back to a 🧬 glyph if the
   remote image fails to load. Shared by the Dex, modal, and related
   chips. `view` ("2d" | "3d") resets the fallback when it changes. */
export default function StructureImg({ cid, view = "2d", size, alt = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [cid, view, size]);

  if (failed) return <span className="struct-fallback">🧬</span>;

  return (
    <img
      src={structureURL(cid, view, size)}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
