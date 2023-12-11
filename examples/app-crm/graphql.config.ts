import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    schema: "https://api.crm.refine.dev/graphql",
    extensions: {
        codegen: {
            generates: {
                "src/interfaces/schema.ts": {
                    plugins: ["typescript"],
                    config: {
                        skipTypename: true,
                        enumsAsTypes: true,
                    },
                    hooks: {
                        afterOneFileWrite: ["eslint --fix", "prettier --write"],
                    },
                },
                "src/": {
                    preset: "near-operation-file",
                    documents: ["src/**/*.tsx"],
                    plugins: ["typescript-operations"],
                    config: {
                        skipTypename: true,
                        enumsAsTypes: true,
                    },
                    presetConfig: {
                        baseTypesPath: "~@/interfaces",
                        extension: ".ts",
                        folder: "gqlTypes",
                        fileName: "index",
                    },
                    hooks: {
                        afterOneFileWrite: ["eslint --fix", "prettier --write"],
                    },
                },
            },
        },
    },
};

export default config;
