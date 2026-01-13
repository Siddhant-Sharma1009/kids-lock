import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [appStage, setAppStage] = useState("INTRO");
  // INTRO | LOGIN | SIGNUP | DASHBOARD | CHILD

  const [activeActivity, setActiveActivity] = useState(null);

  return (
    <AppContext.Provider
      value={{
        appStage,
        setAppStage,
        activeActivity,
        setActiveActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
