import { useContext, useEffect, useRef } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function useSecretExitSequence(onTrigger) {
  const { exitSequence } = useContext(AdminContext);
  const bufferRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!exitSequence || exitSequence.length === 0) return;

    const reset = () => {
      bufferRef.current = [];
      window.clearTimeout(timerRef.current);
    };

    const handler = (event) => {
      const key = event.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      bufferRef.current.push(key);

      if (bufferRef.current.length > exitSequence.length) {
        bufferRef.current.shift();
      }

      if (bufferRef.current.join("") === exitSequence.join("")) {
        event.preventDefault();
        event.stopPropagation();
        reset();
        onTrigger();
        return;
      }

      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(reset, 3000);
    };

    window.addEventListener("keydown", handler, true);

    return () => {
      window.removeEventListener("keydown", handler, true);
      reset();
    };
  }, [exitSequence, onTrigger]);
}
