import { useEffect } from "react";
import zoneActionMap from "../utils/zoneActionMap";

const useTouchZones = (setActiveActivity) => {
  useEffect(() => {
    const handleTouch = (e) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (x < w / 2 && y < h / 2) zoneActionMap.topLeft(setActiveActivity);
      else if (x >= w / 2 && y < h / 2) zoneActionMap.topRight(setActiveActivity);
      else if (x < w / 2 && y >= h / 2)
        zoneActionMap.bottomLeft(setActiveActivity);
      else zoneActionMap.bottomRight(setActiveActivity);
    };

    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("click", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (x < w / 2 && y < h / 2) zoneActionMap.topLeft(setActiveActivity);
      else if (x >= w / 2 && y < h / 2)
        zoneActionMap.topRight(setActiveActivity);
      else if (x < w / 2 && y >= h / 2)
        zoneActionMap.bottomLeft(setActiveActivity);
      else zoneActionMap.bottomRight(setActiveActivity);
    });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [setActiveActivity]);
};

export default useTouchZones;
