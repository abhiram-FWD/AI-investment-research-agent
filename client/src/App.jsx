import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import VerdictCard from "./components/VerdictCard.jsx";
import ResearchTrace from "./components/ResearchTrace.jsx";

const API_BASE = "http://localhost:5000";

export default function App() {
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

  return (
    <div className="container">
      <h1>AI Investment Research Agent</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <div className="card verdict-pass">Error: {error}</div>}

      {result && (
        <>
          <VerdictCard verdict={result.verdict} resolvedEntity={result.resolvedEntity} />
          <ResearchTrace trace={result.reasoningTrace} />
        </>
      )}
    </div>
  );
}
