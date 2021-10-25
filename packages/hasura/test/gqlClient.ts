import { GraphQLClient } from "graphql-request";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL);

client.setHeader("x-hasura-role", "public");

export default client;
