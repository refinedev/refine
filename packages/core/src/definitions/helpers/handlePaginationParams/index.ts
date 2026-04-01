import type { Pagination } from "../../../contexts/data/types";

type HandlePaginationParamsProps = {
  pagination?: Pagination;
};

export const handlePaginationParams = ({
  pagination,
}: HandlePaginationParamsProps = {}): Pagination => {
  const mode = pagination?.mode ?? "server";

  const currentPage = pagination?.currentPage ?? 1;

  const pageSize = pagination?.pageSize ?? 10;

  let cursor: Pagination["cursor"] | undefined;

  if (pagination?.cursor) {
    cursor = {};

    if (pagination.cursor.current !== undefined) {
      cursor.current = pagination.cursor.current;
    }

    if (pagination.cursor.next !== undefined) {
      cursor.next = pagination.cursor.next;
    }

    if (pagination.cursor.prev !== undefined) {
      cursor.prev = pagination.cursor.prev;
    }

    if (
      pagination.cursor.current !== undefined ||
      pagination.cursor.direction !== undefined
    ) {
      cursor.direction = pagination.cursor.direction ?? "after";
    }
  }

  return {
    currentPage,
    pageSize,
    mode,
    ...(cursor ? { cursor } : {}),
  };
};
