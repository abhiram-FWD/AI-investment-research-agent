export default function NewsSection({ news }) {
  if (!news) return null;

  const isList = Array.isArray(news);
  const items = isList ? news : [];
  const unavailable = !isList && news.available === false;

  return (
    <div className="card">
      <h3 className="list-section-header">Recent News</h3>
      {unavailable || items.length === 0 ? (
        <p className="fallback-text">
          {unavailable && news.reason ? news.reason : "No recent news found."}
        </p>
      ) : (
        <div className="list-items">
          {items.map((item, i) => (
            <div key={i} className="list-item">
              <div className="list-item-header">
                <a href={item.url} target="_blank" rel="noreferrer" className="list-item-title">
                  {item.title}
                </a>
                <div className="news-meta">
                  {item.publishedDate && <span className="news-date">{item.publishedDate}</span>}
                  {item.sentiment && (
                    <span className={`sentiment-badge sentiment-${item.sentiment.toLowerCase()}`}>
                      {item.sentiment}
                    </span>
                  )}
                </div>
              </div>
              <p className="list-item-snippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
