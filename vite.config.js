import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: './',  // Ensures relative paths for assets in production
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "./dist", // Output directory for production build
  },
}));
