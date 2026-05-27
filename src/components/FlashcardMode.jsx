import { useState, useMemo } from "react";
import { cranialNerves } from "../data/cranialNerves";
import { muscles } from "../data/muscles";
import { mnemonics } from "../data/mnemonics";

const asList = (value) => Array.isArray(value) ? value : [value].filter(Boolean);
const getClinicalItems = (cn) => asList(cn.clinicalCorrelations || cn.clinical);

function buildCards() {
  const cards = [];

  cranialNerves.forEach((cn) => {
    cards.push({
      id: `cn-${cn.number}-func`,
      deck: "Cranial Nerves",
      front: `${cn.number} — ${cn.name}\nWhat are its fiber types and primary function?`,
      back: `Fiber types: ${cn.fiberTypes.join(", ")}\n\n${asList(cn.function).join("\n")}`,
    });
    cards.push({
      id: `cn-${cn.number}-foramen`,
      deck: "Cranial Nerves",
      front: `${cn.name} (${cn.number})\nThrough which foramen does it exit the skull?`,
      back: cn.foramen,
    });
    getClinicalItems(cn).slice(0, 1).forEach((c) => {
      const condition = typeof c === "string" ? "Clinical correlation" : c.condition;
      const description = typeof c === "string" ? c : c.description;
      const signs = typeof c === "string" ? "" : c.signs ? "\n\n" + c.signs.join(" | ") : "";
      cards.push({
        id: `cn-${cn.number}-clin`,
        deck: "Clinical — CN",
        front: `${condition}\nWhat cranial nerve is involved and what are the signs?`,
        back: `${cn.name} (${cn.number})\n\n${description}${signs}`,
      });
    });
  });

  muscles.slice(0, 30).forEach((m) => {
    cards.push({
      id: `mus-${m.id}-oian`,
      deck: "Muscles",
      front: `${m.name}\nOrigin, Insertion, and Nerve?`,
      back: `Origin: ${m.origin}\nInsertion: ${m.insertion}\nNerve: ${m.nerve}`,
    });
  });

  mnemonics.forEach((mn) => {
    cards.push({
      id: `mn-${mn.id}`,
      deck: "Mnemonics",
      front: `What does this mnemonic represent?\n"${mn.mnemonic}"`,
      back: `${mn.fullForm}\n\nCategory: ${mn.category}`,
    });
  });

  return cards;
}

const ALL_CARDS = buildCards();
const DECKS = ["All", ...Array.from(new Set(ALL_CARDS.map((c) => c.deck)))];

export default function FlashcardMode() {
  const [deck, setDeck] = useState("All");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [review, setReview] = useState(new Set());

  const cards = useMemo(
    () => (deck === "All" ? ALL_CARDS : ALL_CARDS.filter((c) => c.deck === deck)),
    [deck]
  );

  const card = cards[index];
  const total = cards.length;
  const progress = Math.round(((known.size + review.size) / total) * 100);

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % total), 150);
  };
  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i - 1 + total) % total), 150);
  };
  const markKnown = () => {
    setKnown((s) => new Set([...s, card.id]));
    setReview((s) => { const n = new Set(s); n.delete(card.id); return n; });
    next();
  };
  const markReview = () => {
    setReview((s) => new Set([...s, card.id]));
    setKnown((s) => { const n = new Set(s); n.delete(card.id); return n; });
    next();
  };
  const reset = () => {
    setKnown(new Set());
    setReview(new Set());
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="flashcard-view">
      <div className="view-header">
        <h1 className="view-title">Flashcards <span className="cn-count">{total} cards</span></h1>
        <p className="view-sub">Click the card to reveal the answer. Mark known or for review.</p>
        <div className="filter-bar">
          {DECKS.map((d) => (
            <button
              key={d}
              className={`filter-btn ${deck === d ? "active" : ""}`}
              onClick={() => { setDeck(d); setIndex(0); setFlipped(false); }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="fc-progress-bar">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="fc-stats">
        <span className="fc-stat known">✓ Known: {known.size}</span>
        <span className="fc-stat review">↩ Review: {review.size}</span>
        <span className="fc-stat total">Card {index + 1} / {total}</span>
        <button className="fc-reset" onClick={reset}>Reset</button>
      </div>

      <div className="fc-stage">
        <button className="fc-nav" onClick={prev}>‹</button>

        <div
          className={`flashcard ${flipped ? "flipped" : ""} ${known.has(card?.id) ? "is-known" : ""} ${review.has(card?.id) ? "is-review" : ""}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="fc-deck-tag">{card?.deck}</div>
              <div className="fc-question">{card?.front}</div>
              <div className="fc-hint">Click to reveal</div>
            </div>
            <div className="flashcard-back">
              <div className="fc-deck-tag">{card?.deck}</div>
              <div className="fc-answer">{card?.back}</div>
            </div>
          </div>
        </div>

        <button className="fc-nav" onClick={next}>›</button>
      </div>

      {flipped && (
        <div className="fc-actions">
          <button className="fc-btn review-btn" onClick={markReview}>↩ Need Review</button>
          <button className="fc-btn next-btn" onClick={next}>Skip →</button>
          <button className="fc-btn known-btn" onClick={markKnown}>✓ Got It</button>
        </div>
      )}
    </div>
  );
}
