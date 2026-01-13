import { useEffect, useContext } from "react";
import ExitButton from "../security/ExitButton";
import InputEngine from "./InputEngine";
import ActivityEngine from "../engine/ActivityEngine";
import { AppContext } from "../context/AppContext";

export default function AppShell() {
  const { appStage } = useContext(AppContext);

  // 🔒 Enter fullscreen on first interaction
  useEffect(() => {
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    document.addEventListener("click", enterFullscreen, { once: true });
    document.addEventListener("touchstart", enterFullscreen, { once: true });

    return () => {
      document.removeEventListener("click", enterFullscreen);
      document.removeEventListener("touchstart", enterFullscreen);
    };
  }, []);

  // 🚫 Disable right-click ONLY in CHILD mode
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    if (appStage === "CHILD") {
      document.addEventListener("contextmenu", disableRightClick);
    }

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [appStage]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ❌ Parent-only exit */}
      <ExitButton />

      {/* 🎮 Input handling */}
      <InputEngine />

      {/* 🎨 Games / illusions */}
      <ActivityEngine />
    </div>
  );
}
