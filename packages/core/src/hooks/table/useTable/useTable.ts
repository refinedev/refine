import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { FormProps } from "antd/lib/form";
import { QueryObserverResult } from "react-query";
import unionWith from "lodash/unionWith";

import { useForm } from "antd/lib/form/Form";
import { SorterResult } from "antd/lib/table/interface";

import { useResourceWithRoute, useList } from "@hooks";
import { useSyncWithLocation } from "@hooks/refine";
import { useNavigation } from "@hooks/navigation";
import {
    stringifyTableParams,
    parseTableParams,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
    compareFilters,
} from "@definitions/table";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
} from "../../../interfaces";

export type useTableProps<TSearchVariables = unknown> = {
    permanentFilter?: CrudFilters;
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: CrudSorting;
    initialFilter?: CrudFilters;
    syncWithLocation?: boolean;
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
} & SuccessErrorNotification;

export type useTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
> = {
    searchFormProps: FormProps<TSearchVariables>;
    tableProps: TableProps<TData>;
    tableQueryResult: QueryObserverResult<GetListResponse<TData>>;
    sorter?: CrudSorting;
    filters?: CrudFilters;
};

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/table/useTable} for more details.
 */
export const useTable = <
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
>({
    onSearch,
    permanentFilter = [],
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
    syncWithLocation: syncWithLocationProp = false,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
}: useTableProps<TSearchVariables> = {}): useTableReturnType<
    TData,
    TSearchVariables
> => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const [form] = useForm<TSearchVariables>();

    let syncWithLocation = syncWithLocationProp || syncWithLocationContext;

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
        const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
            parseTableParams(search);

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
    const [filters, setFilters] = useState<CrudFilters>(
        unionWith(permanentFilter, defaultFilter || []),
    );

    console.log({ filters });

    useEffect(() => {
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination: tablePropsSunflower.pagination,
                sorter,
                filters,
            });

            return push(`/${resource.route}?${stringifyParams}`);
        }
    }, [
        tablePropsSunflower.pagination.current,
        tablePropsSunflower.pagination.pageSize,
        syncWithLocation,
        sorter,
        filters,
    ]);

    const {
        current: currentSF,
        pageSize: pageSizeSF,
        defaultCurrent: defaultCurrentSF,
    } = tablePropsSunflower.pagination;

    const queryResult = useList<TData>(
        resource.name,
        {
            pagination: {
                current: currentSF ?? defaultCurrentSF,
                pageSize: pageSizeSF,
            },
            filters,
            sort: sorter,
        },
        undefined,
        successNotification,
        errorNotification,
    );
    const { data, isFetching } = queryResult;

    const onChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, (string | number | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
        // Map Antd:Filter -> refine:CrudFilter
        const crudFilters = mapAntdFilterToCrudFilter(filters);

        setFilters((prevFilters) =>
            unionWith(
                permanentFilter,
                crudFilters,
                prevFilters,
                compareFilters,
            ),
        );

        // Map Antd:Sorter -> refine:CrudSorting
        const crudSorting = mapAntdSorterToCrudSorting(sorter);
        setSorter(crudSorting);

        tablePropsSunflower.onChange(pagination, filters, sorter);
    };

    const onFinish = async (value: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(value);
            setFilters((prevFilters) =>
                unionWith(
                    permanentFilter,
                    searchFilters,
                    prevFilters,
                    compareFilters,
                ),
            );
        }
    };

    return {
        searchFormProps: {
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
            },
            scroll: { x: true },
        },
        tableQueryResult: queryResult,
        sorter,
        filters,
    };
};
