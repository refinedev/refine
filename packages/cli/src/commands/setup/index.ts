import { setupAntD } from "@transformers/setup/antd";
import { setupReactRouter } from "@transformers/setup/react-router";
import { hasIncomatiblePackages, installMissingPackages } from "@utils/package";
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
    if (hasIncomatiblePackages(["@remix-run/react", "next"])) return;

    await installMissingPackages(["antd", "@refinedev/antd"]);

    console.log("🚀 Setting up Ant Design...");

    await setupAntD();

    console.log("🎉 Ant Design setup completed!");
};

const setupReactRouterAction = async () => {
    if (hasIncomatiblePackages(["@remix-run/react", "next"])) return;

    await installMissingPackages([
        "react-router-dom",
        "@refinedev/react-router-v6",
    ]);

    console.log("🚀 Setting up React Router...");

    await setupReactRouter();

    console.log("🎉 React Router setup completed!");
};

export default load;
