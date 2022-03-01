import { defineConfig } from "tsup";
import { lodashOptimizeImports } from "@optimize-lodash/esbuild-plugin";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    esbuildPlugins: [lodashOptimizeImports({})],
    external: ["react", "react-dom"],
});
