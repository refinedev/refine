import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";

import { useResourceWithRoute, useList } from "@hooks";
import { useSyncWithLocation } from "@hooks/admin";
import { useNavigation } from "@hooks/navigation";
import { stringifyTableParams, parseTableParams } from "@definitions/table";

import {
    Filters,
    Sort,
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
} from "../../../interfaces";

export type useTableProps = {
    permanentFilter?: CrudFilters;
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: Sort;
    initialFilter?: CrudFilters;
    syncWithLocation?: boolean;
};

export type useTableReturnType<RecordType extends BaseRecord = BaseRecord> = {
    tableProps: TableProps<RecordType>;
    sorter?: Sort;
    filters?: CrudFilters;
};

export const useTable = <RecordType extends BaseRecord = BaseRecord>({
    permanentFilter = [],
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
    syncWithLocation = false,
    resource: resourceFromProp,
}: useTableProps = {}): useTableReturnType<RecordType> => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    if (syncWithLocationContext) {
        syncWithLocation = true;
    }

    // disable syncWithLocation for custom resource tables
    if (resourceFromProp) {
        syncWithLocation = false;
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
        } = parseTableParams(search);

        defaultCurrent = parsedCurrent || defaultCurrent;
        defaultPageSize = parsedPageSize || defaultPageSize;
        defaultSorter = parsedSorter || defaultSorter;
        defaultFilter = parsedFilters || defaultFilter;
    }

    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent,
        defaultPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const [sorter, setSorter] = useState<Sort | undefined>(defaultSorter);
    const [filters, setFilters] = useState<CrudFilters>(defaultFilter || []);

    const {
        current,
        pageSize,
        defaultCurrent: defaultCurrentSF,
    } = tablePropsSunflower.pagination;

    const { data, isFetching } = useList<RecordType>(resource.name, {
        pagination: { current: current ?? defaultCurrentSF, pageSize },
        filters: permanentFilter?.concat(filters),
        sort: sorter,
    });

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Filters,
        sorter: Sort,
    ) => {
        // Map Antd:Filter -> Refine:CrudFilter
        const crudFilters: CrudFilters = [];
        Object.keys(filters).map((field) => {
            const value = filters[field];

            if (value) {
                crudFilters.push({
                    field,
                    operator: "in",
                    value,
                });
            }
        });
        setFilters(crudFilters);
        setSorter(sorter);

        tablePropsSunflower.onChange(pagination, filters, sorter);

        // synchronize with url
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination,
                sorter,
                filters: crudFilters,
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
        filters: permanentFilter?.concat(filters),
    };
};
