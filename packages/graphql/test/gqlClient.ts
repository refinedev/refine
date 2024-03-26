import { GraphQLClient } from "graphql-request";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);

client.setHeader(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwMjU0NjcwLCJleHAiOjE3MTI4NDY2NzB9.Ivs2gsrKrZjNf-4dewSxocIlaQo2RLWAXx7AkdMZYvQ",
);

client.setHeader("Accept-Encoding", "identity");

export default client;
