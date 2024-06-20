module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "appwrite",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  resetMocks: true,
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
