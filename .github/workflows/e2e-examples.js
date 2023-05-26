#!/usr/bin/env node

const fs = require("fs");
const { exec, execSync } = require("child_process");
const pids = require("port-pid");

const KEY = process.env.KEY;
const CI_BUILD_ID = process.env.CI_BUILD_ID;

const EXAMPLES_DIR = "./examples";
const EXAMPLES = process.env.EXAMPLES ? process.env.EXAMPLES : [];

const hasE2EExamples = [];

const getProjectPort = (path) => {
    // read package.json
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, "utf8"));

    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});

    // check for vite
    if (dependencies.includes("vite") || devDependencies.includes("vite")) {
        return 5173;
    }

    return 3000;
}

EXAMPLES.split(",").map((path) => {
    const dir = EXAMPLES_DIR + "/" + path;
    if (
        fs.statSync(dir).isDirectory() &&
        fs.existsSync(`${dir}/cypress.config.ts`)
    ) {
        hasE2EExamples.push(path);
    }
});

const runTests = () => {
    for (const path of hasE2EExamples) {
        console.log("|- run: ", path);
        const PORT = getProjectPort(`${EXAMPLES_DIR}/${path}`);

        console.log("|- start: ", path);

        const start = exec(`cd ${EXAMPLES_DIR}/${path} && npm run start`);

        start.stdout.on("data", (data) => console.log(data));
        start.stderr.on("data", (data) => console.log(data));

        execSync(
            `npx wait-on tcp:${PORT} --verbose`,
            { stdio: "inherit" },
        );

        execSync(
            `npm run lerna run cypress:run -- --scope ${path} -- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID} --parallel`,
            { stdio: "inherit" },
        );

        pids(PORT).then((pids) => {
            console.log("|- kill: ", pids.all);

            pids.all.forEach((pid) => {
                process.kill(pid, "SIGTERM");
            });
        });
    }
};

runTests();
