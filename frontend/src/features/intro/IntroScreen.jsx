import "./intro-screen.css";

const featureCards = [
  {
    title: "Safe By Default",
    description:
      "No external links, no ad clutter, and parent-only unlock controls.",
  },
  {
    title: "Session Smart",
    description:
      "Set focused play sessions and automatically return to the parent dashboard.",
  },
  {
    title: "Creative Modes",
    description:
      "Touch zones and keyboard shortcuts open colorful mini activities instantly.",
  },
  {
    title: "Insight Ready",
    description:
      "Track total sessions, play minutes, and favorite activities from one dashboard.",
  },
];

export default function IntroScreen({ onLogin, onSignup }) {
  return (
    <section className="intro-screen">
      <div className="intro-bg-orb intro-bg-orb-a" />
      <div className="intro-bg-orb intro-bg-orb-b" />

      <div className="intro-card">
        <p className="intro-badge">Kids Lock Studio</p>

        <h1>Build a safer and more delightful play zone for kids.</h1>

        <p className="intro-subtitle">
          Modern child mode with fullscreen focus, playful interactions, and
          strong parent controls.
        </p>

        <div className="intro-actions">
          <button className="intro-btn intro-btn-primary" onClick={onLogin}>
            Login
          </button>
          <button className="intro-btn intro-btn-secondary" onClick={onSignup}>
            Create Account
          </button>
        </div>

        <div className="intro-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="intro-feature-card">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>

        <p className="intro-hint">
          Parent tip: your secret letter sequence always exits child mode
          instantly.
        </p>
      </div>
    </section>
  );
}
