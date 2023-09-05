import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import path from "path";
import fs from "fs";

const JS_EXTENSIONS = new Set(["js", "cjs", "mjs"]);

export default defineConfig((tsupOptions) => ({
    entry: ["src/index.ts", "src/cli.ts"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "node",
    dts: false,
    esbuildOptions: (options) => {
        options.define = {
            ...options.define,
            __DEVELOPMENT__: tsupOptions.watch ? "true" : "false",
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
    onSuccess: tsupOptions.watch
        ? "tsc --project tsconfig.declarations.json && npm run start:server"
        : "tsc --project tsconfig.declarations.json",
}));
