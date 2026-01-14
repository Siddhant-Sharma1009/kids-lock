/**
 * Central API handler
 * Production-ready for Render + Vercel
 */

const API_BASE = "https://kids-lock.onrender.com";

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include", // 🔥 REQUIRED for cookies
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  // Better error visibility
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API error");
  }

  return res.json();
}
