import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";

import { useResourceWithRoute, useList } from "@hooks";
import { useSyncWithLocation } from "@hooks/admin";
import { useNavigation } from "@hooks/navigation";
import {
    stringifyTableParams,
    parseTableParams,
    merge,
} from "@definitions/table";

import {
    Filters,
    Sort,
    ResourceRouterParams,
    BaseRecord,
} from "../../../interfaces";

export type useTableProps = {
    permanentFilter?: { [key: string]: number[] | string[] };
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: Sort;
    initialFilter?: Filters;
    syncWithLocation?: boolean;
};

export type useTableReturnType<RecordType extends BaseRecord = BaseRecord> = {
    tableProps: TableProps<RecordType>;
    sorter?: Sort;
    filters?: Filters;
};

export const useTable = <RecordType extends BaseRecord = BaseRecord>({
    permanentFilter,
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
    syncWithLocation = false,
}: useTableProps = {}): useTableReturnType<RecordType> => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    if (syncWithLocationContext) {
        syncWithLocation = true;
    }

    const { search } = useLocation();

    let defaultCurrent = initialCurrent;
    let defaultPageSize = initialPageSize;
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
        defaultCurrent: initialCurrent,
        defaultPageSize: initialPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(defaultSorter);
    const [filters, setFilters] = useState<Filters | undefined>(defaultFilter);

    const {
        current,
        pageSize,
        defaultCurrent: defaultCurrentSF,
    } = tablePropsSunflower.pagination;

    const { data, isFetching } = useList<RecordType>(resource.name, {
        pagination: { current: current ?? defaultCurrentSF, pageSize },
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

            return push(`/resources/${resource.route}?${stringifyParams}`);
        }
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
                size: "small",
                position: ["bottomCenter"],
            },
        },
        sorter,
        filters,
    };
};
