import "./intro.css";

export default function IntroScreen({ onLogin, onSignup }) {
  return (
   <div className="intro-screen">
  <div className="intro-card">

    <div className="intro-header">
      <h1>🎈 Child Safe Play Zone</h1>
      <p className="intro-subtitle">
        A protected digital space designed especially for children
      </p>
    </div>

    <div className="intro-info">
      <p>
        To ensure safety and parental control, please login or create an
        account before entering <strong>Child Mode</strong>.
      </p>
    </div>

    <div className="intro-actions">
      <button className="btn primary" onClick={onLogin}>
        Login
      </button>
      <button className="btn secondary" onClick={onSignup}>
        Sign Up
      </button>
    </div>

    <div className="intro-features">
      <ul>
        <li>🎮 Safe games & activities</li>
        <li>🚫 No external links or ads</li>
        <li>⏱️ Screen-time awareness</li>
        <li>🔐 Parent-controlled exit</li>
      </ul>
    </div>

    <p className="intro-note">
      🔒 Exiting child mode requires a secret parent code.
    </p>

    <p className="intro-hint">
      Press any key or tap anywhere after login
    </p>

  </div>
</div>

  );
}
