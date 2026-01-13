import { useEffect, useState } from "react";
import "./fireworks.css";

export default function Fireworks() {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        },
      ]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fireworks-area">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="spark"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: s.color,
          }}
        />
      ))}
    </div>
  );
}
