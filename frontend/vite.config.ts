import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "1fc0-136-158-61-114.ngrok-free.app",
      "localhost",
      "127.0.0.1",
    ],
    port: 5173,
  },
});
