import "./illusion.css";

export default function Illusion() {
  return (
    <div className="illusion-container">
      <div className="grid horizontal">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>

      <div className="grid vertical">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
}
