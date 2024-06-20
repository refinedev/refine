module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "airtable",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
