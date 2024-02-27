const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    "\\.css$": "identity-obj-proxy",
  },
  displayName: "mui",
  transform: {
    "^.+\\.svg$": "<rootDir>/test/svgTransform.ts",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
};
