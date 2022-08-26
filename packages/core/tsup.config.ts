import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

const getRefineCoreVersion = async () => {
    const packages = await fs.promises.readFile("./package.json", "utf8");
    const { version } = JSON.parse(packages);
    return version;
};

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
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

                    const versionRegex = /const REFINE_VERSION = "\d.\d.\d";/gm;
                    const hasVersion = contents.match(versionRegex);

                    if (!hasVersion) {
                        return {
                            loader,
                            contents,
                        };
                    }

                    const version = await getRefineCoreVersion();
                    return {
                        loader,
                        contents: contents.replace(
                            versionRegex,
                            `const REFINE_VERSION = "${version}";`,
                        ),
                    };
                });
            },
        },
        {
            name: "textReplace",
            setup: (build) => {
                // original code: https://github.com/josteph/esbuild-plugin-lodash
                if (build.initialOptions.format === "cjs") {
                    return;
                }
                build.onLoad({ filter: /.*/ }, async (args) => {
                    const contents = await fs.promises.readFile(
                        args.path,
                        "utf8",
                    );

                    const extension = path.extname(args.path).replace(".", "");
                    const loader = JS_EXTENSIONS.has(extension)
                        ? "jsx"
                        : (extension as any);

                    const lodashImportRegex =
                        /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;

                    const lodashImports = contents.match(lodashImportRegex);
                    if (!lodashImports) {
                        return {
                            loader,
                            contents,
                        };
                    }

                    return {
                        loader,
                        contents: contents.replaceAll("lodash", "lodash-es"),
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
});
