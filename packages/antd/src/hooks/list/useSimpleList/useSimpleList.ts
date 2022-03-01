import { QueryObserverResult } from "react-query";
import { ListProps } from "antd/lib/list";
import { FormProps } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";

import {
    BaseRecord,
    CrudFilters,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    LiveModeProps,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
} from "@pankod/refine-core";
import { useLiveMode } from "@pankod/refine-core";

export type useSimpleListProps<TData, TError, TSearchVariables> =
    ListProps<TData> &
        useTablePropsCore<TData, TError> & {
            onSearch?: (
                data: TSearchVariables,
            ) => CrudFilters | Promise<CrudFilters>;
        } & SuccessErrorNotification &
        LiveModeProps;

export type useSimpleListReturnType<
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
> = {
    listProps: ListProps<TData>;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    searchFormProps: FormProps<TSearchVariables>;
    filters: CrudFilters;
};

/**
 * By using `useSimpleList` you get props for your records from API in accordance with Ant Design {@link https://ant.design/components/list/ `<List>`} component.
 * All features such as pagination, sorting come out of the box.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Antd form values
 *
 */
export const useSimpleList = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    resource: resourceFromProp,
    initialCurrent,
    initialPageSize,
    initialSorter,
    permanentSorter,
    initialFilter,
    permanentFilter,
    onSearch,
    queryOptions,
    syncWithLocation: syncWithLocationProp,
    successNotification,
    errorNotification,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
    ...listProps
}: useSimpleListProps<
    TData,
    TError,
    TSearchVariables
> = {}): useSimpleListReturnType<TData, TSearchVariables> => {
    const {
        filters,
        current,
        pageSize,
        setFilters,
        setCurrent,
        setPageSize,
        tableQueryResult: queryResult,
    } = useTableCore({
        resource: resourceFromProp,
        initialSorter,
        permanentSorter,
        initialFilter,
        permanentFilter,
        initialCurrent: listProps.pagination
            ? listProps.pagination.current
            : initialCurrent,
        initialPageSize: listProps.pagination
            ? listProps.pagination.pageSize
            : initialPageSize,
        queryOptions,
        successNotification,
        errorNotification,
        liveMode: liveModeFromProp,
        onLiveEvent,
        liveParams,
        metaData,
        syncWithLocation: syncWithLocationProp,
        dataProviderName,
    });

    const liveMode = useLiveMode(liveModeFromProp);

    const [form] = useForm<TSearchVariables>();

    const { data, isFetched, isLoading } = queryResult;

    const onChange = (page: number, pageSize?: number): void => {
        setCurrent(page);
        setPageSize(pageSize || 10);
    };

    const onFinish = async (values: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(values);
            setCurrent(1);
            return setFilters(searchFilters);
        }
    };

    return {
        searchFormProps: {
            form,
            onFinish,
        },
        listProps: {
            ...listProps,
            dataSource: data?.data,
            loading: liveMode === "auto" ? isLoading : !isFetched,
            pagination: {
                ...listProps.pagination,
                total: data?.total,
                pageSize,
                current,
                onChange,
            },
        },
        queryResult,
        filters,
    };
};
