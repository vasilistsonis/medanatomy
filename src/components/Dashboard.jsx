import { cranialNerves } from "../data/cranialNerves";
import { muscles } from "../data/muscles";
import { mnemonics, quizQuestions } from "../data/mnemonics";

const SYSTEMS = [
  { label: "Cranial Nerves", count: cranialNerves.length, icon: "🧠", color: "#00d4a8", view: "cranial-nerves" },
  { label: "Muscles", count: muscles.length, icon: "💪", color: "#7c6af7", view: "muscles" },
  { label: "Mnemonics", count: mnemonics.length, icon: "📝", color: "#f7a84a", view: "mnemonics" },
  { label: "Quiz Questions", count: quizQuestions.length, icon: "❓", color: "#f76a8a", view: "quiz" },
];

const QUICK_FACTS = [
  { q: "Largest cranial nerve?", a: "CN V (Trigeminal)" },
  { q: "CN with longest intracranial course?", a: "CN IV (Trochlear)" },
  { q: "Rotator cuff muscles?", a: "SITS: Supraspinatus, Infraspinatus, Teres Minor, Subscapularis" },
  { q: "Brachial plexus roots?", a: "C5, C6, C7, C8, T1" },
  { q: "Erb's palsy — roots affected?", a: "C5–C6 (upper trunk)" },
  { q: "Klumpke's palsy — roots affected?", a: "C8–T1 (lower trunk)" },
  { q: "Trendelenburg sign — muscle?", a: "Gluteus Medius (superior gluteal n.)" },
  { q: "Thompson test — structure?", a: "Achilles tendon / Gastrocnemius-Soleus" },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div>
          <h1 className="hero-title">Clinical Anatomy <span className="accent">Reference</span></h1>
          <p className="hero-sub">
            Comprehensive medical school–level anatomy covering cranial nerves, muscles,
            brachial plexus, mnemonics, and clinical correlations.
          </p>
        </div>
        <div className="hero-badge">
          <span>⚕</span>
          <div>
            <div className="hero-badge-title">Medical Grade</div>
            <div className="hero-badge-sub">Exam Ready</div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {SYSTEMS.map((s) => (
          <button
            key={s.label}
            className="stat-card"
            style={{ "--card-accent": s.color }}
            onClick={() => onNavigate(s.view)}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-count" style={{ color: s.color }}>{s.count}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-arrow">→</div>
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dash-section">
          <h2 className="section-title">Quick Facts</h2>
          <div className="quick-facts">
            {QUICK_FACTS.map((f, i) => (
              <div key={i} className="quick-fact">
                <div className="qf-q">{f.q}</div>
                <div className="qf-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h2 className="section-title">Study Modes</h2>
          <div className="study-modes">
            {[
              { icon: "🃏", title: "Flashcard Mode", desc: "3D flip cards — spaced repetition-style active recall for all key facts.", view: "flashcards" },
              { icon: "❓", title: "Quiz Mode", desc: "MCQ questions with detailed answer explanations. Track your score.", view: "quiz" },
              { icon: "🔍", title: "Full Search", desc: "Search across all structures, nerves, muscles, and clinical correlations.", view: "search" },
              { icon: "📝", title: "Mnemonics", desc: "30+ curated memory aids covering every major anatomy topic.", view: "mnemonics" },
            ].map((m) => (
              <button key={m.view} className="study-mode-card" onClick={() => onNavigate(m.view)}>
                <span className="sm-icon">{m.icon}</span>
                <div>
                  <div className="sm-title">{m.title}</div>
                  <div className="sm-desc">{m.desc}</div>
                </div>
                <span className="sm-arrow">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-section clinical-highlight">
        <h2 className="section-title">High-Yield Clinical Correlations</h2>
        <div className="clinical-grid">
          {[
            { title: "CN III Pupil Rule", detail: "Surgical (PCom aneurysm) → pupil affected first. Medical (DM/HTN) → pupil spared (ischaemia spares outer parasympathetic fibres)." },
            { title: "CN VII Localization", detail: "Lesion above chorda tympani: taste lost + hyperacusis. At geniculate: lacrimation affected. Below stylomastoid: pure motor palsy." },
            { title: "Erb's vs Klumpke's", detail: "Erb's (C5-C6): waiter's tip, loss of shoulder abduction/ER. Klumpke's (C8-T1): claw hand, intrinsic weakness ± Horner syndrome." },
            { title: "Trendelenburg Sign", detail: "Pelvis drops to opposite side on single-leg stance → weak ipsilateral gluteus medius (superior gluteal nerve L4-L5)." },
            { title: "AIN Syndrome", detail: "Anterior Interosseous Nerve (median branch). Weakness of FPL, FDP I/II, pronator quadratus. No sensory loss. 'OK sign' impossible." },
            { title: "Brown-Séquard Syndrome", detail: "Ipsilateral: motor loss (CST), proprioception/vibration loss (DCML). Contralateral: pain/temperature loss (ALS) 1-2 levels below." },
          ].map((c, i) => (
            <div key={i} className="clinical-card">
              <div className="cc-title">{c.title}</div>
              <div className="cc-detail">{c.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
