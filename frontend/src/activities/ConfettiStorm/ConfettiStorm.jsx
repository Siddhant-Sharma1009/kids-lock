import { useEffect, useState } from "react";
import "./confettiStorm.css";

export default function ConfettiStorm() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPieces((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          color: `hsl(${Math.random() * 360},80%,60%)`,
        },
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="confetti-area">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{ left: `${p.x}%`, background: p.color }}
        />
      ))}
    </div>
  );
}
