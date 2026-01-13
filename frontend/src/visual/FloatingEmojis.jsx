import { useEffect, useState } from "react";
import "./floatingEmojis.css";

const EMOJIS = ["🎈", "⭐", "🌈", "✨", "🎉", "🫧", "💫", "🦄"];

export default function FloatingEmojis({ trigger }) {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const id = Date.now() + Math.random();

    const newEmoji = {
      id,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 90 + 5, // %
      size: Math.random() * 24 + 24, // px
    };

    setEmojis((prev) => [...prev, newEmoji]);

    // remove after animation
    setTimeout(() => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2000);
  }, [trigger]);

  return (
    <div className="floating-emoji-layer">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="floating-emoji"
          style={{
            left: `${e.left}%`,
            fontSize: `${e.size}px`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
