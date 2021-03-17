import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig } from "antd/lib/table";

import { useResourceWithRoute, useList } from "@hooks";

import { Filters, Sort, ResourceRouterParams } from "@interfaces";

export type useTableProps = {
    permanentFilter?: { [key: string]: number[] | string[] };
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: Sort;
    initialFilter?: Filters;
};

export const useTable = ({
    permanentFilter,
    initialCurrent,
    initialPageSize,
    initialSorter,
    initialFilter,
}: useTableProps) => {
    const defaultCurrent = 1;
    const defaultPageSize = 10;

    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent: initialCurrent ?? defaultCurrent,
        defaultPageSize: initialPageSize ?? defaultPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(initialSorter);
    const [filters, setFilters] = useState<Filters | undefined>(initialFilter);

    const { current, pageSize } = tablePropsSunflower.pagination;

    const { data, isFetching, refetch } = useList(resource.name, {
        pagination: { current, pageSize },
        filters: { ...permanentFilter, ...filters },
        sort: sorter,
    });

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Filters,
        sorter: Sort,
    ) => {
        setFilters(filters);
        setSorter(sorter);

        tablePropsSunflower.onChange(pagination, filters, sorter);

        refetch();
    };

    return {
        tableProps: {
            ...tablePropsSunflower,
            dataSource: data?.data,
            loading: isFetching,
            onChange,
            pagination: {
                ...tablePropsSunflower.pagination,
                total: data?.total,
            },
        },
        refetch,
    };
};
