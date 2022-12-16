module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "refine-hasura",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
