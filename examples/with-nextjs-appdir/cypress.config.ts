import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    e2e: {
        fixturesFolder: "../../cypress/fixtures",
        supportFile: "../../cypress/support/e2e.ts",
        defaultCommandTimeout: 60000,
        responseTimeout: 60000,
        requestTimeout: 60000,
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
});
