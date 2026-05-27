import { useState } from "react";
import { mnemonics } from "../data/mnemonics";

const CATEGORIES = ["All", ...Array.from(new Set(mnemonics.map((m) => m.category)))];

export default function MnemonicsView() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = mnemonics.filter((m) => {
    const catOk = category === "All" || m.category === category;
    const searchOk =
      !search ||
      m.mnemonic.toLowerCase().includes(search.toLowerCase()) ||
      m.fullForm.toLowerCase().includes(search.toLowerCase()) ||
      m.meaning.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <div className="mnemonics-view">
      <div className="view-header">
        <h1 className="view-title">Mnemonics <span className="cn-count">{mnemonics.length} aids</span></h1>
        <p className="view-sub">Curated memory aids for every high-yield anatomy topic.</p>
        <input
          className="search-input"
          placeholder="Search mnemonics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mnemonics-grid">
        {filtered.map((m) => (
          <div
            key={m.id}
            className={`mnemonic-card ${expanded === m.id ? "expanded" : ""}`}
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
          >
            <div className="mc-category">{m.category}</div>
            <div className="mc-mnemonic">"{m.mnemonic}"</div>
            <div className="mc-form">{m.fullForm}</div>
            {expanded === m.id && (
              <div className="mc-meaning">{m.meaning}</div>
            )}
            <div className="mc-expand-hint">{expanded === m.id ? "▲ Less" : "▼ More"}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div>No mnemonics match your search.</div>
        </div>
      )}
    </div>
  );
}
