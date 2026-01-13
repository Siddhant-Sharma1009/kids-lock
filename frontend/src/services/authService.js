import { apiRequest } from "./api";

export async function login(username, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return apiRequest("/api/auth/logout", { method: "POST" });
}
