import { defineConfig } from "tsup";
import * as fs from "fs";
import path from "path";
import copyStaticFiles from "esbuild-copy-static-files";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

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
            name: "antd-lib-2-es-module-replacement",
            setup: (build) => {
                if (build.initialOptions.format === "cjs") {
                    return;
                }
                if (build.initialOptions.format === "esm") {
                    build.onLoad(
                        {
                            filter: /\/src\/components\/antd\/(antd|calendar|datePicker|timePicker).*/,
                        },
                        async (args) => {
                            const contents = await fs.promises.readFile(
                                args.path,
                                "utf8",
                            );

                            const extension = path
                                .extname(args.path)
                                .replace(".", "");

                            const loader = JS_EXTENSIONS.has(extension)
                                ? "jsx"
                                : (extension as any);

                            const replacements = [
                                [/antd\/lib\//g, "antd/es/"],
                                [/rc-picker\/lib\//g, "rc-picker/es/"],
                            ] as const;

                            const newContents = replacements.reduce(
                                (acc, [regex, replacement]) =>
                                    acc.replace(regex, replacement),
                                contents,
                            );

                            return {
                                loader,
                                contents: newContents,
                            };
                        },
                    );
                }
            },
        },
        copyStaticFiles({
            src: "./src/assets/styles/reset.css",
            dest: "./dist/reset.css",
        }),
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
    esbuildOptions(options) {
        options.keepNames = true;
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
