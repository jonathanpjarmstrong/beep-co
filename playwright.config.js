import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:5173",
    viewport: { width: 412, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npx vite --port 5173 --strictPort",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    env: { ANTHROPIC_API_KEY: "", ANTHROPIC_AUTH_TOKEN: "" },
  },
});
