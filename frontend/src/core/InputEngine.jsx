import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import useKeyboardListener from "../input/useKeyboardListener";
import useTouchListener from "../input/useTouchListener";

/**
 * InputEngine
 * - Listens to keyboard & touch
 * - Works ONLY in CHILD mode
 */
export default function InputEngine() {
  const { appStage, setActiveActivity } = useContext(AppContext);

  // 🔑 Keyboard → game / illusion
  const handleActivity = (activityName) => {
    setActiveActivity(activityName);
  };

  // 🎨 Touch / unused keys → background
  const handleBackground = () => {
    document.body.style.backgroundColor =
      `hsl(${Math.random() * 360}, 80%, 70%)`;
  };

  // Listeners already check appStage === "CHILD"
  useKeyboardListener(handleActivity, handleBackground);
  useTouchListener(handleBackground);

  return null; // Engine only, no UI
}
