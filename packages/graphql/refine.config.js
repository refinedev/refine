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
            src: "./src/dataProvider/options.ts",
            dest: "./providers/graphql/dataProvider/options.ts",
          },
          {
            src: "./src/liveProvider/index.ts",
            dest: "./providers/graphql/liveProvider/index.ts",
          },
          {
            src: "./src/liveProvider/helpers.ts",
            dest: "./providers/graphql/liveProvider/helpers.ts",
          },
          {
            src: "./src/utils/index.ts",
            dest: "./providers/graphql/utils/index.ts",
          },
          {
            src: "./src/utils/graphql.ts",
            dest: "./providers/graphql/utils/graphql.ts",
          },
          {
            src: "./src/utils/getListHelpers.ts",
            dest: "./providers/graphql/utils/getListHelpers.ts",
          },
        ],
        message: `
              **\`Usage\`**

              \`\`\`
              // title: App.tsx
              import dataProvider, { liveProvider } from "providers/graphql";
              import { Client, fetchExchange } from "@urql/core";
              import { createClient } from "graphql-ws";

              const API_URL = "https://api.nestjs-query.refine.dev/graphql";
              const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

              const client = new Client({ url: API_URL, exchanges: [fetchExchange] });

              const wsClient = createClient({ url: WS_URL })

              const App = () => {
                  return (
                      <Refine
                          dataProvider={dataProvider(client)}
                          liveProvider={liveProvider(wsClient)}
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
