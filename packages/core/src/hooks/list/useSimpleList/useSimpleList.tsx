import { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { ListProps } from "antd/lib/list";

import { useResourceWithRoute, useList } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
} from "../../../interfaces";

export type useSimpleListProps<TData> = ListProps<TData> & {
    resource?: string;
    filters?: CrudFilters;
    sorter?: CrudSorting;
} & SuccessErrorNotification;

export type useSimpleListReturnType<TData extends BaseRecord = BaseRecord> = {
    listProps: ListProps<TData>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
};

export const useSimpleList = <TData extends BaseRecord = BaseRecord>({
    resource: resourceFromProp,
    filters,
    sorter,
    successNotification,
    errorNotification,
    ...listProps
}: useSimpleListProps<TData> = {}): useSimpleListReturnType<TData> => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    let defaultPageSize = 10;
    if (listProps.pagination && listProps.pagination.pageSize) {
        defaultPageSize = listProps.pagination.pageSize;
    }

    let defaultCurrent = 1;
    if (listProps.pagination && listProps.pagination.current) {
        defaultCurrent = listProps.pagination.current;
    }

    const [current, setCurrent] = useState(defaultCurrent);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const queryResult = useList<TData>(
        resource.name,
        {
            pagination: {
                current,
                pageSize,
            },
            filters,
            sort: sorter,
        },
        undefined,
        successNotification,
        errorNotification,
    );
    const { data, isFetching } = queryResult;

    const onChange = (page: number, pageSize?: number): void => {
        setCurrent(page);
        setPageSize(pageSize || 10);
    };

    return {
        listProps: {
            ...listProps,
            dataSource: data?.data,
            loading: isFetching,
            pagination: {
                ...listProps.pagination,
                total: data?.total,
                pageSize,
                current,
                onChange,
            },
        },
        queryResult,
    };
};
