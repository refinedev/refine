import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    e2e: {
        supportFile: "../../cypress/support/e2e.ts",
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
