const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(
    /\/$/,
    ""
  );

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
