import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { useHistory } from "react-router-dom";

import { useResourceWithRoute, useList } from "@hooks";
import { Filters, Sort, ResourceRouterParams } from "@interfaces";
import { stringifyTableParams, parseTableParams } from "@definitions/table";

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
    const { search } = useLocation();

    // synchronize with url
    const {
        parsedCurrent,
        parsedPageSize,
        parsedSorter,
        parsedFilters,
    } = parseTableParams({
        initialSorter,
        initialFilter,
        url: search,
    });

    const defaultCurrent = parsedCurrent || 1;
    const defaultPageSize = parsedPageSize || 10;

    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent: initialCurrent ?? defaultCurrent,
        defaultPageSize: initialPageSize ?? defaultPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    const history = useHistory();

    const resource = useResourceWithRoute(routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(parsedSorter);
    const [filters, setFilters] = useState<Filters | undefined>(parsedFilters);

    const { current, pageSize } = tablePropsSunflower.pagination;

    const { data, isFetching } = useList(resource.name, {
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
        const stringifyParams = stringifyTableParams({ sorter, filters });

        return history.push(
            `/resources/${resource.name}?current=${pagination.current}&pageSize=${pagination.pageSize}&${stringifyParams}`,
        );
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
