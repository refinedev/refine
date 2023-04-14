/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
    group: "Data Provider",
    swizzle: {
        items: [
            {
                group: "Providers",
                label: "Hasura",
                requiredPackages: [
                    "lodash-es@4.17.21",
                    "lodash@4.17.21",
                    "graphql-ws@5.9.1",
                    "graphql-request@5.2.0",
                    "gql-query-builder@3.5.5",
                    "camelcase@6.2.0",
                    "graphql@15.6.1",
                ],
                files: [
                    {
                        src: "./src/index.ts",
                        dest: "./providers/graphql/index.ts",
                    },
                    {
                        src: "./src/dataProvider/index.ts",
                        dest: "./providers/graphql/dataProvider/index.ts",
                    },
                    {
                        src: "./src/liveProvider/index.ts",
                        dest: "./providers/graphql/liveProvider/index.ts",
                    },
                    {
                        src: "./src/utils/index.ts",
                        dest: "./providers/graphql/utils/index.ts",
                    },
                    {
                        src: "./src/utils/camelizeKeys.ts",
                        dest: "./providers/graphql/utils/camelizeKeys.ts",
                    },
                    {
                        src: "./src/utils/generateFilters.ts",
                        dest: "./providers/graphql/utils/generateFilters.ts",
                    },
                    {
                        src: "./src/utils/generateSorting.ts",
                        dest: "./providers/graphql/utils/generateSorting.ts",
                    },
                    {
                        src: "./src/utils/generateUseListSubscription.ts",
                        dest: "./providers/graphql/utils/generateUseListSubscription.ts",
                    },
                    {
                        src: "./src/utils/generateUseManySubscription.ts",
                        dest: "./providers/graphql/utils/generateUseManySubscription.ts",
                    },
                    {
                        src: "./src/utils/generateUseOneSubscription.ts",
                        dest: "./providers/graphql/utils/generateUseOneSubscription.ts",
                    },
                ],
                message: `
            **\`Usage\`**

            \`\`\`
            // title: App.tsx
            import dataProvider, { liveProvider, GraphQLClient } from "providers/graphql";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider}
                        liveProvider={liveProvider}
                        /* ... */
                    />
                );
            }
            \`\`\`
            `,
            },
        ],
    },
};
