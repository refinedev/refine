module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "strapi-v4",
    displayName: "strapi-v4",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
