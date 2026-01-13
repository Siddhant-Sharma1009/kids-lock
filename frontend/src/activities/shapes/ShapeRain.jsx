import { useEffect, useState } from "react";
import "./shapeRain.css";

/**
 * Cosmic Shapes
 * - Floating glowing shapes in space
 * - Slow drift + rotation
 * - Calm, premium cosmic feel
 */
export default function ShapeRain() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const createShape = () => ({
      id: Math.random(),
      size: Math.random() * 50 + 30,
      x: Math.random() * 100,
      y: Math.random() * 100,
      depth: Math.random(),
      hue: Math.random() * 360,
      rotate: Math.random() * 360,
      duration: Math.random() * 20 + 20,
      type: Math.floor(Math.random() * 3), // 0 circle, 1 diamond, 2 hex
    });

    setShapes(Array.from({ length: 28 }, createShape));
  }, []);

  return (
    <div className="cosmic-space">
      {shapes.map((s) => (
        <div
          key={s.id}
          className={`cosmic-shape type-${s.type}`}
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: `hsl(${s.hue}, 80%, 65%)`,
            animationDuration: `${s.duration}s`,
            transform: `rotate(${s.rotate}deg) scale(${0.6 + s.depth})`,
            filter: `blur(${(1 - s.depth) * 1.5}px)`,
          }}
        />
      ))}
    </div>
  );
}
