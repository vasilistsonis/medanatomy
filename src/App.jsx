import { useState, useMemo, useEffect } from "react";
import { CN_DATA, MUSCLES_DATA, MNEMONICS_DATA, QUIZ_DATA } from "./data/uiData";
// ─── Shared atoms ─────────────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  Brain: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Muscle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 4 12 9.5 6.5 4l-2 2 1.5 4-2 2 1.5 4-2 2 4 4 2-2 4 1.5 2-2 4 1.5 2-2-4-5.5L20 6Z"/></svg>,
  Card: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="14" height="14" rx="2"/><rect x="7" y="9" width="14" height="10" rx="2" opacity="0.5"/></svg>,
  Quiz: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="16.5" r="0.6" fill="currentColor"/></svg>,
  Mnemonic: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16l4-3h12V4Z"/><path d="M8 9h8M8 13h5"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Chevron: ({d="right"}) => {
    const r = { right: 0, down: 90, left: 180, up: 270 }[d] || 0;
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform:`rotate(${r}deg)`}}><path d="m9 6 6 6-6 6"/></svg>;
  },
  Close: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>,
  Bolt: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>,
  Flame: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4 5 5 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 0 0 2 2 3-4Z"/></svg>,
  Pulse: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>,
  Plus: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Cross: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>,
  Stethoscope: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="13" r="2"/></svg>,
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Today", icon: Icon.Dashboard, count: null },
  { id: "cranial", label: "Cranial Nerves", icon: Icon.Brain, count: 12 },
  { id: "muscles", label: "Muscles", icon: Icon.Muscle, count: 8 },
  { id: "flashcards", label: "Flashcards", icon: Icon.Card, count: 248 },
  { id: "quiz", label: "Quiz", icon: Icon.Quiz, count: null },
  { id: "mnemonics", label: "Mnemonics", icon: Icon.Mnemonic, count: 30 },
  { id: "search", label: "Search", icon: Icon.Search, count: null },
];

function Sidebar({ view, setView, mini, setMini }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">✚</div>
        <div className="brand-meta">
          <div className="name">MedAnatomy</div>
          <div className="sub">Clinical · MS Level</div>
        </div>
      </div>
      <button className="collapse-btn" onClick={() => setMini(!mini)} title={mini ? "Expand" : "Collapse"}>
        <Icon.Chevron d={mini ? "right" : "left"} />
      </button>

      <div className="nav-group">
        <div className="nav-label">Study</div>
        {NAV.slice(0, 1).map(n => <NavItem key={n.id} n={n} active={view===n.id} onClick={()=>setView(n.id)} />)}
      </div>
      <div className="nav-group">
        <div className="nav-label">Reference</div>
        {NAV.slice(1, 3).map(n => <NavItem key={n.id} n={n} active={view===n.id} onClick={()=>setView(n.id)} />)}
      </div>
      <div className="nav-group">
        <div className="nav-label">Practice</div>
        {NAV.slice(3, 6).map(n => <NavItem key={n.id} n={n} active={view===n.id} onClick={()=>setView(n.id)} />)}
      </div>
      <div className="nav-group">
        <div className="nav-label">Tools</div>
        {NAV.slice(6).map(n => <NavItem key={n.id} n={n} active={view===n.id} onClick={()=>setView(n.id)} />)}
      </div>

      <div className="sidebar-foot">
        <div className="progress-mini"><div /></div>
        <span className="progress-label">38%</span>
      </div>
    </aside>
  );
}

function NavItem({ n, active, onClick }) {
  const I = n.icon;
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick} title={n.label}>
      <span className="icn"><I /></span>
      <span className="lbl">{n.label}</span>
      {n.count != null && <span className="count">{n.count}</span>}
    </button>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ crumb }) {
  return (
    <div className="topbar">
      <div className="crumbs">MedAnatomy <span style={{opacity:0.4, margin:"0 8px"}}>/</span> <em>{crumb}</em></div>
      <div className="quick-search">
        <Icon.Search />
        <span>Search anatomy, nerves, muscles…</span>
        <kbd>⌘ K</kbd>
      </div>
      <div className="user-chip">
        <div className="avatar">JS</div>
        <span>J. Singh · MS2</span>
      </div>
    </div>
  );
}


