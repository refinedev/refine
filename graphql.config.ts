import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    projects: {
        "app-crm": {
            include: ["examples/app-crm"],
            schema: "https://api.crm.refine.dev/graphql",
        },
        "data-provider-nestjs-query": {
            include: ["examples/data-provider-nestjs-quer"],
            schema: "https://api.nestjs-query.refine.dev/graphql",
        },
    },
};

export default config;
