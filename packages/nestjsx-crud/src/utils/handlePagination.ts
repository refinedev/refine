import type { RequestQueryBuilder } from "@nestjsx/crud-request";
import type { Pagination } from "@refinedev/core";

export const handlePagination = (
  query: RequestQueryBuilder,
  pagination?: Pagination,
) => {
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  if (mode === "server") {
    query
      .setLimit(pageSize)
      .setPage(current)
      .setOffset((current - 1) * pageSize);
  }

  return query;
};
