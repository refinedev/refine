module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "graphql",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
