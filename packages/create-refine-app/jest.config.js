const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "create-refine-app",
    displayName: "create-refine-app",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "node",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ["<rootDir>", "src"],
    moduleDirectories: ["node_modules", "src"],
};
