import { useEffect, useState } from "react";
import "./wavyMirror.css";

function createStar() {
  return {
    id: Math.random(),
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    z: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
  };
}

export default function WavyMirror() {
  const [stars, setStars] = useState(() =>
    Array.from({ length: 140 }, createStar)
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStars((previousStars) =>
        previousStars.map((star) => {
          const nextDepth = star.z - 1.2;
          if (nextDepth <= 0) return createStar();
          return { ...star, z: nextDepth };
        })
      );
    }, 30);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="star-tunnel">
      {stars.map((star) => {
        const scale = 100 / star.z;
        const x = star.x * scale;
        const y = star.y * scale;

        return (
          <div
            key={star.id}
            className="star"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity: Math.min(scale / 4, 1),
              width: star.size,
              height: star.size,
            }}
          />
        );
      })}
    </div>
  );
}
