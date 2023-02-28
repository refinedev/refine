import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        pages: "src/pages/index.ts",
        app: "src/app/index.ts",
        legacy: "src/legacy/index.ts",
        "legacy-pages": "src/legacy-pages/index.ts",
        "legacy-app": "src/legacy-app/index.ts",
    },
    outDir: "dist",
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
    ],
    onSuccess: "tsc --project tsconfig.declarations.json",
});
