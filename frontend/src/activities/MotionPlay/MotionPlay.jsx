import { useEffect, useState } from "react";
import "./motion.css";

export default function MotionPlay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItem = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          type: Math.random() > 0.7 ? "heart" : "dot", // 30% hearts
        };

        return prev.length > 35 ? prev.slice(1).concat(newItem) : [...prev, newItem];
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="motion-area">
      {items.map((item) => (
        <div
          key={item.id}
          className={item.type}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
        />
      ))}
    </div>
  );
}
