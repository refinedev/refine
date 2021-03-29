import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { useHistory } from "react-router-dom";

import { useResourceWithRoute, useList } from "@hooks";
import { Filters, Sort, ResourceRouterParams } from "../../../interfaces";
import {
    stringifyTableParams,
    parseTableParams,
    merge,
} from "@definitions/table";
import { useSyncWithLocation } from "@hooks/admin";

export type useTableProps = {
    permanentFilter?: { [key: string]: number[] | string[] };
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: Sort;
    initialFilter?: Filters;
    syncWithLocation?: boolean;
};

type useTable = {
    tableProps: TableProps<any>;
    sorter: Sort;
    filters: Filters;
};

export const useTable = ({
    permanentFilter,
    initialCurrent,
    initialPageSize,
    initialSorter,
    initialFilter,
    syncWithLocation = false,
}: useTableProps): useTable => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    if (syncWithLocationContext) {
        syncWithLocation = true;
    }

    const { search } = useLocation();

    let defaultCurrent = 1;
    let defaultPageSize = 10;
    let defaultSorter = initialSorter;
    let defaultFilter = initialFilter;

    if (syncWithLocation) {
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

        defaultCurrent = parsedCurrent || defaultCurrent;
        defaultPageSize = parsedPageSize || defaultPageSize;
        defaultSorter = parsedSorter || defaultSorter;
        defaultFilter = parsedFilters || defaultFilter;
    }

    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent: initialCurrent ?? defaultCurrent,
        defaultPageSize: initialPageSize ?? defaultPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    const history = useHistory();

    const resource = useResourceWithRoute(routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(defaultSorter);
    const [filters, setFilters] = useState<Filters | undefined>(defaultFilter);

    const { current, pageSize } = tablePropsSunflower.pagination;

    const { data, isFetching, refetch } = useList(resource.name, {
        pagination: { current, pageSize },
        filters: merge(permanentFilter, filters),
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
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination,
                sorter,
                filters,
            });

            return history.push(
                `/resources/${resource.name}?${stringifyParams}`,
            );
        }

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
        sorter: sorter as Sort,
        filters: filters as Filters,
    };
};
