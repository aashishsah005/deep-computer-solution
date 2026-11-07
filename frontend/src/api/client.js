import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

// attach admin token if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("dcs_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
