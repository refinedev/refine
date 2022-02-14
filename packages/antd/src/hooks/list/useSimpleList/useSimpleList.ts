import { useEffect, useState } from "react";
import { QueryObserverResult, UseQueryOptions } from "react-query";
import { ListProps } from "antd/lib/list";
import { FormProps } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";

import {
    useResourceWithRoute,
    useList,
    useSyncWithLocation,
    useNavigation,
    useRouterContext,
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    parseTableParams,
    stringifyTableParams,
    unionFilters,
    useTable as useTableCore,
} from "@pankod/refine-core";

export type useSimpleListProps<TData, TError, TSearchVariables = unknown> =
    ListProps<TData> & {
        permanentFilter?: CrudFilters;
        syncWithLocation?: boolean;
        resource?: string;
        initialFilter?: CrudFilters;
        initialSorter?: CrudSorting;
        onSearch?: (
            data: TSearchVariables,
        ) => CrudFilters | Promise<CrudFilters>;
        queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
        metaData?: MetaDataQuery;
    } & SuccessErrorNotification &
        LiveModeProps;

export type useSimpleListReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
> = {
    listProps: ListProps<TData>;
    queryResult: QueryObserverResult<GetListResponse<TData>, TError>;
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
    initialSorter,
    initialFilter,
    permanentFilter = [],
    onSearch,
    queryOptions,
    syncWithLocation: syncWithLocationProp,
    successNotification,
    errorNotification,
    liveMode,
    onLiveEvent,
    liveParams,
    metaData,
    ...listProps
}: useSimpleListProps<
    TData,
    TError,
    TSearchVariables
> = {}): useSimpleListReturnType<TData, TError, TSearchVariables> => {
    const { useLocation, useParams } = useRouterContext();

    const {
        filters,
        sorter,
        current,
        pageSize,
        setFilters,
        setCurrent,
        setPageSize,
    } = useTableCore({
        resource: resourceFromProp,
        initialSorter,
        initialFilter,
        permanentFilter,
        queryOptions,
        successNotification,
        errorNotification,
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
        ...listProps,
    });

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();

    const { search } = useLocation();

    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();
    let syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const [form] = useForm<TSearchVariables>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    // disable syncWithLocation for custom resource tables
    if (resourceFromProp) {
        syncWithLocation = false;
    }

    let defaultPageSize = 10;
    let defaultCurrent = 1;
    let defaultSorter = initialSorter;
    let defaultFilter = initialFilter;

    if (listProps.pagination && listProps.pagination.pageSize) {
        defaultPageSize = listProps.pagination.pageSize;
    }

    if (listProps.pagination && listProps.pagination.current) {
        defaultCurrent = listProps.pagination.current;
    }

    if (syncWithLocation) {
        const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
            parseTableParams(search);

        defaultCurrent = parsedCurrent || defaultCurrent;
        defaultPageSize = parsedPageSize || defaultPageSize;
        defaultSorter = parsedSorter.length ? parsedSorter : defaultSorter;
        defaultFilter = parsedFilters.length ? parsedFilters : defaultFilter;
    }

    useEffect(() => {
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination: {
                    current,
                    pageSize,
                },
                sorter,
                filters,
            });

            return push(`/${resource.route}?${stringifyParams}`);
        }
    }, [syncWithLocation, current, pageSize, sorter, filters]);

    const queryResult = useList<TData, TError>({
        resource: resource.name,
        config: {
            pagination: {
                current,
                pageSize,
            },
            filters: unionFilters(permanentFilter, [], filters),
            sort: sorter,
        },
        queryOptions,
        successNotification,
        errorNotification,
        liveMode,
        onLiveEvent,
        liveParams,
        metaData,
    });
    const { data, isFetching } = queryResult;

    const onChange = (page: number, pageSize?: number): void => {
        setCurrent(page);
        setPageSize(pageSize || 10);
    };

    const onFinish = async (values: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(values);
            setCurrent(1);
            return setFilters(filters);
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
            loading: isFetching,
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
