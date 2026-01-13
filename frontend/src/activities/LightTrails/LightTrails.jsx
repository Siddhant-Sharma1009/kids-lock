import { useEffect, useState } from "react";
import "./lightTrails.css";

export default function LightTrails() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev.length > 20
          ? prev.slice(1)
          : [
              ...prev,
              {
                id: Date.now(),
                top: Math.random() * 100,
                delay: Math.random() * 2,
              },
            ]
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="light-trails">
      {trails.map((t) => (
        <div
          key={t.id}
          className="trail"
          style={{
            top: `${t.top}%`,
            animationDelay: `${t.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
