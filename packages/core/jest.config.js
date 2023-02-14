const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    rootDir: "./",
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
    displayName: "core",
    transform: {
        "^.+\\.svg$": "<rootDir>/test/svgTransform.ts",
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.test.json",
                diagnostics: {
                    ignoreCodes: [2578],
                },
            },
        ],
    },
    coveragePathIgnorePatterns: [
        "<rootDir>/src/index.ts",
        "<rootDir>/src/interfaces/",
    ],
    testEnvironment: "jsdom",
};
