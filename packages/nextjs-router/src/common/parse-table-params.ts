import qs from "qs";
import { pickNotDeprecated, type ParsedParams } from "@refinedev/core";

const parseTableParams = (search: string) => {
  const parsed: ParsedParams = qs.parse(search, { ignoreQueryPrefix: true });

  const prefferedPage = pickNotDeprecated(parsed.page, parsed.current);

  const tableReady = {
    ...parsed,
    pagination: {
      page: prefferedPage,
      current: prefferedPage,
      pageSize: parsed.pageSize,
    },
  };

  delete tableReady.current;
  delete tableReady.pageSize;

  return tableReady;
};

export default parseTableParams;
