import { useRef } from "react";
import "./sound.css";

/**
 * SoundBoard (WAV version)
 * - Uses local .wav files
 * - Touch & click friendly
 * - One sound at a time
 */
export default function SoundBoard() {
  const audioRef = useRef(null);

  const sounds = [
    { name: "Rain", file: "/sounds/rain.wav", color: "#bae6fd" },
    { name: "Fire", file: "/sounds/fire.wav", color: "#fdba74" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fbcfe8" },
    { name: "Beep", file: "/sounds/beep.wav", color: "#fde68a" },
    { name: "Dog", file: "/sounds/dog.wav", color: "#c7d2fe" },
    { name: "Drum", file: "/sounds/drum.wav", color: "#fda4af" },
    { name: "Door Bell", file: "/sounds/doorbell.wav", color: "#93c5fd" },
    { name: "Woosh", file: "/sounds/woosh.wav", color: "#a7f3d0" },
    { name: "Bird", file: "/sounds/bird.wav", color: "#86efac" },
    { name: "Chicken", file: "/sounds/chicken.wav", color: "#fde68a" },
    { name: "beep", file: "/sounds/beep.wav", color: "#ad34fa" },
    { name: "Wolf", file: "/sounds/wolf.wav", color: "#fd348c" },
    { name: "Lion", file: "/sounds/lion.wav", color: "#f368d3" },
    { name: "Horse", file: "/sounds/horse.wav", color: "#ade68a" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fde68a" },
    { name: "Whistel", file: "/sounds/whistel1.wav", color: "#fd988a" },
    { name: "Rain", file: "/sounds/rain.wav", color: "#ad228a" },
    { name: "Clap", file: "/sounds/cow.wav", color: "#fde872" },
    { name: "Rain", file: "/sounds/rain.wav", color: "#bae6fd" },
    { name: "Fire", file: "/sounds/fire.wav", color: "#fdba74" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fbcfe8" },
    { name: "Beep", file: "/sounds/beep.wav", color: "#fde68a" },
    { name: "Dog", file: "/sounds/dog.wav", color: "#c7d2fe" },
    { name: "Drum", file: "/sounds/drum.wav", color: "#fda4af" },
    { name: "Door Bell", file: "/sounds/doorbell.wav", color: "#93c5fd" },
    { name: "Woosh", file: "/sounds/woosh.wav", color: "#a7f3d0" },
    { name: "Bird", file: "/sounds/bird.wav", color: "#86efac" },
    { name: "Chicken", file: "/sounds/chicken.wav", color: "#fde68a" },
    { name: "beep", file: "/sounds/beep.wav", color: "#ad34fa" },
    { name: "Wolf", file: "/sounds/wolf.wav", color: "#fd348c" },
    { name: "Lion", file: "/sounds/lion.wav", color: "#f368d3" },
    { name: "Horse", file: "/sounds/horse.wav", color: "#ade68a" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fde68a" },
    { name: "Whistel", file: "/sounds/whistel1.wav", color: "#fd988a" },
    { name: "Rain", file: "/sounds/rain.wav", color: "#ad228a" },
    { name: "Clap", file: "/sounds/cow.wav", color: "#fde872" },
    { name: "Rain", file: "/sounds/rain.wav", color: "#bae6fd" },
    { name: "Fire", file: "/sounds/fire.wav", color: "#fdba74" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fbcfe8" },
    { name: "Beep", file: "/sounds/beep.wav", color: "#fde68a" },
    { name: "Dog", file: "/sounds/dog.wav", color: "#c7d2fe" },
    { name: "Drum", file: "/sounds/drum.wav", color: "#fda4af" },
    { name: "Door Bell", file: "/sounds/doorbell.wav", color: "#93c5fd" },
    { name: "Woosh", file: "/sounds/woosh.wav", color: "#a7f3d0" },
    { name: "Bird", file: "/sounds/bird.wav", color: "#86efac" },
    { name: "Chicken", file: "/sounds/chicken.wav", color: "#fde68a" },
    { name: "beep", file: "/sounds/beep.wav", color: "#ad34fa" },
    { name: "Wolf", file: "/sounds/wolf.wav", color: "#fd348c" },
    { name: "Lion", file: "/sounds/lion.wav", color: "#f368d3" },
    { name: "Horse", file: "/sounds/horse.wav", color: "#ade68a" },
    { name: "Laugh", file: "/sounds/laugh.wav", color: "#fde68a" },
    { name: "Whistel", file: "/sounds/whistel1.wav", color: "#fd988a" },
    { name: "Rain", file: "/sounds/rain.wav", color: "#ad228a" },
    { name: "Clap", file: "/sounds/cow.wav", color: "#fde872" },
   
  ];

  const playSound = (src) => {
    // Stop previous sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  return (
    <div className="soundboard">
      <h2 className="title">🔊 Sound Board</h2>

      <div className="sound-grid">
        {sounds.map((s, i) => (
          <button
            key={i}
            className="sound-btn"
            style={{ background: s.color }}
            onClick={() => playSound(s.file)}
            onTouchStart={() => playSound(s.file)}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
