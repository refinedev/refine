import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { updateNotifier } from "src/update-notifier";
import { getRunnerDescription } from "../utils";

const build = (program: Command) => {
    return program
        .command("build")
        .description(getRunnerDescription("build"))
        .allowUnknownOption(true)
        .argument("[args...]")
        .action(action);
};

const action = async (args: string[]) => {
    const projectType = getProjectType();

    const binPath = projectScripts[projectType].getBin("build");
    const script = projectScripts[projectType].build;
    const command = [...script, ...args];

    await updateNotifier();

    try {
        await runScript(binPath, command);
    } catch (error) {
        process.exit(1);
    }
};

export default build;
