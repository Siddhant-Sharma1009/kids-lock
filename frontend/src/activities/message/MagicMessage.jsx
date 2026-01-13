const messages = [
  "✨ You are amazing!",
  "🌈 Keep smiling!",
  "🚀 You are a star!",
  "🎈 Fun is everywhere!",
  "🦄 Magic time!",
];

export default function MagicMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div style={style}>
      {msg}
    </div>
  );
}

const style = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  color: "white",
  textShadow: "0 0 10px black",
};
