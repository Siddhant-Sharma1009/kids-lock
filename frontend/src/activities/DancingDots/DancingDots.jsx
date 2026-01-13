import { useEffect, useState } from "react";
import "./dancingDots.css";

export default function DancingDots() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) =>
        prev.length > 50
          ? prev.slice(1)
          : [
              ...prev,
              {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 6 + Math.random() * 10,
              },
            ]
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dancing-dots">
      {dots.map((d) => (
        <div
          key={d.id}
          className="dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
        />
      ))}
    </div>
  );
}
