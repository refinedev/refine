module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "nestjs-query",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
