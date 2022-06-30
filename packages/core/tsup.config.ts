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
                // original code: https://github.com/josteph/esbuild-plugin-lodash
                if (build.initialOptions.format === "cjs") {
                    return;
                }
                build.onLoad({ filter: /.*/ }, async (args) => {
                    const contents = await fs.promises.readFile(
                        args.path,
                        "utf8",
                    );
                    let finalContents: string = contents;

                    const extension = path.extname(args.path).replace(".", "");
                    const loader = JS_EXTENSIONS.has(extension)
                        ? "jsx"
                        : (extension as any);

                    // find and replace lodash imports
                    const lodashImportRegex =
                        /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;

                    const lodashImports = contents.match(lodashImportRegex);
                    if (lodashImports) {
                        finalContents = contents.replace("lodash", "lodash-es");
                    }

                    // find version and replace
                    const versionRegex = /const REFINE_VERSION = "\d.\d.\d";/gm;
                    const hasVersion = contents.match(versionRegex);
                    if (hasVersion) {
                        const version = await getRefineCoreVersion();
                        finalContents = contents.replace(
                            versionRegex,
                            `const REFINE_VERSION = "${version}";`,
                        );
                    }

                    return {
                        loader,
                        contents: finalContents,
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
