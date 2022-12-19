module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "altogic",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
