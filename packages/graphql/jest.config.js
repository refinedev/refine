module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "graphql",
    displayName: "graphql",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
