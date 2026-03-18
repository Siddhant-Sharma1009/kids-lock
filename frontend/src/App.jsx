import { useContext } from "react";
import AdminLogin from "./features/auth/AdminLogin";
import AdminSignup from "./features/auth/AdminSignup";
import { AdminProvider } from "./context/AdminContext";
import { AppContext, AppProvider } from "./context/AppContext";
import AppShell from "./core/AppShell";
import IntroScreen from "./features/intro/IntroScreen";
import ParentDashboard from "./features/parent/ParentDashboard";
import SecretUnlock from "./features/security/SecretUnlock";
import BackgroundController from "./features/visual/BackgroundController";

function StageRouter() {
  const { appStage, setAppStage } = useContext(AppContext);

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

  return <AppShell />;
}

export default function App() {
  return (
    <AdminProvider>
      <AppProvider>
        <BackgroundController />
        <SecretUnlock />
        <StageRouter />
      </AppProvider>
    </AdminProvider>
  );
}
