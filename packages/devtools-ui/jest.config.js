module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "devtools-ui",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
};
