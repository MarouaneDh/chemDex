import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The PWA plugin is wired in Phase 5.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // dev-only: forward API calls to the Express server
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
  build: {
    outDir: "dist",
  },
});
