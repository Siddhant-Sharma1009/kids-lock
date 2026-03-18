import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import useSecretExitSequence from "./useSecretExitSequence";

export default function SecretUnlock() {
  const { setAppStage } = useContext(AppContext);
  const { clearAdmin } = useContext(AdminContext);

  useSecretExitSequence(() => {
    clearAdmin();
    setAppStage("INTRO");
  });

  return null;
}
