import { useEffect, useState } from "react";
import "./twinklingStars.css";

export default function TwinklingStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) =>
        prev.length > 80
          ? prev.slice(1)
          : [
              ...prev,
              {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
              },
            ]
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stars-area">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  );
}
