module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "sdk",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
