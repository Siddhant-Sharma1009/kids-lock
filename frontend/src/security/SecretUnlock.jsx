import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AdminContext } from "../context/AdminContext";
import useSecretExitSequence from "./useSecretExitSequence";

export default function SecretUnlock() {
  const { setAppStage } = useContext(AppContext);
  const { clearAdmin } = useContext(AdminContext);

  useSecretExitSequence(() => {
    clearAdmin();
    setAppStage("INTRO"); // 🔑 DIRECT EXIT
  });

  return null;
}
