import { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import { Command, Option } from "commander";
import { updateNotifier } from "src/update-notifier";
import { devtoolsRunner } from "src/commands/devtools";
import { projectScripts } from "../projectScripts";
import { runScript } from "../runScript";
import { getPlatformOptionDescription, getRunnerDescription } from "../utils";
import { isDevtoolsInstalled } from "@utils/package";

const dev = (program: Command) => {
  return program
    .command("dev")
    .description(getRunnerDescription("dev"))
    .allowUnknownOption(true)
    .addOption(
      new Option(
        "-p, --platform <platform>",
        getPlatformOptionDescription(),
      ).choices(
        Object.values(ProjectTypes).filter(
          (type) => type !== ProjectTypes.UNKNOWN,
        ),
      ),
    )
    .addOption(
      new Option(
        "-d, --devtools <devtools>",
        "Start refine's devtools server",
      ).default("true", "true if devtools is installed"),
    )
    .argument("[args...]")
    .action(action);
};

const action = async (
  args: string[],
  { platform, ...params }: { devtools: string; platform: ProjectTypes },
) => {
  const projectType = getProjectType(platform);

  const binPath = projectScripts[projectType].getBin("dev");
  const command = projectScripts[projectType].getDev(args);

  await updateNotifier();

  const devtoolsDefault = await isDevtoolsInstalled();

  const devtools = params.devtools === "false" ? false : devtoolsDefault;

  if (devtools) {
    devtoolsRunner();
  }

  runScript(binPath, command);
};

export default dev;
