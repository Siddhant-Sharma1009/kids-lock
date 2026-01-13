import { useEffect, useState } from "react";
import "./happyFaces.css";

export default function HappyFaces() {
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFaces((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80,
          y: Math.random() * 80,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pop = (id) =>
    setFaces((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="faces-area">
      {faces.map((f) => (
        <div
          key={f.id}
          className="face"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          onClick={() => pop(f.id)}
          onTouchStart={() => pop(f.id)}
        >
          😊
        </div>
      ))}
    </div>
  );
}
