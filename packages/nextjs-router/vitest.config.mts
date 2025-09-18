import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "nextjs-router",
    environment: "happy-dom",
    setupFiles: ["./src/test/vitest.setup.ts"],
    exclude: ["**/node_modules/**", "**/example/**", "**/dist/**"],
    retry: 3,
    testTimeout: 20000,
    reporter: ["verbose"],
    logHeapUsage: true,
    globals: true,
    silent: true,
    logLevel: 'error',
  },
});