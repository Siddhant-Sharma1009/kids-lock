import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
import { login } from "../../services/authService";
import "./auth.css";

export default function AdminLogin() {
  const { setAppStage } = useContext(AppContext);
  const { setIsAdminAuthenticated, setAdminUser, setExitSequence } =
    useContext(AdminContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonLabel = useMemo(
    () => (isSubmitting ? "Signing In..." : "Login"),
    [isSubmitting]
  );

  const submit = async () => {
    if (!username.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await login(username.trim(), password);
      setIsAdminAuthenticated(true);
      setAdminUser(res.user.username);
      setExitSequence(res.user.exitSequence);
      setAppStage("DASHBOARD");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-overlay">
      <div className="admin-box">
        <p className="admin-kicker">Parent Access</p>
        <h2>Welcome back</h2>
        <p className="admin-subtitle">
          Login to adjust safety controls and launch child mode.
        </p>

        <label className="admin-label" htmlFor="login-username">
          Username
        </label>
        <input
          id="login-username"
          autoFocus
          placeholder="your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && submit()}
        />

        <label className="admin-label" htmlFor="login-password">
          Password
        </label>
        <div className="admin-password-row">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="your password"
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

        {error && <p className="error">{error}</p>}

        <button className="admin-submit" onClick={submit} disabled={isSubmitting}>
          {buttonLabel}
        </button>

        <button className="link" onClick={() => setAppStage("SIGNUP")}>
          New parent account
        </button>

        <button className="link" onClick={() => setAppStage("INTRO")}>
          Back to intro
        </button>
      </div>
    </section>
  );
}
