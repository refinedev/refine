import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";

const createClient = (url: string, options?: RequestInit) => {
    return new GraphQLClient(url, options);
};

export { createClient };
