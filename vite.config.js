import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { novaPlugin } from "./server/nova.js";

// Set BEEP_BASE=/beep-co/ when building for GitHub Pages project hosting.
const base = process.env.BEEP_BASE ?? "/";

/** Source code references images as "/media/..."; prefix them when hosted under a sub-path. */
function mediaBase() {
  return {
    name: "beep-media-base",
    enforce: "pre",
    transform(code, id) {
      if (base === "/" || !/\/src\/.*\.jsx?$/.test(id)) return null;
      return { code: code.replace(/(["'`])\/media\//g, `$1${base}media/`), map: null };
    },
  };
}

export default defineConfig({
  base,
  plugins: [mediaBase(), react(), tailwindcss(), novaPlugin()],
  server: { port: 5173 },
});
