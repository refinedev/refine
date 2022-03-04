module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "nestjsx-crud",
    displayName: "nestjsx-crud",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
