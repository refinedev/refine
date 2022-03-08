module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "strapi-graphql",
    displayName: "strapi-graphql",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
