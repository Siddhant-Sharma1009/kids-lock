import "./kaleidoscope.css";

export default function Kaleidoscope() {
  return (
    <div className="kaleido-wrapper">
      <div className="kaleido">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="slice"
            style={{ "--i": i }}
          />
        ))}
      </div>
    </div>
  );
}
