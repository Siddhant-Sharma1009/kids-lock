import { useState } from "react";
import "./shapeTap.css";

function createShape() {
  return {
    id: Math.random(),
    size: Math.random() * 50 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    depth: Math.random(),
    hue: Math.random() * 360,
    rotate: Math.random() * 360,
    duration: Math.random() * 20 + 20,
    type: Math.floor(Math.random() * 3),
  };
}

export default function ShapeTap() {
  const [shapes] = useState(() => Array.from({ length: 28 }, createShape));

  return (
    <div className="cosmic-space">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`cosmic-shape type-${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: `hsl(${shape.hue}, 80%, 65%)`,
            animationDuration: `${shape.duration}s`,
            transform: `rotate(${shape.rotate}deg) scale(${0.6 + shape.depth})`,
            filter: `blur(${(1 - shape.depth) * 1.5}px)`,
          }}
        />
      ))}
    </div>
  );
}
