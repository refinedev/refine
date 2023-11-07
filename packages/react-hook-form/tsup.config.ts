import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";

export default defineConfig({
    entry: ["src/index.ts"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [lodashReplacePlugin, markAsExternalPlugin],
    esbuildOptions(options) {
        options.keepNames = true;
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
