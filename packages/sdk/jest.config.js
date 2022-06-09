module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "sdk",
    displayName: "sdk",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
