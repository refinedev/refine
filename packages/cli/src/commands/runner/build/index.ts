import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { updateNotifier } from "src/update-notifier";

const build = (program: Command) => {
    return program
        .command("build")
        .description("Create a production build of your `refine` app.")
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

    runScript(binPath, command);
};

export default build;
