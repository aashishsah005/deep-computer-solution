import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL?.trim();
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
