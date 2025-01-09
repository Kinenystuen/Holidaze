import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  base: "/Holidaze/",
  build: {
    outDir: "dist"
  },
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  }
});
