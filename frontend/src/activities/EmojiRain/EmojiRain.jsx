import { useEffect, useState } from "react";
import "./emojiRain.css";

const emojis = ["😀", "🎈", "⭐", "🦄", "🍭"];

export default function EmojiRain() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        },
      ]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="emoji-area">
      {drops.map((d) => (
        <div
          key={d.id}
          className="emoji"
          style={{ left: `${d.left}%` }}
        >
          {d.emoji}
        </div>
      ))}
    </div>
  );
}
