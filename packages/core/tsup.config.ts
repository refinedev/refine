import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.tsx"],
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom"],
});
