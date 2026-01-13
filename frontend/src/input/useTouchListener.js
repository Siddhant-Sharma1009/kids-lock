import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Touch → background change
 */
export default function useTouchListener(onBackground) {
  const { appStage } = useContext(AppContext);

  useEffect(() => {
    const handler = () => {
      if (appStage !== "CHILD") return;
      onBackground();
    };

    window.addEventListener("touchstart", handler);
    return () => window.removeEventListener("touchstart", handler);
  }, [appStage, onBackground]);
}
