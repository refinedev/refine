module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "strapi-v4",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
