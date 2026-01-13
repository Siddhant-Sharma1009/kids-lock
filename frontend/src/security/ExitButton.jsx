import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ExitButton() {
  const { setAppStage } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const EXIT_CODE = "1234";

  const submit = () => {
    if (code === EXIT_CODE) {
      setAppStage("INTRO");
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <>
      {/* ❌ button */}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999,
          fontSize: "22px",
          cursor: "pointer",
          opacity: 0.4,
          userSelect: "none",
        }}
        onClick={() => setOpen(true)}
      >
        ❌
      </div>

      {/* 🔐 Modal ONLY when open */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: "#111",
              padding: 20,
              borderRadius: 8,
              color: "white",
              width: 260,
            }}
          >
            <h3>Parent Exit</h3>

            <input
              autoFocus
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />

            {error && (
              <div style={{ color: "red", marginTop: 8 }}>
                Wrong code
              </div>
            )}

            <button
              onClick={submit}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 8,
              }}
            >
              Exit
            </button>

            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 6,
                width: "100%",
                padding: 6,
                background: "transparent",
                color: "white",
                border: "1px solid #444",
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
