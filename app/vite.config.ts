import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// <https://vitejs.dev/config/>
export default defineConfig({
  base: "/homework-7-2-flashcards-simon-rupp",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});