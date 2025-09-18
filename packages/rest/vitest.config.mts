import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./test/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
    globals: true,
    testTimeout: 15000,
    fileParallelism: false,
  },
  resolve: {
    alias: {
      // Handle .js extension mapping from Jest config
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  esbuild: {
    target: "node18",
  },
});
