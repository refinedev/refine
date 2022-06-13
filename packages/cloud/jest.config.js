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
};
