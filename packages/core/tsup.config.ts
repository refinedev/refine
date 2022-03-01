import { defineConfig } from "tsup";
import lodashTransformer from "esbuild-plugin-lodash";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom"],
    esbuildPlugins: [
        lodashTransformer({
            outLodashPackage: "lodash-es",
        }),
    ],
});
