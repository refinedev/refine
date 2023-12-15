import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    schema: "https://api.nestjs-query.refine.dev/graphql",
    extensions: {
        codegen: {
            generates: {
                "src/graphql/schema.types.ts": {
                    plugins: ["typescript"],
                    config: {
                        skipTypename: true,
                        enumsAsTypes: true,
                    },
                    hooks: {
                        afterOneFileWrite: ["eslint --fix", "prettier --write"],
                    },
                },
                "src/graphql/types.ts": {
                    preset: "import-types",
                    documents: ["src/**/*.{ts,tsx}"],
                    plugins: ["typescript-operations"],
                    config: {
                        skipTypename: true,
                        enumsAsTypes: true,
                        preResolveTypes: false,
                        useTypeImports: true,
                    },
                    presetConfig: {
                        typesPath: "@/graphql/schema.types",
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
