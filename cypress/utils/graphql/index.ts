export const makeGithubCommitNodes = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    oid: `${prefix}${String(i).padStart(7, "0")}`,
    message: `commit ${prefix}-${i}`,
    authoredDate: "2026-01-01T00:00:00Z",
    committedDate: "2026-01-01T00:00:00Z",
    author: { name: "test", email: "test@test.com", date: "2026-01-01" },
    committer: { name: "test", email: "test@test.com", date: "2026-01-01" },
  }));

export const buildGithubGraphqlResponse = (
  nodes: ReturnType<typeof makeGithubCommitNodes>,
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  },
  typeName: string,
) => ({
  data: {
    repository: {
      defaultBranchRef: {
        target: {
          __typename: typeName,
          history: {
            totalCount: 100,
            nodes,
            pageInfo,
          },
        },
      },
    },
  },
});
