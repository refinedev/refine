import { hasIncomatiblePackages, installMissingPackages } from "@utils/package";
import execa from "execa";

export const integrateReactRouter = async () => {
    if (hasIncomatiblePackages(["@remix-run/react", "next"])) return;

    await installMissingPackages([
        "react-router-dom",
        "@refinedev/react-router-v6",
    ]);

    console.log("🚀 Setting up React Router...");

    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr } = execa.sync(jscodeshiftExecutable, [
        "./",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${__dirname}/../src/transformers/integrations/react-router.ts`,
        `--ignore-pattern=.cache`,
        `--ignore-pattern=node_modules`,
        `--ignore-pattern=build`,
        `--ignore-pattern=.next`,
        `--ignore-pattern=dist`,
    ]);

    if (stderr) {
        console.log(stderr);
    }

    console.log("🎉 React Router setup completed!");
};
