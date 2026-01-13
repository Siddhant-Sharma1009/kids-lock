import { useEffect } from "react";
import blockNavigation from "../security/blockNavigation";

export default function KioskGuard({ children }) {
  useEffect(() => {
    blockNavigation();

    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Block right click
    document.addEventListener("contextmenu", preventDefault);

    // Block refresh keys
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F5" ||
        (e.ctrlKey && e.key.toLowerCase() === "r") ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
    };
  }, []);

  return <div className="app-shell">{children}</div>;
}
