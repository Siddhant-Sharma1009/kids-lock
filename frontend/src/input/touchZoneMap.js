/**
 * Screen divided into 4 fixed zones
 *
 *  ┌───────────────┬───────────────┐
 *  │  TOP LEFT     │  TOP RIGHT    │
 *  │  ILLUSION     │  COLOR        │
 *  ├───────────────┼───────────────┤
 *  │  SOUND        │  BUBBLE GAME  │
 *  │  BOTTOM LEFT  │  BOTTOM RIGHT │
 *  └───────────────┴───────────────┘
 */

const touchZoneMap = {
  TOP_LEFT: "ILLUSION",
  TOP_RIGHT: "COLOR_SPLASH",
  BOTTOM_LEFT: "SOUND_BOARD",
  BOTTOM_RIGHT: "BUBBLE_GAME",
};

export default touchZoneMap;
