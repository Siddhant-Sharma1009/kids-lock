import { useEffect, useState } from "react";
import "./bubble.css";

export default function BubbleGame() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 90,
          size: 40 + Math.random() * 40,
        },
      ]);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          onClick={() => popBubble(bubble.id)}
          onTouchStart={() => popBubble(bubble.id)}
        />
      ))}
    </div>
  );
}
