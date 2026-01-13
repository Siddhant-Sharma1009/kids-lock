/**
 * FIXED KEYBOARD → ACTIVITY MAP
 * ----------------------------------
 * Only these keys open activities.
 * ALL OTHER KEYS are treated as:
 *   → background color + fun message
 *
 * NO randomness
 * NO toggling
 * NO side effects
 */

const keyboardMap = {
  // Core activities
  b: "BUBBLE_GAME",
  c: "COLOR_SPLASH",
  i: "ILLUSION",
  s: "SOUND_BOARD",
  m: "MOTION_PLAY",

  // Extended activities
  l: "LIGHT_TRAILS",
  p: "PATTERN_FLOW",
  g: "SHAPE_TAP_GAME",
  w: "WAVY_MIRROR",
  r: "RAINBOW_RAIN",

  // New Set–2 activities
  d: "DANCING_DOTS",
  f: "FLOATING_SHAPES",
  t: "TWINKLING_STARS",
  h: "HAPPY_FACES",

  o: "ORBITING_PLANETS",
  k: "KALEIDOSCOPE",
  x: "XYLOPHONE",
  c: "COLOR_BLOCKS",
  z: "ZOOMING_LINES",

  // Number keys
"1": "BUBBLE_GAME",
"2": "RAINBOW_RAIN",
"3": "DANCING_DOTS",
"4": "TWINKLING_STARS",
"5": "FLOATING_SHAPES",
"6": "COLOR_BLOCKS",
"7": "SHAPE_TAP_GAME",
"8": "LIGHT_TRAILS",
"9": "MOTION_PLAY",
"0": "KALEIDOSCOPE",

// Special characters
"!": "FIREWORKS",
"@": "EMOJI_RAIN",
"#": "PIXEL_WAVES",
"$": "COIN_CATCH",
"%": "CONFETTI_STORM",
"&": "FIREWORKS",
"(": "EMOJI_RAIN",
"_": "PIXEL_WAVES",
"-": "COIN_CATCH",
"=": "CONFETTI_STORM",
"*": "BUBBLE_GAME",
"/": "RAINBOW_RAIN",
" ": "DANCING_DOTS",
"?": "TWINKLING_STARS",
"5": "FLOATING_SHAPES",
".": "COLOR_BLOCKS",
"<": "SHAPE_TAP_GAME",
">": "LIGHT_TRAILS",
";": "MOTION_PLAY",
"'": "KALEIDOSCOPE",

Enter: "FIREWORKS",
Escape: "EMOJI_RAIN",
Backspace: "PIXEL_WAVES",
Tab: "COIN_CATCH",

ArrowDown: "CONFETTI_STORM",
ArrowLeft: "FIREWORKS",
ArrowRight: "EMOJI_RAIN",
ArrowUp: "PIXEL_WAVES",
Shift: "COIN_CATCH",
Tab: "CONFETTI_STORM",
Alt: "BUBBLE_GAME",
CapsLock: "RAINBOW_RAIN",

  /* ================= FUNCTION KEYS ================= */
 
  F1: "BUBBLE_GAME",
  F2: "RAINBOW_RAIN",
  F3: "DANCING_DOTS",
  F4: "TWINKLING_STARS",
  F5: "FLOATING_SHAPES",
  F6: "COLOR_BLOCKS",
  F7: "SHAPE_TAP_GAME",
  F8: "LIGHT_TRAILS",
  F9: "LIGHT_TRAILS",
  F10: "MOTION_PLAY",
  F11: "KALEIDOSCOPE",
  F12: "RAINBOW_RAIN",

};

export default keyboardMap;
