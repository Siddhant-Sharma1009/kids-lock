import { useEffect } from "react";
import keyActionMap from "../utils/keyActionMap";

const useKeyboardInput = (setActiveActivity) => {
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (keyActionMap[key]) {
        keyActionMap[key](setActiveActivity);
      } else {
        keyActionMap["default"](setActiveActivity);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setActiveActivity]);
};

export default useKeyboardInput;
