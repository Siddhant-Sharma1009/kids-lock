import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";
import { apiRequest } from "../services/api";
import "./parent.css";

export default function ParentDashboard() {
  const { exitSequence, setExitSequence, clearAdmin } =
    useContext(AdminContext);
  const { setAppStage } = useContext(AppContext);

  const [input, setInput] = useState(exitSequence.join(""));
  const [msg, setMsg] = useState("");

  const save = async () => {
    const seq = input.toLowerCase().replace(/[^a-z]/g, "").split("");
    if (seq.length < 3) {
      setMsg("Exit code must be at least 3 letters");
      return;
    }

    await apiRequest("/api/user/exit-sequence", {
      method: "PUT",
      body: JSON.stringify({ exitSequence: seq }),
    });

    setExitSequence(seq);
    setMsg("Exit code updated");
  };

  const logout = () => {
    clearAdmin();
    setAppStage("INTRO");
  };

  return (
    <div className="parent-dashboard">
      <h2>Parent Dashboard</h2>

      <p>
        <strong>Your Exit Code:</strong><br />
        {exitSequence.join(" → ").toUpperCase()}
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Change exit code"
      />

      <button onClick={save}>Save Exit Code</button>
      {msg && <p>{msg}</p>}

      <hr />

      <button onClick={() => setAppStage("CHILD")}>
        Enter Child Mode
      </button>

      <button className="danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
