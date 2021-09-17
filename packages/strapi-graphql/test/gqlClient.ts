import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);

client.setHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxNzk1ODUyLCJleHAiOjE2MzQzODc4NTJ9.d7-y7lmdWv_duYJ7kEvupXnu6k9N7zWmX4UDBrTaT2I",
);

export default client;
