import axios from "axios";

// Default to the live Render backend in production if VITE_API_URL is unset
const FALLBACK_PROD_URL = "https://deep-computer-solution-backend.onrender.com/api";

const rawBaseUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.PROD ? FALLBACK_PROD_URL : "/api");

let baseURL = "/api";
if (rawBaseUrl) {
  const normalized = rawBaseUrl.replace(/\/+$/, "");
  baseURL = normalized.endsWith("/api") ? normalized : `${normalized}/api`;
}

const client = axios.create({
  baseURL,
});

// attach admin token if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("dcs_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
