import dataProvider from "./dataProvider";

export * from "./dataProvider";
export * from "./interfaces";
export * from "./liveProvider";
export * as qqlQueryBuilder from "gql-query-builder";
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
export {
  batchRequests,
  gql,
  GraphQLClient,
  rawRequest,
  request,
  resolveRequestDocument,
} from "graphql-request";
export * as graphqlWS from "graphql-ws";

export default dataProvider;
