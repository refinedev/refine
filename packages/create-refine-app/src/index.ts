#!/usr/bin/env node
import { Command } from "commander";
import execa from "execa";

const bootstrap = () => {
    const program = new Command();
    program
        .version("0.0.0", "-v, --version", "Output the current version.")
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.")
        .arguments("<projectName>")
        .action((projectName) => {
            const superplateExecutable = require.resolve(".bin/superplate");

            execa.sync(
                superplateExecutable,
                [projectName, "--project=refine"],
                {
                    stdio: "inherit",
                },
            );
        });

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
