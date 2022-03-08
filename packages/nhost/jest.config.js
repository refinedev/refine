module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "refine-nhost",
    displayName: "refine-nhost",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
