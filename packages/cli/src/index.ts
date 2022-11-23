#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "fs-extra";

import checkUpdates from "./commands/check-updates";
import resourceGenerate from "./commands/generate/resource";
import update from "./commands/update";
import { dev, build, start, run } from "./commands/runner";
import "@utils/env";

const bootstrap = () => {
    const packageJson = JSON.parse(
        readFileSync(`${__dirname}/../package.json`, "utf8"),
    );

    const program = new Command();

    program
        .version(
            packageJson.version,
            "-v, --version",
            "Output the current version.",
        )
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.");

    // load commands
    resourceGenerate(program);
    checkUpdates(program);
    update(program);
    dev(program);
    build(program);
    start(program);
    run(program);

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
