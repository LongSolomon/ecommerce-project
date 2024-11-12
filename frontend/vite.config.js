import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import favicons from '@peterek/vite-plugin-favicons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), favicons('../public/code.jpg')],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    },
  },
});
