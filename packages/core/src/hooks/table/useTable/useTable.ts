import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { useForm } from "antd/lib/form/Form";
import { SorterResult } from "antd/lib/table/interface";

import { useResourceWithRoute, useList } from "@hooks";
import { useSyncWithLocation } from "@hooks/admin";
import { useNavigation } from "@hooks/navigation";
import {
    stringifyTableParams,
    parseTableParams,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
} from "@definitions/table";
import { FormProps } from "@components/antd";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
} from "../../../interfaces";

export type useTableProps = {
    permanentFilter?: CrudFilters;
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: CrudSorting;
    initialFilter?: CrudFilters;
    syncWithLocation?: boolean;
    onSearch?: (data: any) => CrudFilters | Promise<CrudFilters>;
};

export type useTableReturnType<TData extends BaseRecord = BaseRecord> = {
    formProps: FormProps;
    tableProps: TableProps<TData>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
};

export const useTable = <TData extends BaseRecord = BaseRecord>({
    onSearch,
    permanentFilter = [],
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
    syncWithLocation = false,
    resource: resourceFromProp,
}: useTableProps = {}): useTableReturnType<TData> => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const [form] = useForm();

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
        defaultSorter = parsedSorter.length ? parsedSorter : defaultSorter;
        defaultFilter = parsedFilters.length ? parsedFilters : defaultFilter;
    }

    const { tableProps: tablePropsSunflower } = useFormTable({
        defaultCurrent,
        defaultPageSize,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const [sorter, setSorter] = useState<CrudSorting>(defaultSorter || []);
    const [filters, setFilters] = useState<CrudFilters>(defaultFilter || []);
    const [extraFilter, setExtraFilter] = useState<CrudFilters>([]);

    const {
        current,
        pageSize,
        defaultCurrent: defaultCurrentSF,
    } = tablePropsSunflower.pagination;

    const { data, isFetching } = useList<TData>(resource.name, {
        pagination: { current: current ?? defaultCurrentSF, pageSize },
        filters: permanentFilter.concat(extraFilter, filters),
        sort: sorter,
    });

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, (string | number | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
        // Map Antd:Filter -> refine:CrudFilter
        const crudFilters = mapAntdFilterToCrudFilter(filters);
        setFilters(crudFilters);

        // Map Antd:Sorter -> refine:CrudSorting
        const crudSorting = mapAntdSorterToCrudSorting(sorter);
        setSorter(crudSorting);

        tablePropsSunflower.onChange(pagination, filters, sorter);

        // synchronize with url
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination,
                sorter: crudSorting,
                filters: crudFilters,
            });

            return push(`/resources/${resource.route}?${stringifyParams}`);
        }
    };

    const onFinish = async (value: any) => {
        if (onSearch) {
            const filters = await onSearch(value);
            return setExtraFilter(filters);
        }
    };

    return {
        formProps: {
            ...form,
            onFinish,
        },
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
