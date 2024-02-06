import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { replaceCoreVersionPlugin } from "../shared/replace-core-version-plugin";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        replaceCoreVersionPlugin,
        lodashReplacePlugin,
        markAsExternalPlugin,
    ],
    esbuildOptions(options) {
        options.keepNames = true;
        options.banner = {
            js: '"use client"',
        };
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
