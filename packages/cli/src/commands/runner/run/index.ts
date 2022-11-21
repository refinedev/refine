import { getUpdateWarning } from "@commands/check-updates";
import { Command } from "commander";
import { runScript } from "../runScript";

const run = (program: Command) => {
    return program
        .command("run")
        .summary(
            "Custom runner for `refine`. You can add your own scripts to this command.",
        )
        .description(
            "Custom runner for `refine`. You can add your own scripts to this command. First arg is the script name, the rest are the args for the script.",
        )
        .allowUnknownOption(true)
        .argument("[args...]")
        .action(action);
};

const action = async (args: string[]) => {
    const [binName, ...restArgs] = args;
    const binPath = `${process.cwd()}/node_modules/.bin/${binName}`;

    runScript(binPath, restArgs);
    getUpdateWarning();
};

export default run;
