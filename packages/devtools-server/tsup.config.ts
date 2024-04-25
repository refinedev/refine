import { defineConfig } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { lodashReplacePlugin } from "../shared/lodash-replace-plugin";

export default defineConfig((tsupOptions) => ({
  entry: ["src/index.ts", "src/cli.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  minify: true,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "node",
  esbuildOptions: (options) => {
    options.define = {
      ...options.define,
      __DEVELOPMENT__: tsupOptions.watch ? "true" : "false",
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
}));
