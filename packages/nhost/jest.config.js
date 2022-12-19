module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "refine-nhost",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
