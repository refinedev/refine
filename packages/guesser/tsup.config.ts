import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: {
        index: "src/index.tsx",
        mantine: "src/guessers/mantine/index.ts",
        mui: "src/guessers/mui/index.ts",
        antd: "src/guessers/antd/index.ts",
    },
    outDir: "dist",
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
    onSuccess: "tsc --project tsconfig.declarations.json",
});
