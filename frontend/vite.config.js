import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // In dev, every /api request is forwarded to Spring Boot (no CORS setup needed)
    proxy: { "/api": "http://localhost:8080" },
  },
  build: {
    // "npm run build" writes the finished site into Spring Boot's static folder
    outDir: "../src/main/resources/static",
    emptyOutDir: true,
  },
});
