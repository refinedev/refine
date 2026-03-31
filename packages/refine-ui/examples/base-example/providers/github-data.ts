import type { DataProvider } from "@refinedev/core";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// NOTE: GitHub's GraphQL API requires authentication.
// Set NEXT_PUBLIC_GITHUB_TOKEN in your .env file to use this provider.
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function graphql<T>(query: string, variables: Record<string, unknown>) {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await response.json()) as { data: T; errors?: unknown[] };

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}

type PullRequestNode = {
  number: number;
  title: string;
  state: string;
  createdAt: string;
  author: { login: string } | null;
  labels: { nodes: { name: string; color: string }[] };
};

type PullRequestsResponse = {
  repository: {
    pullRequests: {
      nodes: PullRequestNode[];
      pageInfo: {
        endCursor: string | null;
        startCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  };
};

const PULL_REQUESTS_QUERY = `
  query($owner: String!, $name: String!, $first: Int, $last: Int, $after: String, $before: String) {
    repository(owner: $owner, name: $name) {
      pullRequests(first: $first, last: $last, after: $after, before: $before, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          number
          title
          state
          createdAt
          author { login }
          labels(first: 5) { nodes { name color } }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

type CursorParam =
  | { after: string }
  | { before: string }
  | Record<string, never>;

export const githubDataProvider: DataProvider = {
  getList: async ({ pagination, meta }) => {
    const pageSize = pagination?.pageSize || 10;
    const cursor = (meta?.cursor ?? {}) as CursorParam;

    // Forward pagination uses `first` + `after`
    // Backward pagination uses `last` + `before`
    const isBackward = "before" in cursor;

    const data = await graphql<PullRequestsResponse>(PULL_REQUESTS_QUERY, {
      owner: "refinedev",
      name: "refine",
      first: isBackward ? null : pageSize,
      last: isBackward ? pageSize : null,
      after: "after" in cursor ? cursor.after : null,
      before: "before" in cursor ? cursor.before : null,
    });

    const { nodes, pageInfo } = data.repository.pullRequests;

    // Map nodes to include an `id` field (required by Refine)
    const records = nodes.map((node) => ({
      id: node.number,
      ...node,
    }));

    return {
      data: records as any,
      total: 0,
      // Extra fields — accessible via tableQuery.data
      cursor: {
        next: pageInfo.endCursor,
        prev: pageInfo.startCursor,
      },
      hasNextPage: pageInfo.hasNextPage,
      hasPreviousPage: pageInfo.hasPreviousPage,
    };
  },
  getOne: async () => {
    throw new Error("Not implemented");
  },
  create: async () => {
    throw new Error("Not implemented");
  },
  update: async () => {
    throw new Error("Not implemented");
  },
  deleteOne: async () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => GITHUB_GRAPHQL_URL,
};
