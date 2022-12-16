module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "nestjsx-crud",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
