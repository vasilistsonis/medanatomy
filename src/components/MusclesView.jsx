import { useState } from "react";
import { muscles } from "../data/muscles";

const REGIONS = ["All", ...Array.from(new Set(muscles.map((m) => m.region)))];

export default function MusclesView() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = muscles.filter((m) => {
    const regionOk = activeRegion === "All" || m.region === activeRegion;
    const searchOk =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nerve.toLowerCase().includes(search.toLowerCase()) ||
      (m.clinicalNote || "").toLowerCase().includes(search.toLowerCase());
    return regionOk && searchOk;
  });

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="muscles-view">
      <div className="view-header">
        <h1 className="view-title">Muscles <span className="cn-count">{muscles.length} entries</span></h1>
        <p className="view-sub">Origin · Insertion · Action · Nerve (OIAN) with full clinical correlations, special tests, and blood supply.</p>
        <input
          className="search-input"
          placeholder="Search muscles, nerves, actions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-bar region-filter">
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`filter-btn ${activeRegion === r ? "active" : ""}`}
              onClick={() => setActiveRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="muscle-count-bar">
        Showing <strong>{filtered.length}</strong> muscles
        {activeRegion !== "All" && <> in <strong>{activeRegion}</strong></>}
      </div>

      <div className="muscle-accordion">
        {filtered.map((m) => (
          <div key={m.id} className={`muscle-item ${expanded === m.id ? "open" : ""}`}>
            <button className="muscle-header" onClick={() => toggle(m.id)}>
              <div className="muscle-header-left">
                <span className="muscle-name">{m.name}</span>
                <span className="muscle-region-tag">{m.region}</span>
              </div>
              <div className="muscle-header-right">
                <span className="muscle-nerve-preview">{m.nerve}</span>
                <span className="accordion-chevron">{expanded === m.id ? "▲" : "▼"}</span>
              </div>
            </button>

            {expanded === m.id && (
              <div className="muscle-body">
                <div className="oian-grid">
                  <div className="oian-cell">
                    <div className="oian-label">Origin</div>
                    <div className="oian-value">{m.origin}</div>
                  </div>
                  <div className="oian-cell">
                    <div className="oian-label">Insertion</div>
                    <div className="oian-value">{m.insertion}</div>
                  </div>
                  <div className="oian-cell">
                    <div className="oian-label">Action</div>
                    <div className="oian-value">
                      {Array.isArray(m.action) ? m.action.join("; ") : m.action}
                    </div>
                  </div>
                  <div className="oian-cell">
                    <div className="oian-label">Nerve (Roots)</div>
                    <div className="oian-value nerve-highlight">{m.nerve}</div>
                  </div>
                  {m.bloodSupply && (
                    <div className="oian-cell">
                      <div className="oian-label">Blood Supply</div>
                      <div className="oian-value">{m.bloodSupply}</div>
                    </div>
                  )}
                </div>

                {m.clinicalNote && (
                  <div className="muscle-clinical">
                    <div className="clinical-label">⚕ Clinical</div>
                    <div className="clinical-text">{m.clinicalNote}</div>
                  </div>
                )}

                {m.specialTests && m.specialTests.length > 0 && (
                  <div className="muscle-tests">
                    <div className="tests-label">🩺 Special Tests</div>
                    <div className="tests-chips">
                      {m.specialTests.map((t, i) => (
                        <span key={i} className="test-chip">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {m.notes && (
                  <div className="muscle-notes">
                    <div className="notes-label">📌 Notes</div>
                    <div className="notes-text">{m.notes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div>No muscles match your search.</div>
        </div>
      )}
    </div>
  );
}
