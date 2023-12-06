import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    projects: {
        "app-crm": {
            schema: "https://api.crm.refine.dev/graphql",
        },
    },
};

export default config;
