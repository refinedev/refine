module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "simple-rest",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
