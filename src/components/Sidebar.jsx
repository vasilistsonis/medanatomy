import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", desc: "Overview" },
  { id: "cranial-nerves", label: "Cranial Nerves", icon: "🧠", desc: "CN I–XII" },
  { id: "muscles", label: "Muscles", icon: "💪", desc: "OIAN + Clinical" },
  { id: "flashcards", label: "Flashcards", icon: "🃏", desc: "Active Recall" },
  { id: "quiz", label: "Quiz Mode", icon: "❓", desc: "MCQ + Scoring" },
  { id: "mnemonics", label: "Mnemonics", icon: "📝", desc: "Memory Aids" },
  { id: "search", label: "Search", icon: "🔍", desc: "Full-text Search" },
];

export default function Sidebar({ activeView, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-brand">
            <span className="brand-icon">⚕</span>
            <div>
              <div className="brand-name">MedAnatomy</div>
              <div className="brand-sub">Clinical Study Platform</div>
            </div>
          </div>
        )}
        {collapsed && <span className="brand-icon">⚕</span>}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && (
              <div className="nav-text">
                <span className="nav-label">{item.label}</span>
                <span className="nav-desc">{item.desc}</span>
              </div>
            )}
            {activeView === item.id && <span className="nav-active-bar" />}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <span className="footer-badge">MS Level</span>
            <span>Anatomy Reference</span>
          </div>
        </div>
      )}
    </aside>
  );
}
