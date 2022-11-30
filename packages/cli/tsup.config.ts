import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: ["src/index.ts", "src/cli.ts"],
    splitting: false,
    sourcemap: true,
    dts: false,
    clean: false,
    platform: "node",
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
