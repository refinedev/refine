import dataProvider from "./dataProvider/index.ts";
export default dataProvider;

export * from "./dataProvider/index.ts";
export * from "./liveProvider/index.ts";

export {
  GraphQLClient,
  batchRequests,
  gql,
  rawRequest,
  request,
  resolveRequestDocument,
} from "graphql-request";

export type {
  BatchRequestDocument,
  BatchRequestsExtendedOptions,
  BatchRequestsOptions,
  ClientError,
  GraphQLWebSocketClient,
  RawRequestExtendedOptions,
  RawRequestOptions,
  RequestDocument,
  RequestExtendedOptions,
  RequestOptions,
  Variables,
} from "graphql-request";

export * as qqlQueryBuilder from "gql-query-builder";
export * as graphqlWS from "graphql-ws";

export * from "./utils/index.ts";
