import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);

client.setHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwODU2NzUzLCJleHAiOjE2NDM0NDg3NTN9.8vzOs3CbB--_O7DnmzCVeSimCWZKw6rXYrA4bNGQC7E",
);

export default client;
