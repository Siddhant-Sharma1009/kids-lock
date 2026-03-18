import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import keyboardMap from "./keyboardMap";

function normalizeKey(rawKey) {
  if (!rawKey) return "";
  return rawKey.length === 1 ? rawKey.toLowerCase() : rawKey.toLowerCase();
}

export default function useKeyboardListener(onActivity, onBackground) {
  const { appStage } = useContext(AppContext);

  useEffect(() => {
    const handler = (event) => {
      if (appStage !== "CHILD") return;
      if (event.repeat) return;

      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      const key = normalizeKey(event.key);
      const mappedActivity = keyboardMap[key];

      if (mappedActivity) {
        event.preventDefault();
        onActivity(mappedActivity);
        return;
      }

      onBackground();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [appStage, onActivity, onBackground]);
}
