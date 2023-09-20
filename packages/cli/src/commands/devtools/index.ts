import { Argument, Command } from "commander";
import { server } from "@refinedev/devtools-server";
import { addDevtoolsComponent } from "@transformers/add-devtools-component";
import {
    getPackageJson,
    installPackagesSync,
    isDevtoolsInstalled,
} from "@utils/package";
import { hasDefaultScript } from "@utils/refine";

type DevtoolsCommand = "start" | "init";
const commands: DevtoolsCommand[] = ["start", "init"];
const defaultCommand: DevtoolsCommand = "start";

const load = (program: Command) => {
    return program
        .command("devtools")
        .description("Start refine's devtools server; it starts on port 5001.")
        .addArgument(
            new Argument("[command]", "devtools related commands")
                .choices(commands)
                .default(defaultCommand),
        )
        .addHelpText(
            "after",
            `
Commands:
    start     Start refine's devtools server
    init      Install refine's devtools client and adds it to your project
`,
        )
        .action(action);
};

export const action = async (command: DevtoolsCommand) => {
    switch (command) {
        case "start":
            devtoolsRunner();
            return;
        case "init":
            devtoolsInstaller();
            return;
    }
};

const devtoolsInstaller = async () => {
    // const isInstalled = await spinner(
    //     isDevtoolsInstalled,
    //     "Checking if devtools is installed...",
    // );

    // if (isInstalled) {
    //     console.log("🎉 refine devtools is already installed");
    //     return;
    // }

    console.log("🌱 Installing refine devtools...");
    await installPackagesSync(["@refinedev/devtools@latest"]);
    console.log("🌱 Adding devtools component to your project....");
    await addDevtoolsComponent();
    console.log(
        "✅ refine devtools package and components added to your project",
    );

    // empty line
    console.log("");

    const { dev } = hasDefaultScript();
    if (dev === "default") {
        console.log(
            `🙌 You're good to go. "npm run dev" will automatically starts the devtools server.`,
        );
        console.log(
            `👉 You can also start the devtools server manually by running "refine devtools start"`,
        );
        return;
    }

    if (dev === "modified") {
        const scriptDev = getPackageJson().scripts?.dev;

        console.log(
            `🚨 Your have modified the "dev" script in your package.json. Because of that, "npm run dev" will not start the devtools server automatically.`,
        );
        console.log(`👉 You can append "refine devtools" to "dev" script`);
        console.log(
            `👉 You can start the devtools server manually by running "refine devtools start"`,
        );

        console.log(`
"scripts": {
    "dev": "${scriptDev} & refine devtools",
    "refine: "refine",
    // other scripts
},
        `);
    }
};

export const devtoolsRunner = () => {
    server();
};

export default load;
