import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { updateNotifier } from "src/update-notifier";
import { getRunnerDescription } from "../utils";

const dev = (program: Command) => {
    return program
        .command("dev")
        .description(getRunnerDescription("dev"))
        .allowUnknownOption(true)
        .argument("[args...]")
        .action(action);
};

const action = async (args: string[]) => {
    const projectType = getProjectType();

    const binPath = projectScripts[projectType].getBin("dev");
    const script = projectScripts[projectType].dev;
    const command = [...script, ...args];

    await updateNotifier();

    runScript(binPath, command);
};

export default dev;
