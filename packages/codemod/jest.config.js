module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  displayName: "codemod",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};
