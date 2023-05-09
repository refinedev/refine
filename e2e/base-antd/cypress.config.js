const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "sq5j3e",
    e2e: {
        baseUrl: "http://127.0.0.1:5173",
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
