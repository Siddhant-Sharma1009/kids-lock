import { createContext, useState } from "react";

const BOOTSTRAP_EXIT = ["e", "x", "i", "t"];

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
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
