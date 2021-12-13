module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "codemod",
    displayName: "codemod",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};
