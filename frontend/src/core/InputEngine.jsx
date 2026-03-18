import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import useKeyboardListener from "../input/useKeyboardListener";
import useTouchListener from "../input/useTouchListener";

export default function InputEngine() {
  const { setActiveActivity, recordActivityLaunch } = useContext(AppContext);

  const handleActivity = (activityName) => {
    setActiveActivity(activityName);
    recordActivityLaunch(activityName);
  };

  const handleBackgroundPulse = () => {
    window.dispatchEvent(new CustomEvent("kids-lock:background-pulse"));
  };

  useKeyboardListener(handleActivity, handleBackgroundPulse);
  useTouchListener(handleBackgroundPulse, handleActivity);

  return null;
}
