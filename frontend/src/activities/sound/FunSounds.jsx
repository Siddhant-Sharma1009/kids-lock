export default function FunSounds() {
  const sounds = [
    "/sounds/pop.mp3",
    "/sounds/chime.mp3",
    "/sounds/bell.mp3",
  ];

  const audio = new Audio(
    sounds[Math.floor(Math.random() * sounds.length)]
  );
  audio.play();

  return (
    <h2 style={{ color: "white", textAlign: "center" }}>
      🎵 Fun Sound!
    </h2>
  );
}
