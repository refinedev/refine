const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
            diagnostics: {
                ignoreCodes: [2578],
            },
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
    transform: {
        "^.+\\.svg$": "<rootDir>/test/svgTransform.ts",
    },
    coveragePathIgnorePatterns: [
        "<rootDir>/src/index.ts",
        "<rootDir>/src/components/antd/",
        "<rootDir>/src/interfaces/",
    ],
    testEnvironment: "jsdom",
};
