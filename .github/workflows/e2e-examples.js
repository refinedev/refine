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
    const packageJson = JSON.parse(
        fs.readFileSync(`${path}/package.json`, "utf8"),
    );

    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});

    // check for vite
    if (dependencies.includes("vite") || devDependencies.includes("vite")) {
        return 5173;
    }

    return 3000;
};

EXAMPLES.split(",").map((path) => {
    const dir = EXAMPLES_DIR + "/" + path;
    if (
        fs.statSync(dir).isDirectory() &&
        fs.existsSync(`${dir}/cypress.config.ts`)
    ) {
        hasE2EExamples.push(path);
    }
});

console.log(`|- examples: , ${hasE2EExamples.join(",")}`);

const runTests = async () => {
    for (const path of hasE2EExamples) {
        const PORT = getProjectPort(`${EXAMPLES_DIR}/${path}`);

        console.log(`|- run: , ${path}:${PORT}`);

        console.log("|- start: ", path);

        const start = exec(`cd ${EXAMPLES_DIR}/${path} && npm run start`);

        start.stdout.on("data", (data) => console.log(data));
        start.stderr.on("data", (data) => console.log(data));

        const WAIT_ON = PORT === 5173 ? "tcp" : "http://127.0.0.1";

        execSync(`npx wait-on ${WAIT_ON}:${PORT} --timeout 50000 --log`, {
            stdio: "inherit",
        });

        execSync(
            `npm run lerna run cypress:run -- --scope ${path} -- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID} --group ${CI_BUILD_ID}-${path}`,
            { stdio: "inherit" },
        );

        const { all } = await pids(PORT);

        console.log("|- kill: ", all);

        all.forEach((pid) => {
            process.kill(pid, "SIGTERM");
        });
    }
};

runTests()
    .then(() => console.log("|- done"))
    .catch(console.error);
