import { GraphQLClient } from "graphql-request";

const createClient = (namingConvention: string) => {
    let API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

    if (namingConvention === "graphql-default") {
        API_URL = "https://ruling-redbird-23.hasura.app/v1/graphql";
    }

    const client = new GraphQLClient(API_URL);

    client.setHeader("x-hasura-role", "public");

    return client;
};

export { createClient };
