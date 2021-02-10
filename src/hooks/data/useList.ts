import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetListResponse, IDataContext, Sort, Pagination } from "@interfaces";

interface UseListConfig {
    pagination?: Pagination;
    search?: string;
    sort?: Sort;
    filter?: Record<string, unknown>;
}

const defaultConfig: UseListConfig = {
    pagination: {
        pageSize: 999
    }
};

const defaultOptions: UseQueryOptions<GetListResponse> = {
    keepPreviousData: true
};

export const useList = (
    resource: string,
    config = defaultConfig,
    queryOptions = defaultOptions
): QueryObserverResult<GetListResponse, unknown> => {
    const { getList } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useList hook.");
    }

    const queryResponse = useQuery<GetListResponse>(
        [`resource/list/${resource}`, { ...config }],
        () => getList(resource, config),
        queryOptions
    );

    return queryResponse;
};
