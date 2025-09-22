import qs from "qs";
import type { ParsedParams } from "@refinedev/core";

export const parseTableParams = (search: string) => {
  const parsed: ParsedParams = qs.parse(search, { ignoreQueryPrefix: true });

  const tableReady = {
    ...parsed,
    pagination: {
      currentPage: parsed.currentPage,
      pageSize: parsed.pageSize,
    },
  };

  delete tableReady.currentPage;
  delete tableReady.pageSize;

  return tableReady;
};
