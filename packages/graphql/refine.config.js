/** @type {import('@refinedev/cli').RefineConfig} */
module.exports = {
    group: "Data Provider",
    swizzle: {
        items: [
            {
                group: "Providers",
                label: "GraphQL",
                requiredPackages: [
                    "graphql-ws@5.9.1",
                    "graphql-request@5.2.0",
                    "gql-query-builder@3.5.5",
                    "camelcase@6.2.0",
                    "graphql@15.6.1",
                    "pluralize@8.0.0",
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
                        src: "./src/utils/generateFilter.ts",
                        dest: "./providers/graphql/utils/generateFilter.ts",
                    },
                    {
                        src: "./src/utils/generateSort.ts",
                        dest: "./providers/graphql/utils/generateSort.ts",
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
              import dataProvider, { liveProvider } from "providers/graphql";

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
