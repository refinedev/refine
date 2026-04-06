import type { CursorResponse, GetListParams } from "@refinedev/core";
import createDataProvider, {
  buildPagination,
  defaultOptions,
} from "@refinedev/graphql";
import type { OperationResult } from "@urql/core";

import type { GitHubHistoryConnection, GitHubHistoryResponse } from "../types";
import { graphqlClient, GITHUB_GRAPHQL_API_URL } from "./graphql-client";

const baseDataProvider = createDataProvider(graphqlClient, {
  getList: {
    buildVariables: (params: GetListParams) => {
      return {
        ...defaultOptions.getList.buildVariables(params),
        ...getPaginationVariables(params.pagination),
      };
    },
    dataMapper: (
      response: OperationResult<GitHubHistoryResponse>,
      params: GetListParams,
    ): GitHubHistoryConnection["nodes"] => {
      return getHistoryConnection(response, params)?.nodes ?? [];
    },
    getTotalCount: (
      response: OperationResult<GitHubHistoryResponse>,
      params: GetListParams,
    ) => {
      return getHistoryConnection(response, params)?.totalCount;
    },
    getCursor: (
      response: OperationResult<GitHubHistoryResponse>,
      params: GetListParams,
    ) => {
      return getCursor(response, params);
    },
  },
});

export const dataProvider = {
  ...baseDataProvider,
  getApiUrl: () => {
    return GITHUB_GRAPHQL_API_URL;
  },
};

const connectionPathByResource: Record<string, string> = {
  commits: "repository.defaultBranchRef.target.history",
};

// GitHub's GraphQL API uses Relay-style cursor variables for commit history.
const getPaginationVariables = (pagination: GetListParams["pagination"]) => {
  if (pagination?.mode !== "cursor") {
    return buildPagination(pagination);
  }

  const { pageSize = 10, cursor } = pagination;

  if (
    cursor?.direction === "before" &&
    (typeof cursor.current === "string" || typeof cursor.current === "number")
  ) {
    return {
      last: pageSize,
      before: cursor.current,
    };
  }

  if (
    typeof cursor?.current === "string" ||
    typeof cursor?.current === "number"
  ) {
    return {
      first: pageSize,
      after: cursor.current,
    };
  }

  return {
    first: pageSize,
  };
};

// Reads a nested value from the GraphQL response using the configured path.
const getValueAtPath = (
  value: Record<string, any> | undefined,
  path: string | string[] | undefined,
) => {
  if (!value || !path) {
    return undefined;
  }

  const segments = Array.isArray(path) ? path : path.split(".").filter(Boolean);

  let currentValue: any = value;

  for (const segment of segments) {
    if (currentValue == null || typeof currentValue !== "object") {
      return undefined;
    }

    currentValue = currentValue[segment];
  }

  return currentValue;
};

// Resolves the connection object for the current resource.
const getHistoryConnection = (
  response: OperationResult<GitHubHistoryResponse>,
  params: GetListParams,
) => {
  const connectionPath = connectionPathByResource[params.resource];
  const connection = getValueAtPath(response.data, connectionPath) as
    | GitHubHistoryConnection
    | undefined;

  return connection;
};

const getCursor = (
  response: OperationResult<GitHubHistoryResponse>,
  params: GetListParams,
): CursorResponse | undefined => {
  const pageInfo = getHistoryConnection(response, params)?.pageInfo;

  if (!pageInfo) {
    return undefined;
  }

  return {
    ...(pageInfo.hasNextPage && pageInfo.endCursor
      ? { next: pageInfo.endCursor }
      : {}),
    ...(pageInfo.hasPreviousPage && pageInfo.startCursor
      ? { prev: pageInfo.startCursor }
      : {}),
  };
};
