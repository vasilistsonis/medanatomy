import { useState, useMemo } from "react";
import { cranialNerves } from "../data/cranialNerves";
import { muscles } from "../data/muscles";
import { mnemonics, quizQuestions } from "../data/mnemonics";

const asText = (value) => Array.isArray(value) ? value.join(" ") : value || "";
const getCranialNerveType = (cn) => {
  if (cn.type) return cn.type;
  const endings = cn.fiberTypes.map((type) => type.at(-1));
  const hasAfferent = endings.includes("A");
  const hasEfferent = endings.includes("E");
  if (hasAfferent && hasEfferent) return "Mixed";
  return hasEfferent ? "Motor" : "Sensory";
};
const clinicalText = (cn) =>
  (cn.clinicalCorrelations || cn.clinical || [])
    .map((item) => typeof item === "string" ? item : `${item.condition} ${item.description}`)
    .join(" ");

function buildIndex() {
  const items = [];
  cranialNerves.forEach((cn) => {
    const cnType = getCranialNerveType(cn);
    items.push({
      id: `cn-${cn.number}`,
      type: "Cranial Nerve",
      title: `${cn.number} — ${cn.name}`,
      subtitle: cn.nickname,
      body: [cnType, cn.fiberTypes.join(", "), cn.foramen, asText(cn.function), clinicalText(cn)].join(" "),
      tags: [cnType, cn.number],
    });
  });
  muscles.forEach((m) => {
    items.push({
      id: `mus-${m.id}`,
      type: "Muscle",
      title: m.name,
      subtitle: m.region,
      body: [m.origin, m.insertion, m.nerve, Array.isArray(m.action) ? m.action.join(" ") : m.action, m.clinicalNote || "", (m.specialTests || []).join(" ")].join(" "),
      tags: [m.region, m.nerve],
    });
  });
  mnemonics.forEach((mn) => {
    items.push({
      id: `mn-${mn.id}`,
      type: "Mnemonic",
      title: mn.mnemonic,
      subtitle: mn.category,
      body: [mn.fullForm, mn.meaning].join(" "),
      tags: [mn.category],
    });
  });
  quizQuestions.forEach((q, i) => {
    items.push({
      id: `qz-${i}`,
      type: "Quiz Question",
      title: `${q.question || "Quiz question"}`.slice(0, 80) + "...",
      subtitle: q.category,
      body: [q.question, q.answer, q.explanation].join(" "),
      tags: [q.category],
    });
  });
  return items;
}

const INDEX = buildIndex();

const TYPE_COLORS = {
  "Cranial Nerve": "#00d4a8",
  "Muscle": "#7c6af7",
  "Mnemonic": "#f7a84a",
  "Quiz Question": "#f76a8a",
};

export default function SearchView() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q)
    ).slice(0, 40);
  }, [query]);

  const highlight = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 120) + "...";
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + q.length + 80);
    const before = (start > 0 ? "…" : "") + text.slice(start, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length, end) + (end < text.length ? "…" : "");
    return (
      <>{before}<mark className="search-highlight">{match}</mark>{after}</>
    );
  };

  return (
    <div className="search-view">
      <div className="view-header">
        <h1 className="view-title">Search <span className="cn-count">{INDEX.length} entries</span></h1>
        <p className="view-sub">Full-text search across all cranial nerves, muscles, mnemonics, and quiz questions.</p>
        <input
          autoFocus
          className="search-input search-input-lg"
          placeholder="Search anatomy..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.length >= 2 && (
        <div className="search-count">
          {results.length > 0
            ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
            : `No results for "${query}"`}
        </div>
      )}

      {query.length < 2 && (
        <div className="search-empty">
          <div className="search-prompt-icon">🔍</div>
          <div className="search-prompt">Start typing to search across all anatomy content.</div>
          <div className="search-tags">
            {["CN VII", "rotator cuff", "Trendelenburg", "brachial plexus", "Erb's palsy", "AIN syndrome"].map((s) => (
              <button key={s} className="search-tag" onClick={() => setQuery(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div className="search-results">
        {results.map((item) => (
          <div key={item.id} className="search-result">
            <div className="sr-header">
              <span className="sr-type" style={{ color: TYPE_COLORS[item.type], borderColor: TYPE_COLORS[item.type] + "44", background: TYPE_COLORS[item.type] + "11" }}>
                {item.type}
              </span>
              <span className="sr-title">{item.title}</span>
              <span className="sr-subtitle">{item.subtitle}</span>
            </div>
            <div className="sr-body">{highlight(item.body, query)}</div>
            <div className="sr-tags">
              {item.tags.map((t, i) => <span key={i} className="sr-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
