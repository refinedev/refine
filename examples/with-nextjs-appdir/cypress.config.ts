import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    e2e: {
        fixturesFolder: "../../cypress/fixtures",
        supportFile: "../../cypress/support/e2e.ts",
        defaultCommandTimeout: 120000,
        responseTimeout: 120000,
        requestTimeout: 120000,
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
});
