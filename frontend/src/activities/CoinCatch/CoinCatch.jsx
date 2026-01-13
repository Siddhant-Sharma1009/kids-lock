import { useEffect, useState } from "react";
import "./coinCatch.css";

export default function CoinCatch() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 80,
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const collect = (id) =>
    setCoins((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="coin-area">
      {coins.map((c) => (
        <div
          key={c.id}
          className="coin"
          style={{ left: `${c.left}%` }}
          onClick={() => collect(c.id)}
          onTouchStart={() => collect(c.id)}
        >
          💰
        </div>
      ))}
    </div>
  );
}
