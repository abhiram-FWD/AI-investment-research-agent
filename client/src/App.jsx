import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import VerdictCard from "./components/VerdictCard.jsx";
import ResearchTrace from "./components/ResearchTrace.jsx";
import LandingPage from "./components/LandingPage.jsx";

const API_BASE = "http://localhost:5000";

const DEMO_DATA = {
  Tesla: {
    resolvedEntity: { name: "Tesla, Inc.", ticker: "TSLA" },
    verdict: {
      verdict: "INVEST",
      confidence: 0.75,
      reasoning:
        "[DEMO DATA] Tesla maintains a strong moat with Superchargers and OTA updates. Valuation remains high but is supported by energy sector growth and resilient margins.",
      scoreBreakdown: { growth: 7, valuation: 5, risk: 6, moat: 8 },
    },
    reasoningTrace: [
      '[DEMO] Started research on "Tesla".',
      "[DEMO] Resolved entity to Tesla, Inc. (TSLA).",
      "[DEMO] Financials: Stable margins, strong cash flow.",
      "[DEMO] Synthesized research findings.",
      "[DEMO] Final verdict: INVEST (confidence 0.75).",
    ],
  },
  WeWork: {
    resolvedEntity: { name: "WeWork Inc.", ticker: "WE" },
    verdict: {
      verdict: "PASS",
      confidence: 0.85,
      reasoning:
        "[DEMO DATA] Fundamentally flawed business model with extreme debt and negative free cash flow. Moat is non-existent.",
      scoreBreakdown: { growth: 1, valuation: 2, risk: 1, moat: 1 },
    },
    reasoningTrace: [
      '[DEMO] Started research on "WeWork".',
      "[DEMO] Resolved entity to WeWork Inc.",
      "[DEMO] Financials: Heavy losses, mounting debt.",
      "[DEMO] Synthesized research findings.",
      "[DEMO] Final verdict: PASS (confidence 0.85).",
    ],
  },
};

export default function App() {
  const [view, setView] = useState("landing"); // 'landing', 'demo', 'app'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSearch(companyName) {
    if (view === "demo") {
      setLoading(true);
      setError(null);
      setResult(null);
      setTimeout(() => {
        const query = Object.keys(DEMO_DATA).find((k) =>
          companyName.toLowerCase().includes(k.toLowerCase()),
        );
        setResult(query ? DEMO_DATA[query] : DEMO_DATA["Tesla"]);
        setLoading(false);
      }, 1000);
      return;
    }

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
    return (
      <LandingPage
        onEnter={() => setView("app")}
        onDemo={() => setView("demo")}
      />
    );
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

      <h1>
        {view === "demo" ? "Alpha Invest AI (Demo Mode)" : "Alpha Invest AI"}
      </h1>
      {view === "demo" && (
        <p
          style={{
            color: "#9ca3af",
            marginBottom: "1.5rem",
            marginTop: "-1rem",
          }}
        >
          Demo Mode: Try searching for "Tesla" or "WeWork".
        </p>
      )}

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <div className="card verdict-pass">Error: {error}</div>}

      {result && (
        <>
          <VerdictCard
            verdict={result.verdict}
            resolvedEntity={result.resolvedEntity}
          />
          <ResearchTrace trace={result.reasoningTrace} />
        </>
      )}
    </div>
  );
}
