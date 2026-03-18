const DEPLOYED_BACKEND_BASE = "https://kids-lock-1.onrender.com";

function resolveApiBase() {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase) return envBase.replace(/\/$/, "");

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return isLocalhost ? "http://localhost:5000" : DEPLOYED_BACKEND_BASE;
}

const API_BASE = resolveApiBase();

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    const payload = isJson ? await response.json().catch(() => null) : null;
    throw new Error(payload?.message || "Request failed");
  }

  if (!isJson) return null;
  return response.json();
}
