/* ============================================================
   Avatar — one component for every face in the app.

   Displays the user's uploaded image when present, falls back to
   a placeholder emoji otherwise. Sizes through a single `size`
   prop; styling lives under .avatar in styles.css.

   When `editable` is true, the avatar becomes a clickable label
   wrapping a hidden file input. Selected files are client-side
   resized to a 256x256 center-cropped JPEG via canvas before
   handing the data URL to onUpload (typically uploadAvatar from
   AuthContext). This keeps the payload tiny and avoids shipping
   the user's original high-res image.
   ============================================================ */

import { useRef, useState } from "react";

const TARGET = 256;       // output edge size in px
const QUALITY = 0.85;     // JPEG quality — balance of size vs clarity

/* Read a file, draw it center-cropped to a TARGET×TARGET canvas,
   return a JPEG data URL. Rejects non-image inputs.            */
function fileToSquareDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That image could not be decoded."));
      img.onload = () => {
        // square center-crop — covers whatever aspect the source has
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = TARGET;
        canvas.height = TARGET;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, sx, sy, side, side, 0, 0, TARGET, TARGET);
        resolve(canvas.toDataURL("image/jpeg", QUALITY));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function Avatar({
  src,
  size = 36,
  fallback = "🧑‍🔬",
  className = "",
  editable = false,
  onUpload,           // async (dataURL) — typically uploadAvatar
  onError,            // (Error) — surfaces canvas/upload failures
}) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const cls =
    "avatar" +
    (editable ? " avatar--editable" : "") +
    (busy ? " avatar--busy" : "") +
    (className ? " " + className : "");

  const inner = src ? (
    <img
      className="avatar-img"
      src={src}
      alt=""
      draggable={false}
    />
  ) : (
    <span className="avatar-fallback" aria-hidden="true">
      {fallback}
    </span>
  );

  if (!editable) {
    return (
      <span
        className={cls}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.55) }}
      >
        {inner}
      </span>
    );
  }

  const onChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file || !onUpload) return;
    setBusy(true);
    try {
      const dataURL = await fileToSquareDataURL(file);
      await onUpload(dataURL);
    } catch (err) {
      onError?.(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <label
      className={cls}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.55) }}
      title="Change profile picture"
    >
      {inner}
      <span className="avatar-overlay" aria-hidden="true">
        {busy ? "…" : "📷"}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="avatar-file"
        onChange={onChange}
        disabled={busy}
      />
    </label>
  );
}
