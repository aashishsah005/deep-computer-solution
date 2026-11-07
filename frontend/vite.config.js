import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose to local network
    allowedHosts: true, // allow cloudflare tunnel and other external hosts
    proxy: {
      "/api": {
        target: process.env.VITE_DEV_BACKEND_URL || "https://deep-computer-solution-backend.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
