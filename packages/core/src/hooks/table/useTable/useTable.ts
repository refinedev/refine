import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";

import { useResourceWithRoute, useList } from "@hooks";

import { Filters, Sort, ResourceRouterParams } from "@interfaces";

export type useTableProps = {
    permanentFilter?: { [key: string]: number[] | string[] };
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: Sort;
    initialFilter?: Filters;
};

type useTable = {
    tableProps: TableProps<any>;
    sorter?: Sort;
    filters?: Filters;
};

export const useTable = ({
    permanentFilter,
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
}: useTableProps): useTable => {
    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent: initialCurrent,
        defaultPageSize: initialPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(initialSorter);
    const [filters, setFilters] = useState<Filters | undefined>(initialFilter);

    const {
        current,
        pageSize,
        defaultCurrent,
    } = tablePropsSunflower.pagination;

    const { data, isFetching, refetch } = useList(resource.name, {
        pagination: { current: current ?? defaultCurrent, pageSize },
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
        sorter,
        filters,
    };
};
