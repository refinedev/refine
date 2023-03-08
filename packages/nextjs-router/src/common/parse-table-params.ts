import { parse } from "qs";
import type { ParsedParams } from "@refinedev/core";

export const parseTableParams = (search: string) => {
    const parsed: ParsedParams = parse(search, { ignoreQueryPrefix: true });

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
