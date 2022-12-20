module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "strapi-graphql",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
