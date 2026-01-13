import { useEffect, useState } from "react";
import "./colorBlocks.css";

export default function ColorBlocks() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80,
          y: Math.random() * 80,
          color: `hsl(${Math.random() * 360},80%,60%)`,
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const remove = (id) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="blocks-area">
      {blocks.map((b) => (
        <div
          key={b.id}
          className="block"
          style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.color }}
          onClick={() => remove(b.id)}
          onTouchStart={() => remove(b.id)}
        />
      ))}
    </div>
  );
}
