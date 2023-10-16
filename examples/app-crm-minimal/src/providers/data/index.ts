import graphqlDataProvider, {
    GraphQLClient,
    liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

import { createClient } from "graphql-ws";

import nookies from "nookies";

export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = API_BASE_URL + "/graphql";
export const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = new GraphQLClient(API_URL, {
    fetch: async (url: string, options: any) => {
        try {
            const cookies = nookies.get();
            const accessToken = cookies?.["access_token"];

            const response = await fetch(url, {
                ...options,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Apollo-Require-Preflight": "true",
                    ...options.headers,
                },
            });
            const responseClone = response.clone();
            const body = await responseClone.json();
            handleErrors(body);

            return response;
        } catch (error) {
            console.log("fetch error", error);
            return Promise.reject(error);
        }
    },
});

export const wsClient =
    typeof window !== "undefined"
        ? createClient({
              url: WS_URL,
              connectionParams: () => {
                  const cookies = nookies.get();
                  const accessToken = cookies?.["access_token"];

                  return {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                  };
              },
          })
        : undefined;

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = wsClient
    ? graphqlLiveProvider(wsClient)
    : undefined;

const handleErrors = (body: any) => {
    if (!body) return null;

    if ("errors" in body) {
        const errors = body?.errors;
        const messages = errors?.map((error: any) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;
        if (!errors) return body;

        throw {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500,
        };
    }
};
