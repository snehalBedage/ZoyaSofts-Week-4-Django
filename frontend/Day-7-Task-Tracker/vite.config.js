import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Zoyasofts-Internship-Week-3-React/",
  plugins: [react(), tailwindcss()],
});