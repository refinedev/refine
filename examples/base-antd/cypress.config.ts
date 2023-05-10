import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "sq5j3e",
    e2e: {},
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
});
