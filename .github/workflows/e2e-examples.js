#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync } = require('child_process');
const KEY = process.env.KEY;
const CI_BUILD_ID = process.env.CI_BUILD_ID;

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

    start.stdout.on('data', (data) => console.log(data));

    execSync(`npx wait-on tcp:3000 --verbose && npm run lerna run cypress:run -- --scope ${path} -- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID} --parallel`, {
        stdio: 'inherit',
    });
    console.log("|- finished: ", path);
    start.kill("SIGINT");
}
