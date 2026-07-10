import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import VerdictCard from "./components/VerdictCard.jsx";
import BullBearCard from "./components/BullBearCard.jsx";
import NewsSection from "./components/NewsSection.jsx";
import CompetitorsSection from "./components/CompetitorsSection.jsx";
import ResearchTrace from "./components/ResearchTrace.jsx";
import LandingPage from "./components/LandingPage.jsx";

const API_BASE = "https://ai-investment-research-agent-y7ya.onrender.com";

export default function App() {
  const [view, setView] = useState("landing"); // 'landing' or 'app'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSearch(companyName) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/research`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (view === "landing") {
    return <LandingPage onEnter={() => setView("app")} />;
  }

  return (
    <div className="container">
      <button
        onClick={() => {
          setView("landing");
          setResult(null);
          setError(null);
        }}
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          marginBottom: "2rem",
          padding: 0,
          textDecoration: "underline",
          fontSize: "0.9rem",
        }}
      >
        &larr; Back to Home
      </button>

      <h1>Alpha Invest AI</h1>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <div className="card error-banner">Error: {error}</div>}

      {result && (
        <>
          <VerdictCard
            verdict={result.verdict}
            resolvedEntity={result.resolvedEntity}
          />
          <BullBearCard thesis={result.thesis} />
          <NewsSection news={result.news} />
          <CompetitorsSection competitors={result.competitors} />
          <ResearchTrace trace={result.reasoningTrace} />
        </>
      )}
    </div>
  );
}
