import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: "globalThis",
            },
            // Enable esbuild polyfill plugins
            plugins: [
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true,
                }),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
    build: {
        rollupOptions: {
            plugins: [rollupNodePolyFill()],
        },
    },
});
