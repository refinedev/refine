import { Client, fetchExchange } from "@urql/core";

export const GITHUB_GRAPHQL_API_URL = "https://api.github.com/graphql";

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

export const graphqlClient = new Client({
  url: GITHUB_GRAPHQL_API_URL,
  exchanges: [fetchExchange],
  fetchOptions: () =>
    githubToken
      ? {
          headers: {
            Authorization: `Bearer ${githubToken}`,
          },
        }
      : {},
});
