const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
        },
    },
    setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    },
    name: "ui-tests",
    displayName: "ui-tests",
    transform: {
        "^.+\\.svg$": "<rootDir>/src/test/svgTransform.ts",
    },
    coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
};
