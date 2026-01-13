import { useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function useSecretKeyCombo(onTrigger) {
  const { exitKeyCombo } = useContext(AdminContext);

  useEffect(() => {
    const handler = (e) => {
      const keyMatch =
        e.key.toLowerCase() === exitKeyCombo.key.toLowerCase();

      const ctrlMatch = exitKeyCombo.ctrl ? e.ctrlKey : true;
      const shiftMatch = exitKeyCombo.shift ? e.shiftKey : true;
      const altMatch = exitKeyCombo.alt ? e.altKey : true;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        e.preventDefault();
        e.stopPropagation();
        onTrigger();
      }
    };

    window.addEventListener("keydown", handler, true); // CAPTURE PHASE

    return () => {
      window.removeEventListener("keydown", handler, true);
    };
  }, [exitKeyCombo, onTrigger]);
}
