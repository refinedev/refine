import { defineConfig } from "tsup";

import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [removeTestIdsPlugin, markAsExternalPlugin],
    loader: {
        ".svg": "dataurl",
    },
    esbuildOptions(options) {
        options.keepNames = true;
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
