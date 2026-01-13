import "./patternFlow.css";

export default function PatternFlow() {
  return (
    <div className="pattern-flow">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="pattern-tile" />
      ))}
    </div>
  );
}
