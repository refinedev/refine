import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        {
            name: "react-remove-testids",
            setup(build) {
                build.onEnd(async (args) => {
                    // data-testid regexp
                    const regexp = /("data-testid":)(.*?)(?:(,)|(}))/gi;

                    // output files with `*.js`
                    const jsOutputFiles =
                        args.outputFiles?.filter((el) =>
                            el.path.endsWith(".js"),
                        ) ?? [];

                    // replace data-testid in output files
                    for (const jsOutputFile of jsOutputFiles) {
                        const str = new TextDecoder("utf-8").decode(
                            jsOutputFile.contents,
                        );
                        const newStr = str.replace(regexp, "$4");
                        jsOutputFile.contents = new TextEncoder().encode(
                            newStr,
                        );
                    }
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
                build.onLoad({ filter: /.(ts|tsx)$/ }, async (args) => {
                    const contents = await fs.promises.readFile(
                        args.path,
                        "utf8",
                    );

                    const lodashImportRegex =
                        /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;
                    const extension = path.extname(args.path).replace(".", "");

                    const loader = JS_EXTENSIONS.has(extension)
                        ? "jsx"
                        : (extension as any);

                    const lodashImports = contents.match(lodashImportRegex);
                    if (!lodashImports) {
                        return {
                            loader,
                            contents,
                        };
                    }

                    const finalContents = contents.replaceAll(
                        "lodash",
                        "lodash-es",
                    );

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
    loader: {
        ".svg": "dataurl",
    },
});
