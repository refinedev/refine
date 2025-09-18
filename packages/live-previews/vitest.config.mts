import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
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
      // Path mappings from tsconfig.json
      "@": path.resolve(__dirname, "."),
    },
  },
  esbuild: {
    target: "node18",
  },
});