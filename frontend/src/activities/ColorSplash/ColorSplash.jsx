import { useEffect, useState } from "react";
import "./color.css";

/**
 * ColorSplash (Upgraded)
 * - Smooth animated gradients
 * - Floating light orbs
 * - Gentle pulse glow
 * - No user interaction needed
 */
export default function ColorSplash() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    let raf;
    const animate = () => {
      setHue((h) => (h + 0.15) % 360);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="color-splash"
      style={{
        background: `
          radial-gradient(
            circle at 30% 30%,
            hsl(${hue}, 85%, 65%),
            transparent 60%
          ),
          radial-gradient(
            circle at 70% 60%,
            hsl(${(hue + 120) % 360}, 85%, 60%),
            transparent 65%
          ),
          linear-gradient(
            120deg,
            hsl(${(hue + 240) % 360}, 70%, 30%),
            #050505
          )
        `,
      }}
    >
      {/* Floating glow orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* Center pulse */}
      <div className="center-glow" />
    </div>
  );
}
