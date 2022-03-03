module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "supabase",
    displayName: "supabase",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};
