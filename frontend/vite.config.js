import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose to local network
    allowedHosts: true, // allow cloudflare tunnel and other external hosts
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
