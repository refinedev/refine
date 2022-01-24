module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "react-table",
    displayName: "react-table",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.test.json",
        },
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};
