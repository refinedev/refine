import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildOptions: (options) => {
        options.define = {
            ...options.define,
            __DEV_CONDITION__: "process.env.NODE_ENV",
        };
    },
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
    ],
    onSuccess: "tsc --project tsconfig.declarations.json",
});
