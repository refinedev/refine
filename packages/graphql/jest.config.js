module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "graphql",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
