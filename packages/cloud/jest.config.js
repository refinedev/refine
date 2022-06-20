const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "refine-cloud",
    displayName: "refine-cloud",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
        },
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    },
};
