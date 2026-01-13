import "./pixelWaves.css";

export default function PixelWaves() {
  return (
    <div className="pixel-waves">
      {Array.from({ length: 120 }).map((_, i) => (
        <div key={i} className="pixel" />
      ))}
    </div>
  );
}
