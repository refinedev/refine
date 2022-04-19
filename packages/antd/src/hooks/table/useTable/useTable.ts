import { Grid, FormProps, Form, TablePaginationConfig, TableProps } from "antd";
import { QueryObserverResult } from "react-query";
import { useForm as useFormSF } from "sunflower-antd";

import { SorterResult } from "antd/lib/table/interface";

import {
    useLiveMode,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    LiveModeProps,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
} from "@pankod/refine-core";

import {
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
} from "../../../definitions/table";

export type useTableProps<TData, TError, TSearchVariables = unknown> =
    useTablePropsCore<TData, TError> &
        SuccessErrorNotification &
        LiveModeProps & {
            onSearch?: (
                data: TSearchVariables,
            ) => CrudFilters | Promise<CrudFilters>;
        };

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

// const defaultPermanentFilter: CrudFilters = [];

export const useTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    onSearch,
    initialCurrent,
    initialPageSize,
    initialSorter,
    permanentSorter,
    initialFilter,
    permanentFilter,
    syncWithLocation: syncWithLocationProp,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
}: useTableProps<TData, TError, TSearchVariables> = {}): useTableReturnType<
    TData,
    TSearchVariables
> => {
    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        filters,
        setFilters,
        sorter,
        setSorter,
    } = useTableCore({
        permanentSorter,
        permanentFilter,
        initialCurrent,
        initialPageSize,
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
        dataProviderName,
    });

    const breakpoint = Grid.useBreakpoint();

    const [form] = Form.useForm<TSearchVariables>();
    const formSF = useFormSF<any, TSearchVariables>({
        form: form,
    });

    const liveMode = useLiveMode(liveModeFromProp);

    const { data, isFetched, isLoading } = tableQueryResult;

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
        setFilters(crudFilters);

        // Map Antd:Sorter -> refine:CrudSorting
        const crudSorting = mapAntdSorterToCrudSorting(sorter);
        setSorter(crudSorting);

        // tablePropsSunflower.onChange(pagination, filters, sorter);
        setCurrent(pagination.current || 1);
        setPageSize(pagination.pageSize || 10);
    };

    const onFinish = async (value: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(value);
            setFilters(searchFilters);
            setCurrent(1);
        }
    };

    return {
        searchFormProps: {
            ...formSF.formProps,
            onFinish,
        },
        tableProps: {
            dataSource: data?.data,
            loading: liveMode === "auto" ? isLoading : !isFetched,
            onChange,
            pagination: {
                pageSize,
                current,
                simple: !breakpoint.sm,
                position: !breakpoint.sm ? ["bottomCenter"] : ["bottomRight"],
                total: data?.total,
            },
            scroll: { x: true },
        },
        tableQueryResult,
        sorter,
        filters,
    };
};
