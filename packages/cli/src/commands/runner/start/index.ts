import { Command } from "commander";
import { getProjectType } from "@utils/project";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";

const start = (program: Command) => {
    return program
        .command("start")
        .description("Starts the `refine` production server.")
        .allowUnknownOption(true)
        .argument("[args...]")
        .action(action);
};

const action = async (args: string[]) => {
    const projectType = getProjectType();

    const binPath = projectScripts[projectType].getBin("start");
    const script = projectScripts[projectType].start;
    const command = [...script, ...args];

    runScript(binPath, command);
};

export default start;
