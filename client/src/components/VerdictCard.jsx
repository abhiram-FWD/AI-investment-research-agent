export default function VerdictCard({ verdict, resolvedEntity }) {
  if (!verdict) return null;
  const isInvest = verdict.verdict === "INVEST";
  const verdictColor = isInvest ? "#4ade80" : "#fbbf24"; // green for INVEST, yellow for PASS

  // Calculate overall score (average of growth, valuation, risk, moat)
  const scores = Object.values(verdict.scoreBreakdown || {});
  const overall =
    scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  // Determine risk label
  const riskScore = verdict.scoreBreakdown?.risk || 0;
  let riskLevel = "High Risk";
  let riskClass = "risk-high";
  if (riskScore >= 7) {
    riskLevel = "Low Risk";
    riskClass = "risk-low";
  } else if (riskScore >= 4) {
    riskLevel = "Moderate Risk";
    riskClass = "risk-mod";
  }

  return (
    <div className="card">
      <h2 style={{ color: verdictColor }}>
        {resolvedEntity?.name} — {verdict.verdict}
        <span className={`risk-label ${riskClass}`}>{riskLevel}</span>
      </h2>
      <p>Confidence: {(verdict.confidence * 100).toFixed(0)}%</p>
      <p>{verdict.reasoning}</p>

      <div className="score-heading-row">
        <h4>Score breakdown</h4>
        <span className="score-overall">Overall: {overall.toFixed(1)}/10</span>
      </div>

      <div className="score-bars">
        {Object.entries(verdict.scoreBreakdown || {}).map(([key, val]) => (
          <div key={key} className="progress-bar-container">
            <span className="progress-label">{key}</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${val * 10}%`, background: verdictColor }}
              />
            </div>
            <span className="progress-value">{Number(val).toFixed(1)}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}
