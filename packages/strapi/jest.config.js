module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "strapi",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
