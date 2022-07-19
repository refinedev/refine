const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
        },
    },
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/example/",
        "<rootDir>/dist/",
    ],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
        "\\.css$": "identity-obj-proxy",
    },
    name: "core",
    displayName: "core",
    testEnvironment: "jsdom",
};
