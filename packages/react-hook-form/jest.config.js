module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "react-hook-form",
    displayName: "react-hook-form",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
        },
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};
