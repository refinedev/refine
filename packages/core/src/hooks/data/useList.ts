import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    Sort,
    Search,
    Filters,
    Pagination,
    BaseRecord,
} from "../../interfaces";

interface UseListConfig {
    pagination?: Pagination;
    search?: Search;
    sort?: Sort;
    filters?: Filters;
}

const defaultConfig: UseListConfig = {
    pagination: {
        pageSize: 999,
    },
};

export const useList = (
    resource: string,
    config?: UseListConfig,
    queryOptions?: UseQueryOptions<GetListResponse<BaseRecord>>,
): QueryObserverResult<GetListResponse<BaseRecord>, unknown> => {
    const { getList } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetListResponse<BaseRecord>>(
        [`resource/list/${resource}`, { ...(config ?? defaultConfig) }],
        () => getList(resource, config ?? defaultConfig),
        queryOptions ?? { keepPreviousData: true },
    );

    return queryResponse;
};
