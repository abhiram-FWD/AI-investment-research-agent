export default function CompetitorsSection({ competitors }) {
  if (!competitors) return null;

  const items = competitors.summarySnippets || [];
  const unavailable = competitors.available === false;

  return (
    <div className="card">
      <h3 className="list-section-header">Competitors</h3>
      {unavailable || items.length === 0 ? (
        <p className="fallback-text">
          {unavailable && competitors.reason ? competitors.reason : "No competitors found."}
        </p>
      ) : (
        <div className="list-items">
          {items.map((item, i) => (
            <div key={i} className="list-item">
              <div className="list-item-header">
                <a href={item.url} target="_blank" rel="noreferrer" className="list-item-title">
                  {item.title}
                </a>
              </div>
              <p className="list-item-snippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
