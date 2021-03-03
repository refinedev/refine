import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    Sort,
    Filters,
    Pagination,
    BaseRecord,
} from "@interfaces";

interface UseListConfig {
    pagination?: Pagination;
    search?: string;
    sort?: Sort;
    filters?: Filters;
    fields?: string[];
}

const defaultConfig: UseListConfig = {
    pagination: {
        pageSize: 999,
    },
};

export const useList = (
    resource: string,
    config?: UseListConfig,
    queryOptions?: UseQueryOptions<GetListResponse>,
): QueryObserverResult<GetListResponse, unknown> => {
    const { getList } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetListResponse>(
        [`resource/list/${resource}`, { ...(config ?? defaultConfig) }],
        () => getList(resource, config ?? defaultConfig),
        queryOptions ?? { keepPreviousData: true },
    );

    return queryResponse;
};
