import { defineConfig } from "tsup";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [markAsExternalPlugin],
    loader: {
        ".svg": "dataurl",
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
