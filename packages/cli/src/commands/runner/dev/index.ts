import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";

const dev = (program: Command) => {
    return program
        .command("dev")
        .description("Starts the `refine` development server.")
        .allowUnknownOption(true)
        .argument("[args...]")
        .action(action);
};

const action = (args: string[]) => {
    const projectType = getProjectType();

    const binPath = projectScripts[projectType].getBin("dev");
    const script = projectScripts[projectType].dev;
    const command = [...script, ...args];

    runScript(binPath, command);
};

export default dev;
