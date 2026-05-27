import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CranialNervesView from "./components/CranialNervesView";
import MusclesView from "./components/MusclesView";
import FlashcardMode from "./components/FlashcardMode";
import QuizMode from "./components/QuizMode";
import MnemonicsView from "./components/MnemonicsView";
import SearchView from "./components/SearchView";
import "./styles/index.css";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":      return <Dashboard onNavigate={setActiveView} />;
      case "cranial-nerves": return <CranialNervesView />;
      case "muscles":        return <MusclesView />;
      case "flashcards":     return <FlashcardMode />;
      case "quiz":           return <QuizMode />;
      case "mnemonics":      return <MnemonicsView />;
      case "search":         return <SearchView />;
      default:               return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="main-content">
        <div className="view-container">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
