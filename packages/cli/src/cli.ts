#!/usr/bin/env node
import { Command } from "commander";

import figlet from "figlet";

import checkUpdates from "@commands/check-updates";
import createResource from "@commands/create-resource";
import whoami from "@commands/whoami";
import update from "@commands/update";
import swizzle from "@commands/swizzle";
import { dev, build, start, run } from "@commands/runner";
import "@utils/env";
import { getPackageJson } from "@utils/package";
import { telemetryHook } from "@telemetryindex";

const bootstrap = () => {
    let packageJson;

    // check package json if exists
    try {
        packageJson = getPackageJson();
    } catch (e) {
        console.error(
            "The `package.json` file required to run could not be found.",
        );
        process.exit(1);
    }

    const program = new Command();

    program
        .version(
            packageJson.version,
            "-v, --version",
            "Output the current version.",
        )
        .description(
            figlet.textSync("refine", {
                font: "Isometric1",
                horizontalLayout: "full",
                verticalLayout: "full",
                whitespaceBreak: true,
            }),
        )
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.");

    // load commands
    swizzle(program);
    createResource(program);
    update(program);
    dev(program);
    build(program);
    start(program);
    run(program);
    checkUpdates(program);
    whoami(program);

    program.hook("postAction", (thisCommand) => {
        const command = thisCommand.args[0];
        if (["run"].includes(command)) return;

        telemetryHook();
    });

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
