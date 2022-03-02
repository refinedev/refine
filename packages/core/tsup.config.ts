import { defineConfig } from "tsup";
import lodashTransformer from "esbuild-plugin-lodash";

import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export default defineConfig((options) => {
    console.log(options);
    return {
        entry: ["src/index.tsx"],
        splitting: false,
        sourcemap: true,
        clean: false,
        external: ["react", "react-dom"],
        esbuildPlugins: [
            {
                name: "lodash",
                setup: (build) => {
                    if (build.initialOptions.format === "cjs") {
                        lodashTransformer({
                            outLodashPackage: "lodash",
                        }).setup(build);
                    }
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

                        const lodashImportRegex =
                            /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;
                        const extension = path
                            .extname(args.path)
                            .replace(".", "");

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
        ],
    };
});
