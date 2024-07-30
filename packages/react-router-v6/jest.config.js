module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "react-router-v6",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/example/",
    "<rootDir>/dist/",
  ],
};
