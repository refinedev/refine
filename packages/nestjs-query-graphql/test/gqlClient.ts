import { GraphQLClient } from "graphql-request";

const API_URL = "http://localhost:3003/graphql";

const client = new GraphQLClient(API_URL);

export default client;
