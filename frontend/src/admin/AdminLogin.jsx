import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import { login } from "../services/authService";
import "./admin.css";

export default function AdminLogin() {
  const { setAppStage } = useContext(AppContext);
  const {
    setIsAdminAuthenticated,
    setAdminUser,
    setExitSequence,
  } = useContext(AdminContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await login(username, password);
      setIsAdminAuthenticated(true);
      setAdminUser(res.user.username);
      setExitSequence(res.user.exitSequence);

      // ✅ ENTER CHILD MODE
      setAppStage("DASHBOARD");
    } catch (e) {
      setError("Invalid login. Try signup.");
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-box">
        <h2>Login</h2>

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

        <button onClick={submit}>Login</button>

        <button className="link" onClick={() => setAppStage("SIGNUP")}>
          New user? Sign up
        </button>

        <button className="link" onClick={() => setAppStage("INTRO")}>
          ← Back
        </button>
      </div>
    </div>
  );
}
