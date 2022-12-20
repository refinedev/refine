module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "medusa",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
