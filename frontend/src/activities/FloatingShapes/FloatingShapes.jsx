import { useEffect, useState } from "react";
import "./floatingShapes.css";

export default function FloatingShapes() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 80,
          color: `hsl(${Math.random() * 360},80%,60%)`,
        },
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const remove = (id) =>
    setShapes((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="floating-area">
      {shapes.map((s) => (
        <div
          key={s.id}
          className="float-shape"
          style={{ left: `${s.left}%`, background: s.color }}
          onClick={() => remove(s.id)}
          onTouchStart={() => remove(s.id)}
        />
      ))}
    </div>
  );
}
