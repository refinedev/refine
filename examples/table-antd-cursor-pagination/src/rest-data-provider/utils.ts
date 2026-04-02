import type { Pagination } from "@refinedev/core";

export type GitHubCommit = {
  commit?: {
    committer?: {
      date?: string;
    };
  };
};

export const getRequestUrl = ({
  apiUrl,
  resource,
  pageSize,
  cursor,
}: {
  apiUrl: string;
  resource: string;
  pageSize: number;
  cursor: Pagination["cursor"];
}) => {
  if (typeof cursor?.current !== "string") {
    return buildCommitsUrl({
      apiUrl,
      resource,
      perPage: pageSize,
    });
  }

  // GitHub already returns the next and previous page URLs in the Link header.
  // We can use those URLs as opaque cursor values.
  return cursor.current;
};

export const getLinkCursor = ({
  linkHeader,
  rel,
}: {
  linkHeader: string | undefined;
  rel: "next" | "prev";
}) => {
  if (!linkHeader) {
    return undefined;
  }

  const match = linkHeader.match(new RegExp(`<([^>]+)>;\\s*rel="${rel}"`));

  return match?.[1];
};

export const buildCommitsUrl = ({
  apiUrl,
  resource,
  perPage,
}: {
  apiUrl: string;
  resource: string;
  perPage: number;
}) => {
  const url = new URL(`${apiUrl}/${resource}`);

  url.searchParams.set("per_page", `${perPage}`);

  return url.toString();
};
