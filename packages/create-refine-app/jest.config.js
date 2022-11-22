const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "cli",
    displayName: "cli",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ["<rootDir>", "src"],
    moduleDirectories: ["node_modules", "src"],
};
