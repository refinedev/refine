const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "sq5j3e",
    e2e: {
        baseUrl: "http://localhost:3000",
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
