import graphqlDataProvider, {
    GraphQLClient,
    liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query-graphql";

import { createClient } from "graphql-ws";

export const API_URL = "https://api.crm.refine.dev/graphql";
export const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = new GraphQLClient(API_URL, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const wsClient = createClient({
    url: WS_URL,
    connectionParams: () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    }),
});

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = graphqlLiveProvider(wsClient);
