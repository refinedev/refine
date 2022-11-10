#!/usr/bin/env node
import { Command } from "commander";

import generate from "./commands/generate";

const bootstrap = () => {
    const program = new Command();
    program
        .version("0.0.0", "-v, --version", "Output the current version.")
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.");

    // load commands
    generate(program);

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};

bootstrap();
