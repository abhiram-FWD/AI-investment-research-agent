export default function ResearchTrace({ trace }) {
  if (!trace || trace.length === 0) return null;

  return (
    <div className="card">
      <h4>Reasoning trace</h4>
      {trace.map((step, i) => (
        <div className="trace-step" key={i}>
          {i + 1}. {step}
        </div>
      ))}
    </div>
  );
}
