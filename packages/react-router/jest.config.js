module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "react-router",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/example/",
    "<rootDir>/dist/",
  ],
};
