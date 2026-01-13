import { useEffect, useState } from "react";
import "./orbitingPlanets.css";

export default function OrbitingPlanets() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf;
    const animate = () => {
      setAngle((a) => (a + 0.12) % 360);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="space-3d">
      {/* Sun */}
      <div className="sun" />

      {/* Orbit + Planet 1 */}
      <div
        className="orbit orbit-1"
        style={{ transform: `rotateX(65deg) rotateZ(${angle}deg)` }}
      >
        <div className="planet planet-1" />
      </div>

      {/* Orbit + Planet 2 */}
      <div
        className="orbit orbit-2"
        style={{ transform: `rotateX(65deg) rotateZ(${-angle * 0.7}deg)` }}
      >
        <div className="planet planet-2" />
      </div>

      {/* Orbit + Planet 3 */}
      <div
        className="orbit orbit-3"
        style={{ transform: `rotateX(65deg) rotateZ(${angle * 0.4}deg)` }}
      >
        <div className="planet planet-3" />
      </div>

      {/* Asteroid belt */}
      <div
        className="asteroid-belt"
        style={{ transform: `rotateX(65deg) rotateZ(${angle * 0.25}deg)` }}
      >
        {Array.from({ length: 90 }).map((_, i) => (
          <span
            key={i}
            className="asteroid"
            style={{
              transform: `rotate(${i * 4}deg) translateX(240px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
