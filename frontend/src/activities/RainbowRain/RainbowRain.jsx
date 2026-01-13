import { useEffect, useState } from "react";
import "./rainbowRain.css";

export default function RainbowRain() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) =>
        prev.length > 40
          ? prev.slice(1)
          : [
              ...prev,
              {
                id: Date.now(),
                left: Math.random() * 100,
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
              },
            ]
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rain-area">
      {drops.map((d) => (
        <div
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            backgroundColor: d.color,
          }}
        />
      ))}
    </div>
  );
}
