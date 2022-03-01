import { defineConfig } from "tsup";
import copyStaticFiles from "esbuild-copy-static-files";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    esbuildPlugins: [
        copyStaticFiles({
            src: "./src/assets/styles/styles.min.css",
            dest: "./dist/styles.min.css",
        }),
    ],
    loader: {
        ".svg": "dataurl",
    },
    external: ["react", "react-dom"],
});
