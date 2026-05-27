import { useState } from "react";
import { cranialNerves } from "../data/cranialNerves";

const FIBER_COLORS = {
  GSE: "#00d4a8",
  GVE: "#7c6af7",
  SVE: "#f7a84a",
  GSA: "#5b9cf7",
  GVA: "#a8f75b",
  SSA: "#f75b9c",
  SVA: "#f7d25b",
};

const asList = (value) => Array.isArray(value) ? value : [value].filter(Boolean);
const getCranialNerveType = (cn) => {
  if (cn.type) return cn.type;
  const endings = cn.fiberTypes.map((type) => type.at(-1));
  const hasAfferent = endings.includes("A");
  const hasEfferent = endings.includes("E");
  if (hasAfferent && hasEfferent) return "Mixed";
  return hasEfferent ? "Motor" : "Sensory";
};
const getClinicalItems = (cn) => asList(cn.clinicalCorrelations || cn.clinical);

export default function CranialNervesView() {
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const types = ["all", "sensory", "motor", "mixed"];
  const filtered = cranialNerves.filter((cn) => {
    const cnType = getCranialNerveType(cn).toLowerCase();
    if (filterType === "all") return true;
    if (filterType === "sensory") return cnType === "sensory";
    if (filterType === "motor") return cnType === "motor";
    if (filterType === "mixed") return cnType === "mixed";
    return true;
  });

  return (
    <div className="cn-view">
      <div className="view-header">
        <h1 className="view-title">Cranial Nerves <span className="cn-count">CN I–XII</span></h1>
        <p className="view-sub">Complete coverage: fiber types, nuclei, foramina, function, clinical correlations, mnemonics, and embryology.</p>
        <div className="filter-bar">
          {types.map((t) => (
            <button
              key={t}
              className={`filter-btn ${filterType === t ? "active" : ""}`}
              onClick={() => setFilterType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="cn-layout">
        <div className="cn-grid">
          {filtered.map((cn) => {
            const cnType = getCranialNerveType(cn);
            return (
              <button
                key={cn.number}
                className={`cn-card ${selected?.number === cn.number ? "active" : ""}`}
                onClick={() => setSelected(selected?.number === cn.number ? null : cn)}
              >
                <div className="cn-number">{cn.number}</div>
                <div className="cn-name">{cn.name}</div>
                <div className="cn-aka">{cn.nickname}</div>
                <div className={`cn-type-badge type-${cnType.toLowerCase()}`}>{cnType}</div>
                <div className="cn-mnemonic-preview">{cn.mnemonic}</div>
              </button>
            );
          })}
        </div>

        {selected && (() => {
          const selectedType = getCranialNerveType(selected);
          return (
          <div className="cn-detail-panel">
            <div className="detail-header">
              <div>
                <span className="detail-num">{selected.number}</span>
                <span className="detail-name">{selected.name}</span>
                <span className="detail-nickname">"{selected.nickname}"</span>
              </div>
              <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="detail-body">
              <div className="detail-row">
                <span className="detail-label">Type</span>
                <span className={`cn-type-badge type-${selectedType.toLowerCase()}`}>{selectedType}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Fiber Types</span>
                <div className="fiber-chips">
                  {selected.fiberTypes.map((f) => (
                    <span key={f} className="fiber-chip" style={{ background: FIBER_COLORS[f] + "22", color: FIBER_COLORS[f], borderColor: FIBER_COLORS[f] + "44" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {selected.nuclei && (
                <div className="detail-section">
                  <div className="detail-section-title">Nuclei</div>
                  <div className="detail-list">
                    {asList(selected.nuclei).map((n, i) => <div key={i} className="detail-list-item">• {n}</div>)}
                  </div>
                </div>
              )}

              {selected.ganglion && (
                <div className="detail-row">
                  <span className="detail-label">Ganglion</span>
                  <span>{selected.ganglion}</span>
                </div>
              )}

              <div className="detail-row">
                <span className="detail-label">Exit Foramen</span>
                <span className="foramen-tag">{selected.foramen}</span>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">Origin</div>
                <div className="detail-text">{selected.origin}</div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">Termination / Distribution</div>
                <div className="detail-text">{selected.termination || selected.central_termination}</div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">Function</div>
                <div className="detail-list">
                  {asList(selected.function).map((f, i) => <div key={i} className="detail-list-item">▸ {f}</div>)}
                </div>
              </div>

              {selected.branches && (
                <div className="detail-section">
                  <div className="detail-section-title">Branches</div>
                  <div className="detail-list">
                    {selected.branches.map((b, i) => <div key={i} className="detail-list-item">• {b}</div>)}
                  </div>
                </div>
              )}

              <div className="detail-section clinical-section">
                <div className="detail-section-title">⚕ Clinical Correlations</div>
                {getClinicalItems(selected).map((c, i) => (
                  <div key={i} className="clinical-item">
                    <div className="ci-title">{typeof c === "string" ? "Clinical note" : c.condition}</div>
                    <div className="ci-desc">{typeof c === "string" ? c : c.description}</div>
                    {typeof c !== "string" && c.signs && (
                      <div className="ci-signs">
                        {c.signs.map((s, j) => <span key={j} className="ci-sign">{s}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="detail-section">
                <div className="detail-section-title">📝 Mnemonic</div>
                <div className="mnemonic-box">{selected.mnemonic}</div>
              </div>

              {selected.embryology && (
                <div className="detail-section">
                  <div className="detail-section-title">🧬 Embryology</div>
                  <div className="detail-text">{selected.embryology}</div>
                </div>
              )}

              {selected.testMethod && (
                <div className="detail-section">
                  <div className="detail-section-title">🩺 Clinical Testing</div>
                  <div className="detail-text">{selected.testMethod}</div>
                </div>
              )}
            </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
