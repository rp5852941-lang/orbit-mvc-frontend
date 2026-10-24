import axios from "axios";

// CRA uses REACT_APP_API_URL; set it to /api to use the local proxy.
const configuredBase = process.env.REACT_APP_API_URL || "https://orbit.gamer.gd/backend";
const normalizedBase = configuredBase.replace(/\/+$/, "");
const baseURL = normalizedBase.endsWith("/api") ? normalizedBase : `${normalizedBase}/api`;

const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("orbit_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (response) => {
    const payload = response.data;
    if (payload && typeof payload === "object" && "success" in payload && "data" in payload) {
      response.data = payload.data;
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("orbit_token");
      window.dispatchEvent(new Event("orbit:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export function formatApiError(error) {
  if (typeof error === "string") return error;
  const payload = error?.response?.data;
  const fieldErrors = payload?.data && typeof payload.data === "object"
    ? Object.values(payload.data).filter((value) => typeof value === "string")
    : [];
  const message = payload?.message
    || payload?.detail
    || error?.message
    || "Something went wrong. Please try again.";
  return fieldErrors.length ? `${message} ${fieldErrors.join(" ")}` : message;
}

export default client;
