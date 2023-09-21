import graphqlDataProvider, {
    GraphQLClient,
    liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

import { createClient } from "graphql-ws";

import { axiosInstance } from "./axios";

export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = API_BASE_URL + "/graphql";
export const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = new GraphQLClient(API_URL, {
    fetch: async (url: string, options: any) => {
        try {
            const response = await axiosInstance.request({
                data: options.body,
                url,
                ...options,
            });

            return { ...response, data: response.data };
        } catch (error: any) {
            const messages = error
                ?.map((error: any) => error?.message)
                ?.join("");
            const code = error?.[0]?.extensions?.code;

            return Promise.reject({
                message: messages || JSON.stringify(error),
                statusCode: code || 500,
            });
        }
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
