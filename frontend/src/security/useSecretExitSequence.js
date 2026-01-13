import { useEffect, useContext, useRef } from "react";
import { AdminContext } from "../context/AdminContext";

/**
 * GLOBAL EXIT LISTENER
 * Runs BEFORE all other keyboard logic
 */
export default function useSecretExitSequence(onTrigger) {
  const { exitSequence } = useContext(AdminContext);
  const bufferRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!exitSequence || exitSequence.length === 0) return;

    const reset = () => {
      bufferRef.current = [];
      clearTimeout(timerRef.current);
    };

    const handler = (e) => {
      const key = e.key.toLowerCase();

      // only letters
      if (!/^[a-z]$/.test(key)) return;

      bufferRef.current.push(key);

      if (bufferRef.current.length > exitSequence.length) {
        bufferRef.current.shift();
      }

      if (bufferRef.current.join("") === exitSequence.join("")) {
        e.preventDefault();
        e.stopPropagation();      // 🔴 CRITICAL
        reset();
        onTrigger();
        return;
      }

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(reset, 3000);
    };

    // 🔐 CAPTURE PHASE — runs first
    window.addEventListener("keydown", handler, true);

    return () => {
      window.removeEventListener("keydown", handler, true);
      reset();
    };
  }, [exitSequence, onTrigger]);
}
