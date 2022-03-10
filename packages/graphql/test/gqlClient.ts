import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);

client.setHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzkzNDY2LCJleHAiOjE2NDg5ODU0NjZ9.5TjmTOLL7x7kcNKpq9MFwI_w1fReF4f-wlir2rocvi8",
);

export default client;
