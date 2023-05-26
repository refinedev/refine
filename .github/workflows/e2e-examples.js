#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync, spawn } = require("child_process");
const pids = require("port-pid");

const KEY = process.env.KEY;
const CI_BUILD_ID = process.env.CI_BUILD_ID;

const EXAMPLES_DIR = "./examples";
const EXAMPLES = process.env.EXAMPLES ? process.env.EXAMPLES : [];

const hasE2EExamples = [];

EXAMPLES.split(",").map((path) => {
    const dir = EXAMPLES_DIR + "/" + path;
    if (
        fs.statSync(dir).isDirectory() &&
        fs.existsSync(`${dir}/cypress.config.ts`)
    ) {
        hasE2EExamples.push(path);
    }
});

console.log("|- examples: ", hasE2EExamples);

const runTests = () => {
    for (const path of hasE2EExamples) {
        console.log("|- run: ", path);

        console.log("|- bootstrap: ", path);
        execSync(`npm run bootstrap -- --scope ${path}`, {
            stdio: "inherit",
        });

        execSync(`npm run build -- --scope base-antd --include-dependencies`, {
            stdio: "inherit",
        });

        console.log("|- start: ", path);

        const start = exec(`cd examples/${path} && npm run start`);

        start.stdout.on("data", (data) => console.log(data));
        start.stderr.on("data", (data) => console.log(data));

        execSync(
            `npx wait-on tcp:3000 -i 1000 -d 5000 --timeout 25000 --verbose`,
            { stdio: "inherit" },
        );

        execSync(
            `npm run lerna run cypress:run -- --scope ${path} -- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID} --parallel`,
            { stdio: "inherit" },
        );

        pids(3000).then((pids) => {
            console.log("|- kill: ", pids.all);

            pids.all.forEach((pid) => {
                process.kill(pid, "SIGTERM");
            });
        });
    }
};

runTests();
