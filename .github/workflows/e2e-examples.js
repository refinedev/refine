#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync } = require('child_process');

const EXAMPLES_DIR = "./examples";
const EXAMPLES = process.env.EXAMPLES ? process.env.EXAMPLES : [];

const hasE2EExamples = [];
EXAMPLES.split(",").map((path) => {
    const dir = EXAMPLES_DIR + "/" + path;
    if (fs.statSync(dir).isDirectory() && fs.existsSync(`${dir}/cypress.config.ts`)) {
        hasE2EExamples.push(path);
    }
});
console.log("|- examples: ", hasE2EExamples);

for (const path of hasE2EExamples) {
    console.log("|- run: ", path);

    console.log("|- bootstrap: ", path);
    execSync(`npm run bootstrap -- --scope ${path}`, {
        stdio: 'inherit',
    });
    console.log("|- start: ", path);
    const start = exec(`npm run start -- --scope ${path}`);
    execSync(`npm run lerna run cypress:run -- --scope ${path}`, {
        stdio: 'inherit',
    });
    console.log("|- finished: ", path);
    start.kill("SIGINT");
}