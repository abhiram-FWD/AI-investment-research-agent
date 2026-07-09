export default function BullBearCard({ thesis }) {
  if (!thesis) return null;

  return (
    <div className="card">
      <p style={{ margin: "0 0 1rem 0" }}>{thesis.summary}</p>
      
      <div className="bull-bear-cols">
        <div className="bull-col">
          <h4>Bull Case</h4>
          <ul>
            {thesis.bullCase?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="bear-col">
          <h4>Bear Case</h4>
          <ul>
            {thesis.bearCase?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {thesis.keyRisks && thesis.keyRisks.length > 0 && (
        <div className="key-risks">
          {thesis.keyRisks.map((risk, i) => (
            <span key={i} className="risk-pill">{risk}</span>
          ))}
        </div>
      )}
    </div>
  );
}
