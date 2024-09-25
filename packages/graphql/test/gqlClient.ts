import { Client, fetchExchange } from "@urql/core";
import nock from "nock";

export const API_URL = "https://api.nestjs-query.refine.dev/graphql";

const client = new Client({ url: API_URL, exchanges: [fetchExchange] });

export default client;
