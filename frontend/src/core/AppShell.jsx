import { useContext, useEffect, useMemo, useState } from "react";
import ActivityRegistry from "../engine/ActivityRegistry";
import { AppContext } from "../context/AppContext";
import ActivityEngine from "../engine/ActivityEngine";
import InputEngine from "./InputEngine";
import ExitButton from "../features/security/ExitButton";
import "./app-shell.css";

const RANDOM_ACTIVITY_POOL = [
  "BUBBLE_GAME",
  "RAINBOW_RAIN",
  "TWINKLING_STARS",
  "CONFETTI_STORM",
  "KALEIDOSCOPE",
];

function formatTimer(seconds) {
  if (seconds === null || seconds === undefined) return "Unlimited";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function AppShell() {
  const {
    appStage,
    setAppStage,
    activeActivity,
    setActiveActivity,
    parentSettings,
    recordActivityLaunch,
  } = useContext(AppContext);

  const [remainingSeconds, setRemainingSeconds] = useState(null);

  useEffect(() => {
    if (appStage !== "CHILD") return;

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
  }, [appStage]);

  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();

    if (appStage === "CHILD") {
      document.addEventListener("contextmenu", disableRightClick);
    }

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [appStage]);

  useEffect(() => {
    if (appStage !== "CHILD") return;

    const quickStart = parentSettings.quickStartActivity;
    if (!quickStart || quickStart === "NONE") return;

    if (quickStart === "RANDOM") {
      const next =
        RANDOM_ACTIVITY_POOL[
          Math.floor(Math.random() * RANDOM_ACTIVITY_POOL.length)
        ];
      setActiveActivity(next);
      recordActivityLaunch(next);
      return;
    }

    if (ActivityRegistry[quickStart]) {
      setActiveActivity(quickStart);
      recordActivityLaunch(quickStart);
    }
  }, [
    appStage,
    parentSettings.quickStartActivity,
    recordActivityLaunch,
    setActiveActivity,
  ]);

  useEffect(() => {
    if (appStage !== "CHILD") return;

    const limitMinutes = Number(parentSettings.sessionLimitMinutes) || 0;
    if (limitMinutes <= 0) {
      const resetTimer = window.setTimeout(() => {
        setRemainingSeconds(null);
      }, 0);

      return () => window.clearTimeout(resetTimer);
    }

    let remaining = limitMinutes * 60;
    const initialUpdate = window.setTimeout(() => {
      setRemainingSeconds(remaining);
    }, 0);

    const timer = window.setInterval(() => {
      remaining -= 1;

      if (remaining <= 0) {
        window.clearInterval(timer);
        setRemainingSeconds(0);
        setAppStage("DASHBOARD");
        return;
      }

      setRemainingSeconds(remaining);
    }, 1000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(timer);
    };
  }, [appStage, parentSettings.sessionLimitMinutes, setAppStage]);

  const activeLabel = useMemo(() => {
    if (!activeActivity) return "Tap or press keys to begin";
    return ActivityRegistry[activeActivity]?.label || activeActivity;
  }, [activeActivity]);

  const appShellClassName = parentSettings.calmMode
    ? "app-shell app-shell-calm"
    : "app-shell";

  return (
    <div className={appShellClassName}>
      <ExitButton />

      <div className="child-hud">
        <div>
          <p className="hud-title">Child Mode</p>
          <p className="hud-subtitle">{activeLabel}</p>
        </div>

        <div className="hud-timer-block">
          <span>Session</span>
          <strong>{formatTimer(remainingSeconds)}</strong>
        </div>
      </div>

      <InputEngine />
      <ActivityEngine />
    </div>
  );
}
