import { useState, useEffect } from "react";
import { Grid } from "antd";
import { useFormTable } from "sunflower-antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { FormProps } from "antd/lib/form";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import { useForm } from "antd/lib/form/Form";
import { SorterResult } from "antd/lib/table/interface";

import {
    useRouterContext,
    useSyncWithLocation,
    useNavigation,
    useResourceWithRoute,
    useList,
    useLiveMode,
} from "@hooks";
import {
    stringifyTableParams,
    parseTableParams,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
    unionFilters,
    setInitialFilters,
} from "@definitions/table";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "../../../interfaces";

export type useTableProps<TData, TError, TSearchVariables = unknown> = {
    permanentFilter?: CrudFilters;
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: CrudSorting;
    initialFilter?: CrudFilters;
    syncWithLocation?: boolean;
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification &
    LiveModeProps;

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

const defaultPermanentFilter: CrudFilters = [];

export const useTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    onSearch,
    permanentFilter = defaultPermanentFilter,
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    initialFilter,
    syncWithLocation: syncWithLocationProp,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
}: useTableProps<TData, TError, TSearchVariables> = {}): useTableReturnType<
    TData,
    TSearchVariables
> => {
    const breakpoint = Grid.useBreakpoint();

    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const [form] = useForm<TSearchVariables>();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    // disable syncWithLocation for custom resource tables
    // if (resourceFromProp) {
    //     syncWithLocation = false;
    // }

    const { useLocation, useParams } = useRouterContext();
    const { search } = useLocation();
    const liveMode = useLiveMode(liveModeFromProp);

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
        setInitialFilters(permanentFilter, defaultFilter ?? []),
    );

    useEffect(() => {
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination: {
                    ...tablePropsSunflower.pagination,
                    current:
                        tablePropsSunflower.pagination.current ??
                        defaultCurrent,
                },
                sorter,
                filters,
            });

            // Careful! This triggers render
            return push(`/${resource.route}?${stringifyParams}`);
        }
    }, [
        syncWithLocation,
        tablePropsSunflower.pagination.current,
        tablePropsSunflower.pagination.pageSize,
        sorter,
        filters,
    ]);

    const {
        current: currentSF,
        pageSize: pageSizeSF,
        defaultCurrent: defaultCurrentSF,
    } = tablePropsSunflower.pagination;

    const queryResult = useList<TData, TError>({
        resource: resource.name,
        config: {
            pagination: {
                current: currentSF ?? defaultCurrentSF,
                pageSize: pageSizeSF,
            },
            filters: unionFilters(permanentFilter, [], filters),
            sort: sorter,
        },
        queryOptions,
        successNotification,
        errorNotification,
        metaData,
        liveMode,
        liveParams,
        onLiveEvent,
    });
    const { data, isFetched, isLoading } = queryResult;

    const onChange = (
        pagination: TablePaginationConfig,
        tableFilters: Record<
            string,
            (string | number | boolean) | (string | number | boolean)[] | null
        >,
        sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
        // Map Antd:Filter -> refine:CrudFilter
        const crudFilters = mapAntdFilterToCrudFilter(tableFilters, filters);

        setFilters((prevFilters) =>
            unionFilters(permanentFilter, crudFilters, prevFilters),
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
                unionFilters(permanentFilter, searchFilters, prevFilters),
            );

            tablePropsSunflower.onChange(
                { ...tablePropsSunflower.pagination, current: 1 },
                undefined,
                undefined,
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
            loading: liveMode === "auto" ? isLoading : !isFetched,
            onChange,
            pagination: {
                ...tablePropsSunflower.pagination,
                simple: !breakpoint.sm,
                position: !breakpoint.sm ? ["bottomCenter"] : ["bottomRight"],
                total: data?.total,
            },
            scroll: { x: true },
        },
        tableQueryResult: queryResult,
        sorter,
        filters,
    };
};
