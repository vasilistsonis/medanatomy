import { useState, useMemo } from "react";
import { quizQuestions } from "../data/mnemonics";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizMode() {
  const questions = useMemo(() => shuffle(quizQuestions), []);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState([]);

  const q = questions[qIndex];
  const total = questions.length;

  const handleSelect = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const correct = opt === q.answer;
    if (correct) setScore((s) => s + 1);
    setHistory((h) => [...h, { q: q.question, selected: opt, answer: q.answer, correct }]);
  };

  const handleNext = () => {
    if (qIndex + 1 >= total) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setHistory([]);
  };

  const pct = Math.round((score / total) * 100);

  if (finished) {
    return (
      <div className="quiz-view">
        <div className="quiz-results">
          <div className="results-header">
            <div className="results-score-circle" style={{ "--pct": pct }}>
              <div className="results-score-inner">
                <div className="results-pct">{pct}%</div>
                <div className="results-label">{score}/{total}</div>
              </div>
            </div>
            <h2 className="results-title">
              {pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good effort! 👍" : "Keep studying! 📚"}
            </h2>
            <p className="results-sub">
              You scored {score} out of {total} questions correctly.
            </p>
            <button className="quiz-restart-btn" onClick={handleRestart}>Restart Quiz</button>
          </div>

          <div className="results-review">
            <h3 className="review-title">Review Answers</h3>
            {history.map((item, i) => (
              <div key={i} className={`review-item ${item.correct ? "correct" : "incorrect"}`}>
                <div className="ri-num">Q{i + 1}</div>
                <div className="ri-content">
                  <div className="ri-question">{item.q}</div>
                  <div className="ri-answer">
                    {item.correct ? "✓" : "✗"} You chose: <strong>{item.selected}</strong>
                    {!item.correct && <> · Correct: <strong className="correct-answer">{item.answer}</strong></>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      <div className="view-header">
        <h1 className="view-title">Quiz Mode <span className="cn-count">{total} Questions</span></h1>
        <p className="view-sub">High-yield MCQ covering cranial nerves, muscles, and clinical anatomy.</p>
      </div>

      <div className="quiz-meta">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((qIndex) / total) * 100}%` }} />
        </div>
        <div className="quiz-meta-row">
          <span>Question {qIndex + 1} of {total}</span>
          <span className="quiz-score">Score: {score}/{qIndex}</span>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-category">{q.category}</div>
        <div className="quiz-question">{q.question}</div>

        <div className="quiz-options">
          {q.options.map((opt) => {
            let cls = "quiz-option";
            if (answered) {
              if (opt === q.answer) cls += " correct";
              else if (opt === selected) cls += " wrong";
              else cls += " dimmed";
            }
            return (
              <button
                key={opt}
                className={cls}
                onClick={() => handleSelect(opt)}
                disabled={answered}
              >
                <span className="opt-bullet">
                  {answered ? (opt === q.answer ? "✓" : opt === selected ? "✗" : "○") : "○"}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="quiz-explanation">
            <div className="exp-title">Explanation</div>
            <div className="exp-text">{q.explanation}</div>
          </div>
        )}

        {answered && (
          <button className="quiz-next-btn" onClick={handleNext}>
            {qIndex + 1 >= total ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
