import { Plugin } from "esbuild";
import * as fs from "fs";
import path from "path";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export const lodashReplacePlugin: Plugin = {
    name: "replaceLodashWithLodashEsForEsm",
    setup: (build) => {
        // original code: https://github.com/josteph/esbuild-plugin-lodash
        if (build.initialOptions.format === "cjs") {
            return;
        }

        build.onLoad({ filter: /.*/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, "utf8");

            const extension = path.extname(args.path).replace(".", "");
            const loader = JS_EXTENSIONS.has(extension)
                ? "jsx"
                : (extension as any);

            const lodashImportRegex =
                /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)[\'\"](?:(?:lodash\/?.*?))[\'\"][\s]*?(?:;|$|)/g;

            const isExternal = !args.path.startsWith(process.cwd());

            const lodashImports = contents.match(lodashImportRegex);
            if (!lodashImports || isExternal) {
                return;
            }

            return {
                loader,
                contents: contents.replace(/lodash/g, "lodash-es"),
            };
        });
    },
};
