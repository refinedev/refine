module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "refine-hasura",
    displayName: "refine-hasura",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
