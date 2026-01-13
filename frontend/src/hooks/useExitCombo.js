import { useEffect } from "react";

const useExitCombo = (setLocked) => {
  useEffect(() => {
    const handleExit = (e) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && e.key === "X") {
        setLocked(true);
        alert("Exited child mode");
      }
    };
    window.addEventListener("keydown", handleExit);
    return () => window.removeEventListener("keydown", handleExit);
  }, [setLocked]);
};

export default useExitCombo;
