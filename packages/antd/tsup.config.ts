import { defineConfig } from "tsup";
import copyStaticFiles from "esbuild-copy-static-files";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        copyStaticFiles({
            src: "./src/assets/styles/styles.min.css",
            dest: "./dist/styles.min.css",
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
});
