import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base_url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5001"
    : "https://server-aims.onrender.com";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/api/v1/user": base_url,
      "/api/v1/inventory": base_url,
    },
  },
});
