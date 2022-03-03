module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "altogic",
    displayName: "altogic",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
