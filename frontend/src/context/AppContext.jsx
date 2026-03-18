import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SETTINGS_STORAGE_KEY = "kids-lock:parent-settings";
const STATS_STORAGE_KEY = "kids-lock:usage-stats";

const defaultParentSettings = {
  sessionLimitMinutes: 25,
  visualTheme: "aurora",
  calmMode: false,
  quickStartActivity: "RANDOM",
};

const createDefaultUsageStats = () => ({
  totalSessions: 0,
  totalPlayMinutes: 0,
  activityCounts: {},
  recentSessions: [],
  lastSessionAt: null,
});

function readStoredJson(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;

    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return fallback;

    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors (private mode, quota, etc.).
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [appStage, setAppStageState] = useState("INTRO");
  // INTRO | LOGIN | SIGNUP | DASHBOARD | CHILD

  const [activeActivity, setActiveActivity] = useState(null);

  const [parentSettings, setParentSettings] = useState(() =>
    readStoredJson(SETTINGS_STORAGE_KEY, defaultParentSettings)
  );

  const [usageStats, setUsageStats] = useState(() =>
    readStoredJson(STATS_STORAGE_KEY, createDefaultUsageStats())
  );

  const sessionStartRef = useRef(null);

  useEffect(() => {
    writeStoredJson(SETTINGS_STORAGE_KEY, parentSettings);
  }, [parentSettings]);

  useEffect(() => {
    writeStoredJson(STATS_STORAGE_KEY, usageStats);
  }, [usageStats]);

  const setAppStage = useCallback((nextStage) => {
    setAppStageState((previousStage) => {
      if (previousStage !== "CHILD" && nextStage === "CHILD") {
        sessionStartRef.current = Date.now();
        setUsageStats((previous) => ({
          ...previous,
          totalSessions: previous.totalSessions + 1,
          lastSessionAt: new Date().toISOString(),
        }));
      }

      if (previousStage === "CHILD" && nextStage !== "CHILD") {
        const sessionStart = sessionStartRef.current;
        if (sessionStart) {
          const sessionDurationMinutes = Math.max(
            1,
            Math.round((Date.now() - sessionStart) / 60000)
          );

          setUsageStats((previous) => ({
            ...previous,
            totalPlayMinutes: previous.totalPlayMinutes + sessionDurationMinutes,
            recentSessions: [
              {
                startedAt: new Date(sessionStart).toISOString(),
                endedAt: new Date().toISOString(),
                durationMinutes: sessionDurationMinutes,
              },
              ...previous.recentSessions,
            ].slice(0, 8),
          }));
        }

        sessionStartRef.current = null;
        setActiveActivity(null);
      }

      return nextStage;
    });
  }, []);

  const updateParentSettings = useCallback((updater) => {
    setParentSettings((previous) => {
      const patch =
        typeof updater === "function" ? updater(previous) : updater;

      return { ...previous, ...patch };
    });
  }, []);

  const recordActivityLaunch = useCallback((activityName) => {
    if (!activityName) return;

    setUsageStats((previous) => ({
      ...previous,
      activityCounts: {
        ...previous.activityCounts,
        [activityName]: (previous.activityCounts[activityName] || 0) + 1,
      },
    }));
  }, []);

  const resetUsageStats = useCallback(() => {
    setUsageStats(createDefaultUsageStats());
  }, []);

  return (
    <AppContext.Provider
      value={{
        appStage,
        setAppStage,
        activeActivity,
        setActiveActivity,
        parentSettings,
        updateParentSettings,
        usageStats,
        recordActivityLaunch,
        resetUsageStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
