import AppShell from "./core/AppShell";
import IntroScreen from "./intro/IntroScreen";
import BackgroundController from "./visual/BackgroundController";
import SecretUnlock from "./security/SecretUnlock";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import ParentDashboard from "./parent/ParentDashboard";

import { AppProvider } from "./context/AppContext";
import { AdminProvider } from "./context/AdminContext";
import { AppContext } from "./context/AppContext";

export default function App() {
  return (
    <AdminProvider>
      <AppProvider>
        <BackgroundController />
        <SecretUnlock />

        <AppContext.Consumer>
          {({ appStage, setAppStage }) => {
            if (appStage === "INTRO") {
              return (
                <IntroScreen
                  onLogin={() => setAppStage("LOGIN")}
                  onSignup={() => setAppStage("SIGNUP")}
                />
              );
            }

            if (appStage === "LOGIN") return <AdminLogin />;
            if (appStage === "SIGNUP") return <AdminSignup />;
            if (appStage === "DASHBOARD") return <ParentDashboard />;

            return <AppShell />; // CHILD MODE
          }}
        </AppContext.Consumer>
      </AppProvider>
    </AdminProvider>
  );
}
