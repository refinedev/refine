import { defineConfig, Options } from "tsup";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

const sharedConfig: Partial<Options> = {
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: false,
  platform: "browser",
  esbuildPlugins: [
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
  onSuccess: "tsc --project tsconfig.declarations.json",
};

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      app: "src/app/index.ts",
    },
    esbuildOptions(options) {
      options.banner = {
        js: '"use client"',
      };
    },
    ...sharedConfig,
  },
  {
    entry: {
      pages: "src/pages/index.ts",
    },
    ...sharedConfig,
  },
  {
    entry: {
      "parse-table-params": "src/common/parse-table-params.ts",
    },
    ...sharedConfig,
  },
]);
