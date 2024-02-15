import { hasIncomatiblePackages, installMissingPackages } from "@utils/package";
import execa from "execa";

export const integrateAntDesign = async () => {
    if (hasIncomatiblePackages(["@remix-run/react", "next"])) return;

    await installMissingPackages(["antd", "@refinedev/antd"]);

    console.log("🚀 Setting up Ant Design...");

    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr } = execa.sync(jscodeshiftExecutable, [
        "./",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${__dirname}/../src/transformers/integrations/ant-design.ts`,
        `--ignore-pattern=.cache`,
        `--ignore-pattern=node_modules`,
        `--ignore-pattern=build`,
        `--ignore-pattern=.next`,
        `--ignore-pattern=dist`,
    ]);

    if (stderr) {
        console.log(stderr);
    }

    console.log("🎉 Ant Design setup completed!");
};
