import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

const getRefineCLIVersion = async () => {
    const packages = await fs.promises.readFile("./package.json", "utf8");
    const { version } = JSON.parse(packages);
    return version;
};

export default defineConfig({
    entry: ["src/index.ts", "src/cli.ts"],
    splitting: false,
    sourcemap: true,
    dts: false,
    clean: false,
    platform: "node",
    esbuildPlugins: [
        {
            name: "textReplace",
            setup: (build) => {
                build.onLoad({ filter: /\.ts$/ }, async (args) => {
                    const contents = await fs.promises.readFile(
                        args.path,
                        "utf8",
                    );

                    const extension = path.extname(args.path).replace(".", "");
                    const loader = JS_EXTENSIONS.has(extension)
                        ? "jsx"
                        : (extension as any);

                    const versionRegex =
                        /const REFINE_CLI_VERSION = "\d.\d.\d";/gm;
                    const hasVersion = contents.match(versionRegex);

                    if (!hasVersion) {
                        return {
                            loader,
                            contents,
                        };
                    }

                    const version = await getRefineCLIVersion();
                    return {
                        loader,
                        contents: contents.replace(
                            versionRegex,
                            `const REFINE_CLI_VERSION = "${version}";`,
                        ),
                    };
                });
            },
        },
        NodeResolvePlugin({
            extensions: [".js", "ts", "tsx", "jsx"],
            onResolved: (resolved) => {
                if (resolved.includes("node_modules")) {
                    return {
                        external: true,
                    };
                }
                return resolved;
            },
        }),
    ],
    onSuccess: "tsc --project tsconfig.declarations.json",
});
