import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import qs, { StringifyOptions } from "query-string";

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
    initialCurrent,
    initialPageSize,
    initialSorter,
    initialFilter,
}: useTableProps): useTable => {
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

        // synchronize with url
        const options: StringifyOptions = {
            arrayFormat: "bracket",
            skipNull: false,
        };
        const qsFilters = qs.stringify(filters, options);
        let qsSorter = "";

        if (Array.isArray(sorter)) {
            const sortItems = sorter.map((item) => {
                const { field, order } = item;
                if (field && order) {
                    return {
                        [field as string]: order,
                    };
                }
                return;
            });
            qsSorter = qs.stringify(Object.assign({}, ...sortItems), options);
        } else {
            qsSorter = qs.stringify(
                { [sorter.field as string]: sorter.order },
                options,
            );
        }

        console.log("filters", qsFilters);
        console.log("sorter", qsSorter);

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
