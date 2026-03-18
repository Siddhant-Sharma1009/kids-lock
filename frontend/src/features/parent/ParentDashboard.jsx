import { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import ActivityRegistry from "../../engine/ActivityRegistry";
import { apiRequest } from "../../services/api";
import "./parent-dashboard.css";

const PRESETS = [
  {
    id: "focus",
    label: "Focus",
    description: "Calm visuals with a short session limit.",
    settings: {
      sessionLimitMinutes: 15,
      visualTheme: "ocean",
      calmMode: true,
      quickStartActivity: "COLOR_SPLASH",
    },
  },
  {
    id: "party",
    label: "Party",
    description: "Bright theme and energetic first activity.",
    settings: {
      sessionLimitMinutes: 25,
      visualTheme: "sunset",
      calmMode: false,
      quickStartActivity: "CONFETTI_STORM",
    },
  },
  {
    id: "explore",
    label: "Explore",
    description: "Longer session with random quick start activity.",
    settings: {
      sessionLimitMinutes: 35,
      visualTheme: "aurora",
      calmMode: false,
      quickStartActivity: "RANDOM",
    },
  },
];

const QUICK_START_OPTIONS = [
  { value: "RANDOM", label: "Random activity" },
  { value: "NONE", label: "No auto-launch" },
  { value: "BUBBLE_GAME", label: "Bubble Game" },
  { value: "COLOR_SPLASH", label: "Color Splash" },
  { value: "RAINBOW_RAIN", label: "Rainbow Rain" },
  { value: "CONFETTI_STORM", label: "Confetti Storm" },
  { value: "KALEIDOSCOPE", label: "Kaleidoscope" },
];

const THEME_OPTIONS = [
  { value: "aurora", label: "Aurora" },
  { value: "sunset", label: "Sunset" },
  { value: "ocean", label: "Ocean" },
  { value: "playroom", label: "Playroom" },
];

function formatPlayMinutes(totalMinutes) {
  if (!totalMinutes) return "0m";

  if (totalMinutes < 60) return `${totalMinutes}m`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatSessionTimestamp(iso) {
  if (!iso) return "Never";

  const date = new Date(iso);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ParentDashboard() {
  const { exitSequence, setExitSequence, clearAdmin, adminUser } =
    useContext(AdminContext);

  const {
    setAppStage,
    parentSettings,
    updateParentSettings,
    usageStats,
    resetUsageStats,
  } = useContext(AppContext);

  const [input, setInput] = useState(exitSequence.join(""));
  const [msg, setMsg] = useState("");
  const [isSavingExitCode, setIsSavingExitCode] = useState(false);

  useEffect(() => {
    setInput(exitSequence.join(""));
  }, [exitSequence]);

  const favoriteActivity = useMemo(() => {
    const entries = Object.entries(usageStats.activityCounts || {});
    if (!entries.length) return "No data yet";

    const [activityName] = entries.sort((a, b) => b[1] - a[1])[0];
    return ActivityRegistry[activityName]?.label || activityName;
  }, [usageStats.activityCounts]);

  const saveExitCode = async () => {
    const sequence = input
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("");

    if (sequence.length < 3) {
      setMsg("Exit code must have at least 3 letters.");
      return;
    }

    setIsSavingExitCode(true);

    try {
      await apiRequest("/api/user/exit-sequence", {
        method: "PUT",
        body: JSON.stringify({ exitSequence: sequence }),
      });

      setExitSequence(sequence);
      setMsg("Exit code saved.");
    } catch {
      setMsg("Could not save exit code. Please try again.");
    } finally {
      setIsSavingExitCode(false);
    }
  };

  const logout = () => {
    clearAdmin();
    setAppStage("INTRO");
  };

  const applyPreset = (presetId) => {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) return;

    updateParentSettings(preset.settings);
    setMsg(`${preset.label} preset applied.`);
  };

  const sessionLimitMinutes = Number(parentSettings.sessionLimitMinutes) || 0;

  return (
    <div className="parent-dashboard">
      <header className="parent-header">
        <div>
          <p className="parent-kicker">Parent Dashboard</p>
          <h2>Hi {adminUser || "Parent"}, your play zone is ready.</h2>
        </div>
        <button className="parent-btn parent-btn-primary" onClick={() => setAppStage("CHILD")}>
          Enter Child Mode
        </button>
      </header>

      <section className="parent-grid parent-grid-stats">
        <article className="parent-stat-card">
          <p>Sessions</p>
          <h3>{usageStats.totalSessions || 0}</h3>
          <span>Last: {formatSessionTimestamp(usageStats.lastSessionAt)}</span>
        </article>

        <article className="parent-stat-card">
          <p>Total Play</p>
          <h3>{formatPlayMinutes(usageStats.totalPlayMinutes || 0)}</h3>
          <span>Across all child sessions</span>
        </article>

        <article className="parent-stat-card">
          <p>Favorite</p>
          <h3>{favoriteActivity}</h3>
          <span>Most launched activity</span>
        </article>
      </section>

      <section className="parent-grid parent-grid-main">
        <article className="parent-card">
          <h3>Security</h3>

          <label htmlFor="exit-code">Exit letter sequence</label>
          <input
            id="exit-code"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Example: exit"
          />

          <p className="parent-helper">
            Active sequence: {exitSequence.join(" -> ").toUpperCase()}
          </p>

          <button
            className="parent-btn"
            onClick={saveExitCode}
            disabled={isSavingExitCode}
          >
            {isSavingExitCode ? "Saving..." : "Save Exit Code"}
          </button>
        </article>

        <article className="parent-card">
          <h3>Session Controls</h3>

          <label className="parent-switch-row">
            <input
              type="checkbox"
              checked={sessionLimitMinutes === 0}
              onChange={(event) =>
                updateParentSettings({
                  sessionLimitMinutes: event.target.checked ? 0 : 20,
                })
              }
            />
            Unlimited session length
          </label>

          {sessionLimitMinutes > 0 && (
            <>
              <label htmlFor="session-limit">
                Session limit: {sessionLimitMinutes} minutes
              </label>
              <input
                id="session-limit"
                type="range"
                min={5}
                max={90}
                step={5}
                value={sessionLimitMinutes}
                onChange={(event) =>
                  updateParentSettings({
                    sessionLimitMinutes: Number(event.target.value),
                  })
                }
              />
            </>
          )}

          <label htmlFor="quick-start">Quick start activity</label>
          <select
            id="quick-start"
            value={parentSettings.quickStartActivity}
            onChange={(event) =>
              updateParentSettings({ quickStartActivity: event.target.value })
            }
          >
            {QUICK_START_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="theme">Visual theme</label>
          <select
            id="theme"
            value={parentSettings.visualTheme}
            onChange={(event) =>
              updateParentSettings({ visualTheme: event.target.value })
            }
          >
            {THEME_OPTIONS.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>

          <label className="parent-switch-row">
            <input
              type="checkbox"
              checked={Boolean(parentSettings.calmMode)}
              onChange={(event) =>
                updateParentSettings({ calmMode: event.target.checked })
              }
            />
            Calm mode (reduced motion and softer visuals)
          </label>
        </article>

        <article className="parent-card">
          <h3>Quick Presets</h3>
          <div className="parent-preset-list">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                className="parent-preset"
                onClick={() => applyPreset(preset.id)}
              >
                <strong>{preset.label}</strong>
                <span>{preset.description}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="parent-card">
          <div className="parent-card-head">
            <h3>Recent Sessions</h3>
            <button className="parent-link-btn" onClick={resetUsageStats}>
              Reset stats
            </button>
          </div>

          {usageStats.recentSessions?.length ? (
            <ul className="parent-session-list">
              {usageStats.recentSessions.map((session) => (
                <li key={session.startedAt}>
                  <span>{formatSessionTimestamp(session.startedAt)}</span>
                  <strong>{session.durationMinutes}m</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="parent-empty">No sessions recorded yet.</p>
          )}
        </article>
      </section>

      <footer className="parent-footer">
        <p>{msg || "All settings save locally. Exit code also saves to backend."}</p>
        <button className="parent-btn parent-btn-danger" onClick={logout}>
          Logout
        </button>
      </footer>
    </div>
  );
}
