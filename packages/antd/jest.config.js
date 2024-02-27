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
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  displayName: "antd",
  transform: {
    "^.+\\.svg$": "<rootDir>/test/svgTransform.ts",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.ts",
    "<rootDir>/src/interfaces/",
  ],
};
