import { useEffect, useState } from "react";
import messages from "./messages";

export default function BackgroundController({ trigger }) {
  const [bg, setBg] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!trigger) return;

    const hue = Math.floor(Math.random() * 360);
    setBg(
      `radial-gradient(circle at center, 
       hsl(${hue}, 80%, 65%), 
       hsl(${(hue + 60) % 360}, 70%, 30%))`
    );

    setMsg(messages[Math.floor(Math.random() * messages.length)]);

    const timer = setTimeout(() => setMsg(""), 1500);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: bg,
        zIndex: -1,
        transition: "background 0.8s ease",
      }}
    >
      {msg && (
        <div
          style={{
            position: "absolute",
            top: "45%",
            width: "100%",
            textAlign: "center",
            fontSize: "3rem",
            color: "white",
            animation: "fadeIn 1.5s",
          }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
