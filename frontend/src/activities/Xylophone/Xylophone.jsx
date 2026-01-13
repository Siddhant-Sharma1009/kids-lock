import "./xylophone.css";

const sounds = [
  "https://www.soundjay.com/buttons/sounds/button-1.mp3",
  "https://www.soundjay.com/buttons/sounds/button-2.mp3",
  "https://www.soundjay.com/buttons/sounds/button-3.mp3",
  "https://www.soundjay.com/buttons/sounds/button-4.mp3",
];

export default function Xylophone() {
  const play = (src) => {
    const audio = new Audio(src);
    audio.currentTime = 0; // allows rapid replay
    audio.play();
  };

  return (
    <div className="xylophone">
      {sounds.map((s, i) => (
        <button
          key={i}
          className={`bar bar-${i}`}
          onClick={() => play(s)}
          onTouchStart={() => play(s)}
          aria-label={`Xylophone key ${i + 1}`}
        />
      ))}
    </div>
  );
}
