import { createContext, useState } from "react";

/**
 * 🔐 Admin context
 * MUST export AdminContext as a NAMED export
 */
export const AdminContext = createContext(null);

const BOOTSTRAP_EXIT = ["e", "x", "i", "t"];

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // 🔐 Active exit sequence
  const [exitSequence, setExitSequence] = useState(BOOTSTRAP_EXIT);

  const clearAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setExitSequence(BOOTSTRAP_EXIT);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminUser,
        setAdminUser,
        exitSequence,
        setExitSequence,
        clearAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
