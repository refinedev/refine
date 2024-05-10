module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "supabase",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(..?/.+).js?$": "$1",
  },
};
