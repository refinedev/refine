module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "airtable",
    displayName: "airtable",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
    testEnvironment: "jsdom",
};
