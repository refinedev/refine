import { QueryKey } from "@tanstack/react-query";

import { UseListConfig } from "@hooks/data/useList";
import { BaseKey } from "src/interfaces";

export interface IQueryKeys {
    all: QueryKey;
    resourceAll: QueryKey;
    list: (config?: UseListConfig | undefined) => QueryKey;
    many: (ids?: BaseKey[]) => QueryKey;
    detail: (id: BaseKey) => QueryKey;
    logList: (meta?: Record<number | string, any>) => QueryKey;
}
