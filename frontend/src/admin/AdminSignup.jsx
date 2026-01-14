import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { apiRequest } from "../services/api";
import "./admin.css";

export default function AdminSignup() {
  const { setAppStage } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setSuccess("Signup successful. Please login.");
      setTimeout(() => setAppStage("LOGIN"), 1000);
    } catch (e) {
      setError("Signup failed. Try another username.");
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-box">
        <h2>Sign Up</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p>{success}</p>}

        <button onClick={submit}>Create Account</button>

        <button className="link" onClick={() => setAppStage("LOGIN")}>
          Already have an account? Login
        </button>

        <button className="link" onClick={() => setAppStage("INTRO")}>
          ← Back
        </button>
      </div>
    </div>
  );
}
