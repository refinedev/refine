const { pathsToModuleNameMapper } = require("ts-jest");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    },
};
