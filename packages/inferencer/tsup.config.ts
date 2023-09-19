import { defineConfig } from "tsup";

import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";
import { markAsExternalPlugin } from "../shared/mark-as-external-plugin";
import { removeTestIdsPlugin } from "../shared/remove-test-ids-plugin";

export default defineConfig({
    entry: {
        index: "src/index.tsx",
        headless: "src/inferencers/headless/index.tsx",
        mantine: "src/inferencers/mantine/index.tsx",
        mui: "src/inferencers/mui/index.tsx",
        antd: "src/inferencers/antd/index.tsx",
        "chakra-ui": "src/inferencers/chakra-ui/index.tsx",
    },
    outDir: "dist",
    splitting: false,
    sourcemap: true,
    clean: false,
    platform: "browser",
    esbuildPlugins: [
        removeTestIdsPlugin,
        lodashReplacePlugin,
        markAsExternalPlugin,
    ],
    loader: {
        ".svg": "dataurl",
    },
    esbuildOptions(options) {
        options.keepNames = true;
    },
    onSuccess: "tsc --project tsconfig.declarations.json",
});
