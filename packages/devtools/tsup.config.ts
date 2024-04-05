import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: true,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildOptions: (options) => {
    options.define = {
      ...options.define,
      __DEV_CONDITION__: "process.env.NODE_ENV",
    };
    options.banner = {
      js: '"use client"',
    };
  },
  esbuildPlugins: [
    lodashReplacePlugin,
    NodeResolvePlugin({
      extensions: [".js", "ts", "tsx", "jsx"],
      onResolved: (resolved) => {
        if (resolved.includes("node_modules")) {
          return {
            external: true,
          };
        }
        return resolved;
      },
    }),
  ],
  onSuccess: "npm run types",
});
