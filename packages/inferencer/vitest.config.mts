import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
    globals: true,
    testTimeout: 30000,
    retry: process.env.CI ? 3 : 0,
    silent: true,
    logLevel: 'error',
    coverage: {
      exclude: ["src/index.ts"],
    },
  },
  resolve: {
    alias: {
      // Path mappings from tsconfig.json
      "@": path.resolve(__dirname, "./src"),
      "@/*": path.resolve(__dirname, "./src/*"),
      "@test": path.resolve(__dirname, "./test"),
      "@test/*": path.resolve(__dirname, "./test/*"),
      // Handle .js extension mapping and CSS
      "^(..?/.+)\\.js?$": "$1",
    },
  },
  css: {
    modules: {
      classNameStrategy: "non-scoped",
    },
  },
  assetsInclude: ["**/*.svg"],
  esbuild: {
    target: "node18",
  },
});