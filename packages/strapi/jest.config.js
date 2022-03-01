module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "strapi",
    displayName: "strapi",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
