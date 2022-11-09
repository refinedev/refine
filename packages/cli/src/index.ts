#!/usr/bin/env node
import { Command } from "commander";

const bootstrap = () => {
    const program = new Command();
    program
        .version("0.0.0", "-v, --version", "Output the current version.")
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.");

    // TODO: load commands

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
