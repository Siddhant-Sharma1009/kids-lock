import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import touchZoneMap from "./touchZoneMap";

function getTouchZone({ xRatio, yRatio }) {
  const isCenter = xRatio > 0.35 && xRatio < 0.65 && yRatio > 0.35 && yRatio < 0.65;
  if (isCenter) return "CENTER";

  if (xRatio < 0.5 && yRatio < 0.5) return "TOP_LEFT";
  if (xRatio >= 0.5 && yRatio < 0.5) return "TOP_RIGHT";
  if (xRatio < 0.5 && yRatio >= 0.5) return "BOTTOM_LEFT";
  return "BOTTOM_RIGHT";
}

export default function useTouchListener(onBackground, onActivity) {
  const { appStage } = useContext(AppContext);

  useEffect(() => {
    const handler = (event) => {
      if (appStage !== "CHILD") return;

      const touch = event.touches?.[0];
      if (!touch) return;

      const xRatio = touch.clientX / window.innerWidth;
      const yRatio = touch.clientY / window.innerHeight;
      const zone = getTouchZone({ xRatio, yRatio });
      const activity = touchZoneMap[zone];

      if (activity && onActivity) {
        onActivity(activity);
      }

      onBackground();
    };

    window.addEventListener("touchstart", handler, { passive: true });
    return () => window.removeEventListener("touchstart", handler);
  }, [appStage, onActivity, onBackground]);
}
