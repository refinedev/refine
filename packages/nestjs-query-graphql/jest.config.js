module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "nestjs-query-graphql",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
