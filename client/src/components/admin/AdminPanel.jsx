import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { apiFetch } from "../../api/client.js";
import { useCatalog } from "../../context/CatalogContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

/* The admin panel — atoms and molecules CRUD. JSON-textarea editor:
   admins are technical users, and a structured form for every shape
   the molecule schema accepts would be a project on its own. */

const ATOM_TEMPLATE = {
  symbol: "X",
  name: "Example",
  number: 0,
  valence: 1,
  color: "#888888",
  text: "#ffffff",
};

const MOLECULE_TEMPLATE = {
  id: "mol_new_001",
  pubchemCid: null,
  formula: "Xx",
  commonName: "New molecule",
  iupacName: "",
  atoms: { H: 1 },
  description: "",
  uses: [],
  category: "organic",
  type: "",
  rarity: "common",
  tier: 1,
  smiles: null,
  inchiKey: "",
  molarMass: 0,
  structureImage: null,
  funFact: "",
  fr: { commonName: "", description: "", uses: [], funFact: "" },
  hazards: [],
};

export default function AdminPanel() {
  const { atoms, molecules, refresh } = useCatalog();
  const { token } = useAuth();
  const [section, setSection] = useState("molecules"); // "atoms" | "molecules"
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // { kind, mode: "edit"|"new", text, originalId? }
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = section === "atoms" ? atoms : molecules;
    if (!q) return list;
    return list.filter((item) =>
      (section === "atoms"
        ? item.symbol + " " + item.name
        : item.id + " " + item.commonName + " " + item.formula
      )
        .toLowerCase()
        .includes(q)
    );
  }, [section, atoms, molecules, query]);

  const openEdit = (item) => {
    setError("");
    setEditing({
      kind: section,
      mode: "edit",
      originalId: section === "atoms" ? item.symbol : item.id,
      text: JSON.stringify(item, null, 2),
    });
  };
  const openNew = () => {
    setError("");
    setEditing({
      kind: section,
      mode: "new",
      text: JSON.stringify(section === "atoms" ? ATOM_TEMPLATE : MOLECULE_TEMPLATE, null, 2),
    });
  };
  const closeEdit = () => {
    setEditing(null);
    setError("");
  };

  const save = async () => {
    let body;
    try {
      body = JSON.parse(editing.text);
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const base = "/catalog/" + editing.kind;
      if (editing.mode === "new") {
        await apiFetch(base, { method: "POST", token, body });
      } else {
        await apiFetch(base + "/" + encodeURIComponent(editing.originalId), {
          method: "PUT",
          token,
          body,
        });
      }
      await refresh();
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item) => {
    const idLabel = section === "atoms" ? item.symbol : item.id;
    if (!window.confirm(`Delete ${idLabel}?`)) return;
    setBusy(true);
    try {
      await apiFetch(
        "/catalog/" + section + "/" + encodeURIComponent(idLabel),
        { method: "DELETE", token }
      );
      await refresh();
    } catch (err) {
      window.alert("Delete failed: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-head">
        <div className="admin-tabs">
          <button
            className={"admin-tab" + (section === "molecules" ? " active" : "")}
            onClick={() => setSection("molecules")}
          >
            Molecules <span className="admin-count">{molecules.length}</span>
          </button>
          <button
            className={"admin-tab" + (section === "atoms" ? " active" : "")}
            onClick={() => setSection("atoms")}
          >
            Atoms <span className="admin-count">{atoms.length}</span>
          </button>
        </div>
        <div className="admin-actions">
          <input
            type="search"
            className="admin-search"
            placeholder={"Filter " + section + "…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openNew}>+ New {section.slice(0, -1)}</button>
        </div>
      </div>

      <div className="admin-list">
        {filtered.map((item) => {
          const key = section === "atoms" ? item.symbol : item.id;
          const primary = section === "atoms" ? item.name : item.commonName;
          const secondary =
            section === "atoms"
              ? `${item.symbol} · #${item.number} · v${item.valence}`
              : `${item.id} · ${item.formula} · ${item.category}`;
          return (
            <div key={key} className="admin-row">
              <div className="admin-row-body">
                <div className="admin-row-primary">{primary}</div>
                <div className="admin-row-secondary">{secondary}</div>
              </div>
              <div className="admin-row-actions">
                <button className="btn" onClick={() => openEdit(item)} disabled={busy}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => remove(item)}
                  disabled={busy}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="admin-empty">No {section} match this filter.</div>
        )}
      </div>

      {editing &&
        createPortal(
          /* Rendered to <body> via a portal so the fixed overlay escapes
             the .view.active section's transform — without this, the
             section becomes the containing block and the modal vanishes
             inside its (possibly off-screen) box. */
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeEdit();
            }}
          >
            <div className="modal admin-edit">
              <h2>
                {editing.mode === "new" ? "New" : "Edit"} {editing.kind.slice(0, -1)}
                {editing.originalId ? " — " + editing.originalId : ""}
              </h2>
              <p className="admin-hint">
                JSON document — Mongoose validates the shape on save.
              </p>
              <textarea
                className="admin-json"
                spellCheck={false}
                value={editing.text}
                onChange={(e) =>
                  setEditing((s) => ({ ...s, text: e.target.value }))
                }
              />
              {error && <p className="auth-error">{error}</p>}
              <div className="modal-actions">
                <button
                  className="btn btn-primary"
                  disabled={busy}
                  onClick={save}
                >
                  {busy ? "Saving…" : "Save"}
                </button>
                <button className="btn modal-close" onClick={closeEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
