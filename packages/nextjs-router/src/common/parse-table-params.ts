import qs from "qs";
import type { ParsedParams } from "@refinedev/core";

const parseTableParams = (search: string) => {
  const parsed: ParsedParams = qs.parse(search, { ignoreQueryPrefix: true });

  const tableReady = {
    ...parsed,
    pagination: {
      current: parsed.current,
      pageSize: parsed.pageSize,
    },
  };

  delete tableReady.current;
  delete tableReady.pageSize;

  return tableReady;
};

export default parseTableParams;
