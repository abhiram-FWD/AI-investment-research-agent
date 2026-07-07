export default function VerdictCard({ verdict, resolvedEntity }) {
  if (!verdict) return null;
  const isInvest = verdict.verdict === "INVEST";

  return (
    <div className="card">
      <h2 className={isInvest ? "verdict-invest" : "verdict-pass"}>
        {resolvedEntity?.name} — {verdict.verdict}
      </h2>
      <p>Confidence: {(verdict.confidence * 100).toFixed(0)}%</p>
      <p>{verdict.reasoning}</p>
      <h4>Score breakdown</h4>
      <ul>
        {Object.entries(verdict.scoreBreakdown || {}).map(([key, val]) => (
          <li key={key}>
            {key}: {val.toFixed(1)} / 10
          </li>
        ))}
      </ul>
    </div>
  );
}
