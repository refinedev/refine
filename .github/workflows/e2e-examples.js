#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync } = require("child_process");
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

    const start = exec(`npm run start -- --scope ${path}`);

    start.stdout.on("data", (data) => console.log(data));
    start.stderr.on("data", (data) => console.log(data));

    const tests = exec(
        `npx wait-on tcp:3000 -i 1000 -d 10000 --timeout 25000 --verbose && npm run lerna run cypress:run -- --scope ${path} -- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID} --parallel`,
    );

    tests.stdout.on("data", (data) => console.log(data));
    tests.stderr.on("data", (data) => console.log(data));

    tests.on("exit", async (code) => {
        console.log("|- exiting");
        start.kill("SIGTERM");
        pids(3000).then((pids) => {
            pids.all.forEach((pid) => {
                process.kill(pid, "SIGTERM");
            });
        });

        console.log("|- exited: ", path);
    });
}
