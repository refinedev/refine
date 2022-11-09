module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "cli",
    displayName: "cli",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
