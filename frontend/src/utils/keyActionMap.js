const keyActionMap = {
  a: (set) => set("color"),
  s: (set) => set("sound"),
  d: (set) => set("game"),
  f: (set) => set("illusion"),
  default: (set) =>
    set(["color", "sound", "game", "illusion"][Math.floor(Math.random() * 4)]),
};

export default keyActionMap;
