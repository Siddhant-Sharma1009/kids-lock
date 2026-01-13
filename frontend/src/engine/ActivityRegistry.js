/**
 * CENTRAL ACTIVITY REGISTRY
 * ----------------------------------
 * This file is the SINGLE SOURCE OF TRUTH
 * for all playable games / illusions.
 *
 * Only activities listed here can ever render.
 * Anything else is blocked automatically.
 */

// Existing activities
import BubbleGame from "../activities/BubbleGame/BubbleGame";
import ColorSplash from "../activities/ColorSplash/ColorSplash";
import Illusion from "../activities/Illusion/Illusion";
import SoundBoard from "../activities/SoundBoard/SoundBoard";
import MotionPlay from "../activities/MotionPlay/MotionPlay";

// Previously added activities
import LightTrails from "../activities/LightTrails/LightTrails";
import PatternFlow from "../activities/PatternFlow/PatternFlow";
import ShapeTap from "../activities/ShapeTap/ShapeTap";
import WavyMirror from "../activities/WavyMirror/WavyMirror";
import RainbowRain from "../activities/RainbowRain/RainbowRain";

// Newly added activities (Set–2)
import DancingDots from "../activities/DancingDots/DancingDots";
import FloatingShapes from "../activities/FloatingShapes/FloatingShapes";
import TwinklingStars from "../activities/TwinklingStars/TwinklingStars";
import HappyFaces from "../activities/HappyFaces/HappyFaces";

import OrbitingPlanets from "../activities/OrbitingPlanets/OrbitingPlanets";
import Kaleidoscope from "../activities/Kaleidoscope/Kaleidoscope";
import Xylophone from "../activities/Xylophone/Xylophone";
import ColorBlocks from "../activities/ColorBlocks/ColorBlocks";
import ZoomingLines from "../activities/ZoomingLines/ZoomingLines";

import Fireworks from "../activities/Fireworks/Fireworks";
import EmojiRain from "../activities/EmojiRain/EmojiRain";
import PixelWaves from "../activities/PixelWaves/PixelWaves";
import CoinCatch from "../activities/CoinCatch/CoinCatch";
import ConfettiStorm from "../activities/ConfettiStorm/ConfettiStorm";
const ActivityRegistry = {
  // Core set
  BUBBLE_GAME: {
    component: BubbleGame,
    label: "Bubble Game",
  },

  COLOR_SPLASH: {
    component: ColorSplash,
    label: "Color Splash",
  },

  ILLUSION: {
    component: Illusion,
    label: "Illusion Lines",
  },

  SOUND_BOARD: {
    component: SoundBoard,
    label: "Sound Board",
  },

  MOTION_PLAY: {
    component: MotionPlay,
    label: "Motion Play",
  },

  // Extended illusions & games
  LIGHT_TRAILS: {
    component: LightTrails,
    label: "Light Trails",
  },

  PATTERN_FLOW: {
    component: PatternFlow,
    label: "Pattern Flow",
  },

  SHAPE_TAP_GAME: {
    component: ShapeTap,
    label: "Shape Tap Game",
  },

  WAVY_MIRROR: {
    component: WavyMirror,
    label: "Wavy Mirror",
  },

  RAINBOW_RAIN: {
    component: RainbowRain,
    label: "Rainbow Rain",
  },

  // New Set–2
  DANCING_DOTS: {
    component: DancingDots,
    label: "Dancing Dots",
  },

  FLOATING_SHAPES: {
    component: FloatingShapes,
    label: "Floating Shapes",
  },

  TWINKLING_STARS: {
    component: TwinklingStars,
    label: "Twinkling Stars",
  },

  HAPPY_FACES: {
    component: HappyFaces,
    label: "Happy Faces Pop",
  },
  ORBITING_PLANETS: { component: OrbitingPlanets },
KALEIDOSCOPE: { component: Kaleidoscope },
XYLOPHONE: { component: Xylophone },
COLOR_BLOCKS: { component: ColorBlocks },
ZOOMING_LINES: { component: ZoomingLines },

FIREWORKS: { component: Fireworks },
EMOJI_RAIN: { component: EmojiRain },
PIXEL_WAVES: { component: PixelWaves },
COIN_CATCH: { component: CoinCatch },
CONFETTI_STORM: { component: ConfettiStorm },
};

export default ActivityRegistry;
