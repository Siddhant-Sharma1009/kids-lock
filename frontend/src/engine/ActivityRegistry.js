import BubbleGame from "../activities/BubbleGame/BubbleGame";
import CoinCatch from "../activities/CoinCatch/CoinCatch";
import ColorBlocks from "../activities/ColorBlocks/ColorBlocks";
import ColorSplash from "../activities/ColorSplash/ColorSplash";
import ConfettiStorm from "../activities/ConfettiStorm/ConfettiStorm";
import DancingDots from "../activities/DancingDots/DancingDots";
import EmojiRain from "../activities/EmojiRain/EmojiRain";
import Fireworks from "../activities/Fireworks/Fireworks";
import FloatingShapes from "../activities/FloatingShapes/FloatingShapes";
import HappyFaces from "../activities/HappyFaces/HappyFaces";
import Illusion from "../activities/Illusion/Illusion";
import Kaleidoscope from "../activities/Kaleidoscope/Kaleidoscope";
import LightTrails from "../activities/LightTrails/LightTrails";
import MotionPlay from "../activities/MotionPlay/MotionPlay";
import OrbitingPlanets from "../activities/OrbitingPlanets/OrbitingPlanets";
import PatternFlow from "../activities/PatternFlow/PatternFlow";
import PixelWaves from "../activities/PixelWaves/PixelWaves";
import RainbowRain from "../activities/RainbowRain/RainbowRain";
import ShapeTap from "../activities/ShapeTap/ShapeTap";
import SoundBoard from "../activities/SoundBoard/SoundBoard";
import TwinklingStars from "../activities/TwinklingStars/TwinklingStars";
import WavyMirror from "../activities/WavyMirror/WavyMirror";
import Xylophone from "../activities/Xylophone/Xylophone";
import ZoomingLines from "../activities/ZoomingLines/ZoomingLines";

const ActivityRegistry = {
  BUBBLE_GAME: { component: BubbleGame, label: "Bubble Game" },
  COLOR_SPLASH: { component: ColorSplash, label: "Color Splash" },
  ILLUSION: { component: Illusion, label: "Illusion Lines" },
  SOUND_BOARD: { component: SoundBoard, label: "Sound Board" },
  MOTION_PLAY: { component: MotionPlay, label: "Motion Play" },
  LIGHT_TRAILS: { component: LightTrails, label: "Light Trails" },
  PATTERN_FLOW: { component: PatternFlow, label: "Pattern Flow" },
  SHAPE_TAP_GAME: { component: ShapeTap, label: "Shape Tap" },
  WAVY_MIRROR: { component: WavyMirror, label: "Wavy Mirror" },
  RAINBOW_RAIN: { component: RainbowRain, label: "Rainbow Rain" },
  DANCING_DOTS: { component: DancingDots, label: "Dancing Dots" },
  FLOATING_SHAPES: { component: FloatingShapes, label: "Floating Shapes" },
  TWINKLING_STARS: { component: TwinklingStars, label: "Twinkling Stars" },
  HAPPY_FACES: { component: HappyFaces, label: "Happy Faces" },
  ORBITING_PLANETS: { component: OrbitingPlanets, label: "Orbiting Planets" },
  KALEIDOSCOPE: { component: Kaleidoscope, label: "Kaleidoscope" },
  XYLOPHONE: { component: Xylophone, label: "Xylophone" },
  COLOR_BLOCKS: { component: ColorBlocks, label: "Color Blocks" },
  ZOOMING_LINES: { component: ZoomingLines, label: "Zooming Lines" },
  FIREWORKS: { component: Fireworks, label: "Fireworks" },
  EMOJI_RAIN: { component: EmojiRain, label: "Emoji Rain" },
  PIXEL_WAVES: { component: PixelWaves, label: "Pixel Waves" },
  COIN_CATCH: { component: CoinCatch, label: "Coin Catch" },
  CONFETTI_STORM: { component: ConfettiStorm, label: "Confetti Storm" },
};

export default ActivityRegistry;
