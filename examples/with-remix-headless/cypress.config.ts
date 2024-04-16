import { defineConfig } from "cypress";

export default defineConfig({
  retries: { openMode: null, runMode: 2 },
  e2e: {
    fixturesFolder: "../../cypress/fixtures",
    supportFile: "../../cypress/support/e2e.ts",
  },
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 1,
  viewportWidth: 1920,
  viewportHeight: 1080,
});
