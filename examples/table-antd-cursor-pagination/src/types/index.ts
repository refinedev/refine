export type GitHubActor = {
  name: string | null;
  email: string | null;
  date: string | null;
};

export type GitHubPageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type GitHubCommit = {
  oid: string;
  message: string;
  authoredDate: string;
  committedDate: string;
  author: GitHubActor | null;
  committer: GitHubActor | null;
};

export type GitHubHistoryConnection = {
  nodes: GitHubCommit[];
  totalCount?: number;
  pageInfo: GitHubPageInfo;
};

export type GitHubHistoryResponse = {
  repository?: {
    defaultBranchRef?: {
      target?: {
        __typename?: string;
        history?: GitHubHistoryConnection;
      } | null;
    } | null;
  } | null;
};
