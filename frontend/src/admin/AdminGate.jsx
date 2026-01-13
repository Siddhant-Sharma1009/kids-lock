import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default function AdminGate() {
  const { isAdminAuthenticated } = useContext(AdminContext);
  return isAdminAuthenticated ? <AdminPanel /> : <AdminLogin />;
}
