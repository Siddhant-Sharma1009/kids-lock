import { useEffect, useState } from "react";
import "./wavyMirror.css";

/**
 * Star Tunnel Illusion
 * - Forward motion depth effect
 * - Calm, smooth, premium look
 * - Child-safe & performance-friendly
 */
export default function WavyMirror() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStar = () => ({
      id: Math.random(),
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
    });

    setStars(Array.from({ length: 140 }, createStar));

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => {
          let z = s.z - 1.2;
          if (z <= 0) {
            return createStar();
          }
          return { ...s, z };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="star-tunnel">
      {stars.map((s) => {
        const scale = 100 / s.z;
        const x = s.x * scale;
        const y = s.y * scale;

        return (
          <div
            key={s.id}
            className="star"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity: Math.min(scale / 4, 1),
              width: s.size,
              height: s.size,
            }}
          />
        );
      })}
    </div>
  );
}
