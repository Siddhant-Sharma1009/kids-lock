import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import keyboardMap from "./keyboardMap";

/**
 * Global keyboard handler (CHILD MODE)
 * IMPORTANT RULE:
 * - If ANY input / textarea is focused → IGNORE keyboard
 *   (exit password, admin forms, etc.)
 */
export default function useKeyboardListener(
  onActivity,
  onBackground
) {
  const { appStage } = useContext(AppContext);

  useEffect(() => {
    const handler = (e) => {
      // Only active in CHILD mode
      if (appStage !== "CHILD") return;

      // 🔐 CRITICAL FIX:
      // If user is typing in an input, do NOTHING
      const el = document.activeElement;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      ) {
        return;
      }

      if (e.repeat) return;

      const key = e.key.toLowerCase();

      // Activity keys
      if (keyboardMap[key]) {
        e.preventDefault();
        onActivity(keyboardMap[key]);
        return;
      }

      // Other keys → background effect
      if (/^[a-z0-9]$/i.test(key)) {
        onBackground();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [appStage, onActivity, onBackground]);
}
