import { QueryKey } from "@tanstack/react-query";

import { UseListConfig } from "@hooks/data/useList";
import { BaseKey, CrudFilters, CrudSorting, Pagination } from "src/interfaces";

export interface IQueryKeys {
    all: QueryKey;
    resourceAll: QueryKey;
    list: (
        config?:
            | UseListConfig
            | {
                  pagination?: Required<Pagination>;
                  hasPagination?: boolean;
                  sorters?: CrudSorting;
                  filters?: CrudFilters;
              }
            | undefined,
    ) => QueryKey;
    many: (ids?: BaseKey[]) => QueryKey;
    detail: (id?: BaseKey) => QueryKey;
    logList: (meta?: Record<number | string, any>) => QueryKey;
}
