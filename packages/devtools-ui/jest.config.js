module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    displayName: "devtools-ui",
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.test.json",
            },
        ],
    },
};
