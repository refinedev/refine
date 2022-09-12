module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "simple-rest",
    displayName: "simple-rest",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
