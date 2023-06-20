import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    retries: 3,
    e2e: {
        fixturesFolder: "../../cypress/fixtures",
        supportFile: "../../cypress/support/e2e.ts",
        defaultCommandTimeout: 8000,
        execTimeout: 120000,
        taskTimeout: 120000,
        pageLoadTimeout: 120000,
        requestTimeout: 10000,
        responseTimeout: 60000,
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
});
