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
        "\\.css$": "identity-obj-proxy",
    },
    name: "core",
    displayName: "core",
    testEnvironment: "jsdom",
};
