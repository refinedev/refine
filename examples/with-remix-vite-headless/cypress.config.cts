const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: { openMode: 0, runMode: 2 },
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
