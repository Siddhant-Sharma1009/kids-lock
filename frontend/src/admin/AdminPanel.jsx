import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { AppContext } from "../context/AppContext";
import { apiRequest } from "../services/api";
import { logout } from "../services/authService";
import "./admin.css";

export default function AdminPanel() {
  const {
    exitSequence,
    setExitSequence,
    clearAdmin,
  } = useContext(AdminContext);

  const { setIsAdminMode } = useContext(AppContext);

  const [input, setInput] = useState(exitSequence.join(""));
  const [msg, setMsg] = useState("");

  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [createMsg, setCreateMsg] = useState("");

  const save = async () => {
    const seq = input.toLowerCase().replace(/[^a-z]/g, "").split("");
    if (seq.length < 3) {
      setMsg("Sequence must be at least 3 letters");
      return;
    }

    await apiRequest("/user/exit-sequence", {
      method: "PUT",
      body: JSON.stringify({ exitSequence: seq }),
    });

    setExitSequence(seq);
    setMsg("Exit sequence updated");
  };

  const createUser = async () => {
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: newUser,
          password: newPass,
        }),
      });
      setCreateMsg("New parent created");
      setNewUser("");
      setNewPass("");
    } catch (e) {
      setCreateMsg(e.message);
    }
  };

  const doLogout = async () => {
    await logout();
    clearAdmin();
    setIsAdminMode(false); // 🔑 NO MORE LOOP
  };

  return (
    <div className="admin-overlay">
      <div className="admin-box wide">
        <h2>Admin Panel</h2>

        <p>
          <strong>Exit Sequence:</strong><br />
          {exitSequence.join(" → ").toUpperCase()}
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Change exit sequence"
        />

        <button onClick={save}>Save Exit Sequence</button>
        {msg && <p>{msg}</p>}

        <hr />

        <h3>Create New Parent</h3>

        <input
          placeholder="Username"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <button onClick={createUser}>Create Parent</button>
        {createMsg && <p>{createMsg}</p>}

        <hr />

        <button className="danger" onClick={doLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
