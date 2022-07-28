module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "medusa",
    displayName: "medusa",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
