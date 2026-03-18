import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import "./exit-button.css";

export default function ExitButton() {
  const { setAppStage } = useContext(AppContext);
  const { exitSequence } = useContext(AdminContext);

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const sequenceHint = `${exitSequence[0]?.toUpperCase() || "E"}... (${exitSequence.length} letters)`;

  const submit = () => {
    const normalizedCode = code.toLowerCase().replace(/[^a-z]/g, "");
    const expected = exitSequence.join("");

    if (normalizedCode === expected) {
      setCode("");
      setError("");
      setOpen(false);
      setAppStage("DASHBOARD");
      return;
    }

    setCode("");
    setError("Incorrect sequence.");
  };

  return (
    <>
      <button className="exit-fab" onClick={() => setOpen(true)}>
        Exit
      </button>

      {open && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <h3>Parent Unlock</h3>
            <p className="exit-modal-hint">Enter your letter sequence: {sequenceHint}</p>

            <input
              autoFocus
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && submit()}
              placeholder="Type sequence"
            />

            {error && <p className="exit-modal-error">{error}</p>}

            <button className="exit-confirm-btn" onClick={submit}>
              Unlock
            </button>

            <button
              className="exit-cancel-btn"
              onClick={() => {
                setOpen(false);
                setError("");
                setCode("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
