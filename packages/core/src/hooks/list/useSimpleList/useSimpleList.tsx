import { useState } from "react";
import { useParams } from "react-router-dom";
import { ListProps } from "antd/lib/list";

import { useResourceWithRoute, useList } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
} from "../../../interfaces";

export type useSimpleListProps<TData> = ListProps<TData> & {
    resource?: string;
    filters?: CrudFilters;
    sorter?: CrudSorting;
};

export type useSimpleListReturnType<TData extends BaseRecord = BaseRecord> = {
    listProps: ListProps<TData>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
};

export const useSimpleList = <TData extends BaseRecord = BaseRecord>({
    resource: resourceFromProp,
    filters,
    sorter,
    ...listProps
}: useSimpleListProps<TData> = {}): useSimpleListReturnType<TData> => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    let defaultPageSize = 10;
    if (listProps.pagination && listProps.pagination.pageSize) {
        defaultPageSize = listProps.pagination.pageSize;
    }

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const { data, isFetching } = useList<TData>(resource.name, {
        pagination: {
            current,
            pageSize,
        },
        filters,
        sort: sorter,
    });

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
    };
};
