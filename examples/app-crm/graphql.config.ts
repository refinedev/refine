import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    schema: "https://api.crm.refine.dev/graphql",
    extensions: {
        codegen: {
            generates: {
                "src/interfaces/graphql.ts": {
                    documents: ["src/**/*.tsx"],
                    plugins: ["typescript", "typescript-operations"],
                    config: {
                        skipTypename: true,
                        enumsAsTypes: true,
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
