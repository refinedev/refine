import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./test/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: ["src/index.ts"],
    },
    globals: true,
    testTimeout: 20000,
    retry: process.env.CI ? 3 : 0,
    silent: true,
    logLevel: 'error',
  },
  resolve: {
    alias: {
      // Handle .js extension mapping
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node20",
  },
});