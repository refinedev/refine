import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    retries: 3,
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
