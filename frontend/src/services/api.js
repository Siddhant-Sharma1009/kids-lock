/**
 * Central API handler
 * Backend will plug in here (STEP 4+)
 */

const API_BASE = "https://kids-lock-mkra.vercel.app/";

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
