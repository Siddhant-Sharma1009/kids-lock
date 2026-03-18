import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import messages from "./messages";
import "./background-controller.css";

const THEME_COLORS = {
  aurora: ["#0a1f3b", "#0b3c4f", "#103d33"],
  sunset: ["#3f1e26", "#5f2f1f", "#2e1f38"],
  ocean: ["#09223f", "#0d3d5a", "#0a4952"],
  playroom: ["#17293f", "#2f3f0f", "#3e2a0a"],
};

function pickRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function BackgroundController() {
  const { appStage, parentSettings } = useContext(AppContext);

  const [pulseHue, setPulseHue] = useState(198);
  const [pulseFlip, setPulseFlip] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const hideMessageTimerRef = useRef(null);

  useEffect(() => {
    const onPulse = () => {
      setPulseHue(Math.floor(Math.random() * 360));
      setPulseFlip((previous) => !previous);
      setFlashMessage(pickRandomMessage());

      window.clearTimeout(hideMessageTimerRef.current);
      hideMessageTimerRef.current = window.setTimeout(() => {
        setFlashMessage("");
      }, 1200);
    };

    window.addEventListener("kids-lock:background-pulse", onPulse);

    const ambientShift = window.setInterval(() => {
      setPulseHue((previous) => (previous + 18) % 360);
    }, 4500);

    return () => {
      window.removeEventListener("kids-lock:background-pulse", onPulse);
      window.clearInterval(ambientShift);
      window.clearTimeout(hideMessageTimerRef.current);
    };
  }, []);

  const selectedPalette = useMemo(() => {
    return THEME_COLORS[parentSettings.visualTheme] || THEME_COLORS.aurora;
  }, [parentSettings.visualTheme]);

  const backgroundStyle = useMemo(
    () => ({
      "--ambient-1": selectedPalette[0],
      "--ambient-2": selectedPalette[1],
      "--ambient-3": selectedPalette[2],
      "--ambient-pulse-hue": `${pulseHue}`,
    }),
    [pulseHue, selectedPalette]
  );

  const className = [
    "ambient-layer",
    `ambient-stage-${appStage.toLowerCase()}`,
    parentSettings.calmMode ? "ambient-calm" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} style={backgroundStyle} aria-hidden>
      <div className="ambient-gradient" />
      <div className={`ambient-pulse ${pulseFlip ? "ambient-pulse-b" : "ambient-pulse-a"}`} />
      <div className="ambient-grain" />

      {flashMessage && <p className="ambient-message">{flashMessage}</p>}
    </div>
  );
}
