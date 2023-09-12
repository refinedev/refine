import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { defineConfig } from "tsup";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
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
    ],
    onSuccess: "tsc --project tsconfig.declarations.json",
});
