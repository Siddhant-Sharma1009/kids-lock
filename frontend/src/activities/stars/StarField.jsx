import { useEffect } from "react";

export default function StarField() {
  useEffect(() => {
    document.body.style.background =
      "radial-gradient(circle at center, #000020, #000000)";
  }, []);

  return (
    <div style={styles.container}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} style={styles.star} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
  },
  star: {
    width: "2px",
    height: "2px",
    background: "white",
    position: "absolute",
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: "twinkle 2s infinite alternate",
  },
};
