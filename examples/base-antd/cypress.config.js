const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "sq5j3e",
    e2e: {
        supportFile: "../../cypress/support/e2e.ts",
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
