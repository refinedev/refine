#!/usr/bin/env node

const fs = require("fs");
const waitOn = require("wait-on");
const pidtree = require("pidtree");
const { join: pathJoin } = require("path");
const { promisify } = require("util");
const { exec, spawn, execSync } = require("child_process");

const KEY = process.env.KEY;
const CI_BUILD_ID = process.env.CI_BUILD_ID;

const EXAMPLES_DIR = "./examples";
const EXAMPLES = process.env.EXAMPLES ? process.env.EXAMPLES : [];

const execPromise = (command) => {
    let commandProcess;
    const promise = new Promise((resolve, reject) => {
        commandProcess = exec(command);

        commandProcess.stdout.on("data", console.log);
        commandProcess.stderr.on("data", console.error);

        commandProcess.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject();
            }
        });
    });

    return {
        promise,
        pid: commandProcess.pid,
        process: commandProcess,
    };
};

const getProjectPort = async (path) => {
    // read package.json
    const pkg = await promisify(fs.readFile)(
        pathJoin(path, "package.json"),
        "utf8",
    );

    // parse package.json
    const packageJson = JSON.parse(pkg);

    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});

    // check for vite
    if (dependencies.includes("vite") || devDependencies.includes("vite")) {
        return 5173;
    }

    return 3000;
};

const getAdditionalStartParams = async (path) => {
    // read package.json
    const pkg = await promisify(fs.readFile)(
        pathJoin(path, "package.json"),
        "utf8",
    );

    // parse package.json
    const packageJson = JSON.parse(pkg);

    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});

    if (
        dependencies.includes("react-scripts") ||
        devDependencies.includes("react-scripts")
    ) {
        return "-- --host 127.0.0.1";
    }

    return "";
};

const prettyLog = (bg, ...args) => {
    const colors = {
        blue: "\x1b[44m",
        red: "\x1b[41m",
        green: "\x1b[42m",
    };
    const code = colors[bg] || colors.blue;

    console.log(code, ...args, "\x1b[0m");
};

const getProjectsWithE2E = async () => {
    return (
        await Promise.all(
            EXAMPLES.split(",").map(async (path) => {
                const dir = pathJoin(EXAMPLES_DIR, path);
                const isDirectory = (
                    await promisify(fs.stat)(dir)
                ).isDirectory();
                const isConfigExists = await promisify(fs.exists)(
                    pathJoin(dir, "cypress.config.ts"),
                );

                if (isDirectory && isConfigExists) {
                    return path;
                }
            }),
        )
    ).filter(Boolean);
};

const waitForServer = async (port) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            resolve(false);
        }, 30000);

        try {
            const tcp = waitOn({
                resources: [`tcp:${port}`],
                log: true,
            });
            const localhost = waitOn({
                resources: [`http://localhost:${port}`],
                log: true,
            });
            const host = waitOn({
                resources: [`http://127.0.0.1:${port}`],
                log: true,
            });

            await Promise.any([tcp, localhost, host]);

            resolve(true);
        } catch (error) {
            if (error) console.log(error);

            resolve(false);
        }
    });
};

const runTests = async () => {
    const examplesToRun = await getProjectsWithE2E();

    if (examplesToRun.length === 0) {
        return { success: true, empty: true };
    }

    prettyLog("blue", "Running Tests for Examples");
    prettyLog("blue", `Examples: ${examplesToRun.join(", ")}`);
    console.log("\n");

    for await (const path of examplesToRun) {
        console.log(`::group::Example ${path}`);

        const PORT = await getProjectPort(`${EXAMPLES_DIR}/${path}`);

        prettyLog("blue", `Running for ${path} at port ${PORT}`);

        prettyLog("blue", `Starting the dev server`);

        let start;

        try {
            const additionalParams = await getAdditionalStartParams(
                `${EXAMPLES_DIR}/${path}`,
            );

            start = exec(
                `cd ${pathJoin(
                    EXAMPLES_DIR,
                    path,
                )} && npm run start ${additionalParams}`,
            );

            start.stdout.on("data", console.log);
            start.stderr.on("data", console.error);
        } catch (error) {
            prettyLog("red", `Error occured on starting the dev server`);

            return { error, success: false };
        }

        try {
            prettyLog(
                "blue",
                `Waiting for the server to start at port ${PORT}`,
            );

            const status = await waitForServer(PORT);
            if (!status) {
                prettyLog(
                    "red",
                    `Error occured on waiting for the server to start`,
                );

                return { success: false };
            }
        } catch (error) {
            prettyLog(
                "red",
                `Error occured on waiting for the server to start`,
            );
            if (error) console.log(error);

            return { success: false, error };
        }

        try {
            const params =
                "" ??
                `-- --record --key ${KEY} --ci-build-id=${CI_BUILD_ID}-${path} --group ${CI_BUILD_ID}-${path}`;
            const runner = `npm run lerna run cypress:run -- --scope ${path} ${params}`;

            prettyLog("blue", `Running tests for ${path}`);

            const { promise } = execPromise(runner);

            await promise;

            prettyLog("green", `Tests for ${path} finished`);
        } catch (error) {
            prettyLog("red", `Error occured on tests for ${path}`);
            if (error) console.log(error);

            return { success: false, error };
        } finally {
            prettyLog("blue", `Killing the dev server`);

            try {
                if (start.pid) {
                    const pidsOfStart = await pidtree(start.pid, {
                        root: true,
                    });

                    pidsOfStart.forEach((pid) => {
                        process.kill(pid, "SIGINT");
                    });

                    await new Promise((resolve) => setTimeout(resolve, 500));

                    prettyLog("green", `Killed the dev server`);
                } else {
                    return { success: false };
                }
            } catch (error) {
                prettyLog("red", `Error occured on killing the dev server`);
                if (error) console.log(error);

                return { success: false, error };
            }
        }

        prettyLog("green", `Tests for ${path} finished successfully`);

        console.log(`::endgroup::`);
    }

    return { success: true };
};

runTests()
    .then(({ error, success, empty }) => {
        if (success) {
            prettyLog(
                "green",
                empty ? "No Examples To Run" : "All Tests Passed",
            );
            process.exitCode = 0;
            process.exit(0);
        } else {
            // console.log(`::endgroup::`);

            prettyLog("red", "Tests Failed or an Error Occured");
            if (error) console.log(error);
            process.exitCode = 1;
            process.exit(1);
        }
    })
    .catch((error) => {
        // console.log(`::endgroup::`);

        prettyLog("red", "Tests Failed or an Error Occured");
        if (error) console.log(error);
        process.exitCode = 1;
        process.exit(1);
    });
