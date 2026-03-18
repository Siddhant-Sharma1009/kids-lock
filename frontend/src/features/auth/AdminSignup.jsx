import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { apiRequest } from "../../services/api";
import "./auth.css";

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return "Weak";
  if (score <= 3) return "Good";
  return "Strong";
}

export default function AdminSignup() {
  const { setAppStage } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const submit = async () => {
    if (!username.trim() || !password) {
      setError("Please add username and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      setSuccess("Account created. Redirecting to login...");
      setTimeout(() => setAppStage("LOGIN"), 900);
    } catch {
      setError("Signup failed. Username may already be in use.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-overlay">
      <div className="admin-box">
        <p className="admin-kicker">Parent Access</p>
        <h2>Create your account</h2>
        <p className="admin-subtitle">
          Setup once, then launch safe child mode whenever you need it.
        </p>

        <label className="admin-label" htmlFor="signup-username">
          Username
        </label>
        <input
          id="signup-username"
          autoFocus
          placeholder="choose username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && submit()}
        />

        <label className="admin-label" htmlFor="signup-password">
          Password
        </label>
        <div className="admin-password-row">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="create password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submit()}
          />
          <button
            className="admin-toggle"
            onClick={() => setShowPassword((previous) => !previous)}
            type="button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <p className={`admin-strength admin-strength-${passwordStrength.toLowerCase()}`}>
          Password strength: {passwordStrength}
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="admin-success">{success}</p>}

        <button className="admin-submit" onClick={submit} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <button className="link" onClick={() => setAppStage("LOGIN")}>
          Already have an account
        </button>

        <button className="link" onClick={() => setAppStage("INTRO")}>
          Back to intro
        </button>
      </div>
    </section>
  );
}
