import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

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
    onSuccess: "tsc --project tsconfig.declarations.json",
}));
