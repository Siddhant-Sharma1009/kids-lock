import { useEffect, useState } from "react";
import "./zoomingLines.css";

/**
 * Kaleidoscope Tiles
 * - Symmetric geometric patterns
 * - Rich color cycling
 * - Calm, premium feel
 */
export default function ZoomingLines() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="kaleido-space">
      <div
        className="kaleido-grid"
        style={{ filter: `hue-rotate(${hue}deg)` }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="tile" />
        ))}
      </div>
    </div>
  );
}
