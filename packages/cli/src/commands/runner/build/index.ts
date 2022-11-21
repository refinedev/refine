import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { getUpdateWarning } from "@commands/check-updates";

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

    runScript(binPath, command);
    getUpdateWarning();
};

export default build;