// ─── Dashboard view ───────────────────────────────────────────────────────────
const DIcon = Icon;

function Dashboard({ go }) {
  const kpis = [
    { glyph: "12", color: "var(--teal)", glow: "var(--teal-glow)", value: "12", label: "Cranial Nerves", sub: "I–XII covered", view: "cranial" },
    { glyph: <DIcon.Muscle />, color: "var(--blue)", glow: "var(--blue-glow)", value: "127", label: "Muscles", sub: "OIAN + Clinical", view: "muscles" },
    { glyph: <DIcon.Card />, color: "var(--amber)", glow: "var(--amber-glow)", value: "248", label: "Flashcards", sub: "32 due today", view: "flashcards" },
    { glyph: <DIcon.Mnemonic />, color: "var(--purple)", glow: "var(--purple-glow)", value: "30", label: "Mnemonics", sub: "All systems", view: "mnemonics" },
  ];

  const dueQueue = [
    { roman: "VII", title: "Facial nerve — lesion localisation", sub: "Above chorda tympani · Hyperacusis + taste loss", tag: "WEAK", tagCls: "weak" },
    { roman: "III", title: "Oculomotor — surgical vs medical palsy", sub: "Pupil involvement determines aetiology", tag: "REVIEW", tagCls: "review" },
    { roman: "C5", title: "Erb's palsy roots & posture", sub: "Upper trunk · Waiter's tip", tag: "NEW", tagCls: "new" },
    { roman: "L4", title: "Trendelenburg sign mechanism", sub: "Superior gluteal n. · Gluteus medius", tag: "REVIEW", tagCls: "review" },
    { roman: "X", title: "Recurrent laryngeal n. anatomy", sub: "Left: aortic arch · Right: subclavian", tag: "NEW", tagCls: "new" },
  ];

  const pearls = [
    { title: "CN III pupil rule", body: "Surgical (PCom aneurysm, uncal herniation) → pupil INVOLVED first. Medical (DM/HTN ischaemia) → pupil SPARED.", tag: "High Yield" },
    { title: "Uvula vs tongue deviation", body: "Uvula deviates AWAY from CN X lesion. Tongue deviates TOWARDS CN XII lesion (LMN).", tag: "Boards" },
    { title: "RLN course asymmetry", body: "Left RLN loops under the aortic arch; right under the subclavian. Left vulnerable in mediastinal pathology (Pancoast, AA aneurysm).", tag: "Clinical" },
    { title: "Brown-Séquard pattern", body: "Ipsilateral motor + DCML loss. Contralateral pain/temp loss 1–2 levels below the lesion.", tag: "Spinal" },
  ];

  const mastery = [
    { label: "Cranial Nerves", pct: 78 },
    { label: "Rotator Cuff", pct: 91 },
    { label: "Brachial Plexus", pct: 64, weak: true },
    { label: "Cranial Foramina", pct: 52, weak: true },
    { label: "Mnemonics", pct: 83 },
  ];

  return (
    <div className="view-pad">
      <div className="hero-card">
        <div className="hero-row">
          <div>
            <div className="greeting">Good evening, Jay</div>
            <h2>Pick up where you left off — <span style={{color:"var(--teal)", fontStyle:"italic"}}>CN VII localisation</span></h2>
            <p className="hero-meta">32 cards due, 4 weak areas flagged. Ten minutes of recall practice will keep your streak alive.</p>
          </div>
          <div className="streak-block">
            <div className="streak-num">14</div>
            <div className="streak-meta">
              <strong>day streak</strong>
              <span>longest · 22d</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kpi-row">
        {kpis.map(k => (
          <button key={k.label} className="kpi" style={{"--kpi-color": k.color, "--kpi-glow": k.glow}} onClick={() => go(k.view)}>
            <div className="kpi-top">
              <span className="kpi-glyph" style={{background: k.glow, color: k.color}}>{k.glyph}</span>
              <span className="kpi-arrow"><DIcon.Chevron /></span>
            </div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </button>
        ))}
      </div>

      <div className="dash-2col">
        <div className="panel">
          <div className="panel-head">
            <h3>Due for review</h3>
            <span className="panel-meta">5 of 32 · sorted by weakness</span>
          </div>
          <div className="due-list">
            {dueQueue.map((d, i) => (
              <div key={i} className="due-item" onClick={() => go("flashcards")}>
                <div className="due-roman">{d.roman}</div>
                <div>
                  <div className="due-title">{d.title}</div>
                  <div className="due-sub">{d.sub}</div>
                </div>
                <span className={`due-tag ${d.tagCls}`}>{d.tag}</span>
                <span className="chevron"><DIcon.Chevron /></span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Mastery</h3>
            <span className="panel-meta">last 14 days</span>
          </div>
          <div className="mastery-list">
            {mastery.map((m, i) => (
              <div key={i} className={`mastery-row ${m.weak ? "weak" : ""}`}>
                <div className="m-label">{m.label}</div>
                <div className="m-val"><strong>{m.pct}%</strong> {m.weak && <span style={{color: "var(--amber)", marginLeft: 6}}>· focus</span>}</div>
                <div className="m-bar"><div style={{width: `${m.pct}%`}} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>High-yield clinical pearls</h3>
          <span className="panel-meta">curated for the boards</span>
        </div>
        <div className="pearls" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {pearls.map((p, i) => (
            <div key={i} className="pearl">
              <div className="pearl-title">{p.title}</div>
              <div className="pearl-body">{p.body}</div>
              <span className="pearl-tag">⚕ {p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cranial Nerves view ──────────────────────────────────────────────────────
function CranialView() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const all = CN_DATA;
  const filters = ["All", "Sensory", "Motor", "Mixed"];

  const filtered = useMemo(() => {
    if (filter === "All") return all;
    return all.filter(c => c.type === filter);
  }, [filter]);

  return (
    <div className="view-pad">
      <div className="page-head">
        <div>
          <div className="eyebrow">⚕ Cranial Nerves</div>
          <h1>The Twelve <span className="accent">Cranial Nerves</span></h1>
          <p className="sub">Fibre types, nuclei, foramina, function, clinical correlations, mnemonics and embryology — all twelve, exam-ready.</p>
        </div>
        <div className="head-meta">
          <span><strong>12</strong> nerves</span>
          <span className="dot" />
          <span><strong>48</strong> correlations</span>
          <span className="dot" />
          <span><strong>SOMM-SBM</strong></span>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`chip ${filter===f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f} <span className="num">{f === "All" ? all.length : all.filter(c => c.type === f).length}</span>
          </button>
        ))}
      </div>

      <div className="cn-layout">
        {filtered.map(cn => (
          <button key={cn.number} className={`cn-card ${selected?.number===cn.number ? "selected" : ""}`}
            style={{"--cn-color": cn.color, "--cn-glow": cn.color + "22"}}
            onClick={() => setSelected(cn)}>
            <div className="cn-card-top">
              <div className="cn-roman">{cn.roman}</div>
              <span className={`cn-type-badge ${cn.type.toLowerCase()}`}>{cn.type}</span>
            </div>
            <h3>{cn.name}</h3>
            <div className="cn-latin">{cn.latin}</div>
            <div className="cn-fibers">
              {cn.fibers.map(f => <span key={f} className={`fiber-pill ${f.toLowerCase()}`}>{f}</span>)}
            </div>
            <div className="cn-foot">
              <div className="foramen"><span>EXIT</span> {cn.foramen.split("·")[0].trim()}</div>
              <DIcon.Chevron />
            </div>
          </button>
        ))}
      </div>

      {selected && <DetailPanel cn={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DetailPanel({ cn, onClose }) {
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={e => e.stopPropagation()}>
        <div className="detail-head">
          <div className="row1">
            <div>
              <div className="roman-xl" style={{color: cn.color}}>{cn.roman}</div>
              <h2>{cn.name} Nerve</h2>
              <div className="latin">{cn.latin}</div>
            </div>
            <button className="close-btn" onClick={onClose}><DIcon.Close /></button>
          </div>
          <div className="meta-row">
            <span className={`cn-type-badge ${cn.type.toLowerCase()}`}>{cn.type}</span>
            {cn.fibers.map(f => <span key={f} className={`fiber-pill ${f.toLowerCase()}`}>{f}</span>)}
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-block">
            <div className="block-title"><span className="num">01</span> Anatomy</div>
            <div className="kv-grid">
              <div className="k">Foramen</div><div className="v">{cn.foramen}</div>
              <div className="k">Origin</div><div className="v dim">{cn.origin}</div>
              <div className="k">Distribution</div><div className="v dim">{cn.termination}</div>
            </div>
          </div>

          <div className="detail-block">
            <div className="block-title"><span className="num">02</span> Function</div>
            <ul className="bullet-list">
              {cn.function.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          <div className="detail-block">
            <div className="block-title clinical"><span className="num">03</span> ⚕ Clinical Correlations</div>
            <ul className="clinical-list">
              {cn.clinical.map((c, i) => (
                <li key={i}><strong>{c.c}.</strong> {c.d}</li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <div className="block-title mnemonic"><span className="num">04</span> Mnemonic</div>
            <div className="mnemonic-card">
              <div className="phrase">"{cn.mnemonic}"</div>
            </div>
          </div>

          <div className="detail-block">
            <div className="block-title test"><span className="num">05</span> Clinical Testing</div>
            <p>{cn.test}</p>
          </div>

          <div className="detail-block">
            <div className="block-title embryo"><span className="num">06</span> Embryology</div>
            <p>{cn.embryo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Muscles view ─────────────────────────────────────────────────────────────
const VIcon = Icon;

function MusclesView() {
  const all = MUSCLES_DATA;
  const regions = ["All", ...Array.from(new Set(all.map(m => m.region)))];
  const [region, setRegion] = useState("All");
  const [openId, setOpenId] = useState("m1");
  const [query, setQuery] = useState("");

  const filtered = all.filter(m => {
    const rOk = region === "All" || m.region === region;
    const qOk = !query || m.name.toLowerCase().includes(query.toLowerCase()) || m.nerve.toLowerCase().includes(query.toLowerCase());
    return rOk && qOk;
  });

  return (
    <div className="view-pad">
      <div className="page-head">
        <div>
          <div className="eyebrow">⚕ Muscles · OIAN</div>
          <h1>Muscles &<br/><span className="accent">clinical anatomy</span></h1>
          <p className="sub">Origin · Insertion · Action · Nerve — with blood supply, clinical correlations and named special tests for each entry.</p>
        </div>
        <div className="head-meta">
          <span><strong>{all.length}</strong> entries</span>
          <span className="dot" />
          <span><strong>{regions.length - 1}</strong> regions</span>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-box">
          <VIcon.Search />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search muscle, nerve, action…" />
        </div>
        {regions.map(r => (
          <button key={r} className={`chip ${region===r ? "active" : ""}`} onClick={() => setRegion(r)}>
            {r}
          </button>
        ))}
      </div>

      <div className="muscle-list">
        {filtered.map(m => {
          const open = openId === m.id;
          return (
            <div key={m.id} className={`muscle-item ${open ? "open" : ""}`}>
              <button className="muscle-head" onClick={() => setOpenId(open ? null : m.id)}>
                <div>
                  <span className="muscle-name">{m.name}<span className="group-tag">· {m.group}</span></span>
                </div>
                <span className="muscle-region">{m.region}</span>
                <span className="muscle-nerve">{m.nerve}</span>
                <span className="chev"><VIcon.Chevron d="down" /></span>
              </button>
              {open && (
                <div className="muscle-body">
                  <div className="oian-grid">
                    <div className="oian-cell o">
                      <div className="lbl">Origin</div>
                      <div className="val">{m.origin}</div>
                    </div>
                    <div className="oian-cell i">
                      <div className="lbl">Insertion</div>
                      <div className="val">{m.insertion}</div>
                    </div>
                    <div className="oian-cell a">
                      <div className="lbl">Action</div>
                      <div className="val">{m.action}</div>
                    </div>
                    <div className="oian-cell n">
                      <div className="lbl">Innervation</div>
                      <div className="val">{m.nerve}</div>
                    </div>
                    <div className="oian-cell b" style={{gridColumn: "1 / -1"}}>
                      <div className="lbl">Blood supply</div>
                      <div className="val">{m.blood}</div>
                    </div>
                  </div>

                  <div className="clinical-block">
                    <div className="clin-label">⚕ Clinical correlations</div>
                    <ul>
                      {m.clinical.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>

                  {m.tests && m.tests.length > 0 && (
                    <div className="tests-row">
                      <span className="tests-label"><VIcon.Stethoscope /> Special tests</span>
                      {m.tests.map((t, i) => <span key={i} className="test-chip">{t}</span>)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Flashcards view ──────────────────────────────────────────────────────────
const FC_CARDS = [
  { deck: "Cranial Nerves",
    front: "Through which foramen does CN VII exit the skull?",
    back: { h: "Stylomastoid foramen", b: "CN VII enters the petrous bone via the internal acoustic meatus, traverses the facial canal, and exits through the stylomastoid foramen.\n\nBefore exit it gives off: greater petrosal n. (lacrimation), n. to stapedius, and chorda tympani (taste + submand/sublingual)."} },
  { deck: "Clinical — CN",
    front: "A patient cannot abduct the eye on lateral gaze. The pupil is normal and other movements are intact. Which nerve?",
    back: { h: "CN VI — Abducens", b: "Lateral rectus paralysis = isolated CN VI palsy. Often a 'false localising sign' in raised ICP because the long intracranial course of CN VI over the petrous ridge makes it vulnerable to stretch."}},
  { deck: "Muscles",
    front: "Supraspinatus — Origin, Insertion, and Nerve?",
    back: { h: "Suprascapular nerve (C5, C6)", b: "Origin: Supraspinous fossa of scapula\nInsertion: Superior facet of greater tubercle\nFunction: Initiates abduction 0–15°; GH stabiliser"}},
  { deck: "Mnemonics",
    front: '"To Zanzibar By Motor Car" — what does this mnemonic represent?',
    back: { h: "Five branches of CN VII", b: "Temporal · Zygomatic · Buccal · Mandibular · Cervical — the terminal branches of the facial nerve after exiting the parotid gland."}},
];
const FC_DECKS = ["All", "Cranial Nerves", "Clinical — CN", "Muscles", "Mnemonics"];

function FlashcardsView() {
  const [deck, setDeck] = useState("All");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [review, setReview] = useState(new Set());

  const cards = useMemo(() => deck === "All" ? FC_CARDS : FC_CARDS.filter(c => c.deck === deck), [deck]);
  const card = cards[idx % cards.length];
  const total = cards.length;
  const progress = Math.round((known.size / total) * 100);

  const advance = (delta) => {
    setFlipped(false);
    setTimeout(() => setIdx(i => (i + delta + total) % total), 140);
  };
  const mark = (kind) => {
    if (kind === "known") setKnown(s => new Set([...s, idx]));
    else setReview(s => new Set([...s, idx]));
    advance(1);
  };

  return (
    <div className="view-pad">
      <div className="page-head">
        <div>
          <div className="eyebrow">⚕ Active Recall</div>
          <h1>Flashcards <span className="accent">·</span> {total} cards</h1>
          <p className="sub">3D-flip cards built from your reference content. Mark known, send back to the review pile, or skip — your queue resorts by weakness.</p>
        </div>
      </div>

      <div className="filter-row">
        {FC_DECKS.map(d => (
          <button key={d} className={`chip ${deck===d ? "active" : ""}`} onClick={() => { setDeck(d); setIdx(0); setFlipped(false); }}>
            {d} <span className="num">{d === "All" ? FC_CARDS.length : FC_CARDS.filter(c => c.deck === d).length}</span>
          </button>
        ))}
      </div>

      <div className="fc-stage">
        <div className="fc-stats-row">
          <span className="stat-known">✓ Known {known.size}</span>
          <div className="stat-progress">
            <div className="pbar"><div style={{width: `${progress}%`}} /></div>
            <span>{idx + 1} / {total}</span>
          </div>
          <span className="stat-review">↻ Review {review.size}</span>
        </div>

        <div className="fc-row">
          <button className="fc-nav" onClick={() => advance(-1)}>‹</button>
          <div className="fc-scene">
            <div className={`fc-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(f => !f)}>
              <div className="fc-face front">
                <div className="fc-deck-tag">{card.deck}</div>
                <div className="fc-body">
                  <div className="fc-question">{card.front}</div>
                </div>
                <div className="fc-hint">Tap to reveal · Space</div>
              </div>
              <div className="fc-face back">
                <div className="fc-deck-tag">{card.deck} · Answer</div>
                <div className="fc-body">
                  <div className="fc-answer-headline">{card.back.h}</div>
                  <div className="fc-answer-body">{card.back.b}</div>
                </div>
                <div className="fc-hint">Tap to flip back</div>
              </div>
            </div>
          </div>
          <button className="fc-nav" onClick={() => advance(1)}>›</button>
        </div>

        <div className="fc-action-row">
          <button className="fc-btn review" onClick={() => mark("review")}>↻ Need review</button>
          <button className="fc-btn" onClick={() => advance(1)}>Skip →</button>
          <button className="fc-btn known" onClick={() => mark("known")}>✓ Got it</button>
        </div>
      </div>
    </div>
  );
}


// ─── Quiz view ────────────────────────────────────────────────────────────────
const QIcon = Icon;

function QuizView() {
  const questions = QUIZ_DATA;
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);

  const q = questions[qi];
  const answered = picked !== null;
  const correct = picked === q.answer;

  const select = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore(s => s + 1);
  };
  const next = () => {
    setPicked(null);
    setQi(i => (i + 1) % questions.length);
  };

  return (
    <div className="view-pad">
      <div className="page-head">
        <div>
          <div className="eyebrow">⚕ Quiz Mode</div>
          <h1>Multiple choice <span className="accent">workout</span></h1>
          <p className="sub">High-yield MCQs with full explanations. Track score, revisit incorrect answers at the end of the set.</p>
        </div>
      </div>

      <div className="quiz-wrap">
        <div className="quiz-progress">
          <span className="meta">Question <strong>{qi + 1}</strong> of {questions.length}</span>
          <div className="pbar"><div style={{width: `${((qi + (answered ? 1 : 0)) / questions.length) * 100}%`}} /></div>
          <span className="meta">Score <strong>{score}/{qi + (answered?1:0)}</strong></span>
        </div>

        <div className="quiz-card">
          <div className="quiz-cat">
            <QIcon.Bolt /> {q.cat}
            <span className="diff">{q.diff}</span>
          </div>
          <div className="quiz-q">{q.q}</div>
          <div className="quiz-opts">
            {q.opts.map((opt, i) => {
              const letter = "ABCD"[i];
              let cls = "quiz-opt";
              if (answered) {
                if (i === q.answer) cls += " correct";
                else if (i === picked) cls += " wrong";
                else cls += " dimmed";
              }
              return (
                <button key={i} className={cls} disabled={answered} onClick={() => select(i)}>
                  <span className="opt-letter">{letter}</span>
                  <span>{opt}</span>
                  <span className="opt-mark">
                    {answered ? (i === q.answer ? "✓" : (i === picked ? "✗" : "")) : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="quiz-explain">
              <div className="exp-lbl">{correct ? "✓ Correct — why" : "Explanation"}</div>
              <p>{q.explain}</p>
            </div>
          )}

          {answered && (
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <button className="quiz-next" onClick={next}>
                {qi + 1 >= questions.length ? "Restart" : "Next question"} <QIcon.Chevron />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Mnemonics view ───────────────────────────────────────────────────────────
function MnemonicsView() {
  const all = MNEMONICS_DATA;
  const cats = ["All", ...Array.from(new Set(all.map(m => m.cat)))];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? all : all.filter(m => m.cat === cat);

  return (
    <div className="view-pad">
      <div className="page-head">
        <div>
          <div className="eyebrow">⚕ Memory Aids</div>
          <h1>Curated <span className="accent">mnemonics</span></h1>
          <p className="sub">Hand-picked memory devices across every body system — phrase, expansion, and a clinical note explaining the catch.</p>
        </div>
        <div className="head-meta">
          <span><strong>{all.length}</strong> aids</span>
          <span className="dot" />
          <span><strong>{cats.length - 1}</strong> categories</span>
        </div>
      </div>

      <div className="filter-row">
        {cats.map(c => (
          <button key={c} className={`chip ${cat===c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="mn-grid">
        {filtered.map((m, i) => (
          <div key={i} className="mn-card">
            <div className="mn-cat">{m.cat}</div>
            <h3>{m.title}</h3>
            <div className="mn-phrase">"{m.phrase}"</div>
            <div className="mn-expand">{m.expand}</div>
            <div className="mn-note">{m.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Search view ──────────────────────────────────────────────────────────────
function SearchView() {
  const [q, setQ] = useState("trigeminal");

  const all = [
    ...CN_DATA.map(c => ({ type: "cn", title: `CN ${c.roman} — ${c.name}`, sub: `${c.type} · ${c.foramen.split("·")[0]} · ${c.fibers.join(", ")}` })),
    ...MUSCLES_DATA.map(m => ({ type: "muscle", title: m.name, sub: `${m.region} · ${m.nerve}` })),
    ...MNEMONICS_DATA.map(m => ({ type: "mnemonic", title: m.title, sub: `"${m.phrase}" · ${m.cat}` })),
    { type: "clinical", title: "Erb's palsy", sub: "Upper trunk lesion (C5–C6) · Waiter's tip · obstetric shoulder dystocia" },
    { type: "clinical", title: "Trendelenburg sign", sub: "Gluteus medius weakness · superior gluteal n. (L4–L5)" },
    { type: "clinical", title: "Brown-Séquard syndrome", sub: "Hemicord lesion · ipsilateral CST + DCML, contralateral ALS" },
    { type: "clinical", title: "Wallenberg syndrome", sub: "Lateral medullary infarct · PICA territory" },
    { type: "clinical", title: "Bell's palsy", sub: "LMN CN VII · forehead INVOLVED · idiopathic / HSV / Lyme" },
  ];

  const results = !q ? all.slice(0, 8) : all.filter(r =>
    r.title.toLowerCase().includes(q.toLowerCase()) || r.sub.toLowerCase().includes(q.toLowerCase())
  );

  const hl = (text) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, "ig"));
    return parts.map((p, i) => p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>);
  };

  const typeLabels = { cn: "CN", muscle: "MUSCLE", mnemonic: "MNEMONIC", clinical: "CLINICAL" };

  return (
    <div className="view-pad">
      <div className="search-hero">
        <h2>Search the whole anatomy library</h2>
        <p>Cranial nerves · muscles · mnemonics · clinical correlations · syndromes</p>
        <div className="big-search">
          <QIcon.Search />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Try 'trigeminal', 'Erb's', 'foramen ovale'…" autoFocus />
          <kbd>↵</kbd>
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom: 12}}>
        <div style={{fontFamily:"var(--f-mono)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--t-tertiary)"}}>
          {results.length} results {q && <>for <span style={{color: "var(--teal)"}}>"{q}"</span></>}
        </div>
        <div style={{display: "flex", gap: 8}}>
          {["All","CN","Muscles","Clinical","Mnemonics"].map(t => (
            <button key={t} className={`chip ${t==="All" ? "active" : ""}`} style={{padding: "5px 12px", fontSize: "0.75rem"}}>{t}</button>
          ))}
        </div>
      </div>

      <div className="search-results">
        {results.map((r, i) => (
          <div key={i} className="search-result">
            <span className={`sr-type ${r.type}`}>{typeLabels[r.type]}</span>
            <div>
              <div className="sr-title">{hl(r.title)}</div>
              <div className="sr-sub">{hl(r.sub)}</div>
            </div>
            <span className="sr-arrow"><QIcon.Chevron /></span>
          </div>
        ))}
      </div>
    </div>
  );
}


// App entry

const CRUMB = {
  dashboard: "Today",
  cranial: "Cranial Nerves",
  muscles: "Muscles",
  flashcards: "Flashcards",
  quiz: "Quiz",
  mnemonics: "Mnemonics",
  search: "Search",
};

export default function App() {
  const [view, setView] = useState("dashboard");
  const [mini, setMini] = useState(false);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setView("search");
      }
      if (e.key === "Escape") {
        // bubble up to allow modal close
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderView = () => {
    switch (view) {
      case "dashboard": return <Dashboard go={setView} />;
      case "cranial": return <CranialView />;
      case "muscles": return <MusclesView />;
      case "flashcards": return <FlashcardsView />;
      case "quiz": return <QuizView />;
      case "mnemonics": return <MnemonicsView />;
      case "search": return <SearchView />;
      default: return <Dashboard go={setView} />;
    }
  };

  return (
    <div className={`app-shell ${mini ? "mini" : ""}`}>
      <Sidebar view={view} setView={setView} mini={mini} setMini={setMini} />
      <main className="main">
        <Topbar crumb={CRUMB[view]} />
        <div className="view-scroll">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
