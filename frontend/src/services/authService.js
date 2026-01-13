import { apiRequest } from "./api";

export async function login(username, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return apiRequest("/auth/logout", { method: "POST" });
}
