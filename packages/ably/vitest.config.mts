import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    testTimeout: 20000,
    retry: process.env.CI ? 3 : 0,
    silent: true,
    logLevel: "error",
  },
  resolve: {
    alias: {
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node20",
  },
});