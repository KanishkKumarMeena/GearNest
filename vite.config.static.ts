import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Static build configuration for GitHub Pages
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/GearNest/' : '/',
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
