module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "refine-hasura",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
