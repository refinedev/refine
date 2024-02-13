import { setupAntD } from "@transformers/setup/antd";
import { setupReactRouter } from "@transformers/setup/react-router";
import { installPackagesSync } from "@utils/package";
import { Argument, Command } from "commander";

const load = (program: Command) => {
    return program
        .command("setup")
        .addArgument(
            new Argument("[library]", "Setup library").choices([
                "react-router",
                "antd",
            ]),
        )
        .action(action);
};

const action = async (library: string) => {
    if (library === "antd") {
        await setupAntDAction();
    }

    if (library === "react-router") {
        await setupReactRouterAction();
    }
};

const setupAntDAction = async () => {
    console.log("🌱 Installing antd, @refinedev/antd packages...");

    // await installPackagesSync(["antd", "@refinedev/antd"]);

    // empty line
    console.log("");
    console.log("");

    console.log("🚀 Setting up antd...");

    await setupAntD();

    console.log("🎉 antd setup completed!");
};

const setupReactRouterAction = async () => {
    console.log(
        "🌱 Installing react-router-dom, @refinedev/react-router-v6 packages...",
    );

    // await installPackagesSync([
    //     "react-router-dom",
    //     "@refinedev/react-router-v6",
    // ]);

    // empty line
    console.log("");
    console.log("");

    console.log("🚀 Setting up react-router...");

    await setupReactRouter();

    console.log("🎉 react-router setup completed!");
};

export default load;
