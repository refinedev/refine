import { Children, createElement, Fragment } from "react";
import { ListProps, FormProps, Form, Grid } from "antd";

import {
    BaseRecord,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    LiveModeProps,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType,
    pickNotDeprecated,
} from "@pankod/refine-core";
import { useLiveMode } from "@pankod/refine-core";
import { PaginationLink } from "@hooks/table/useTable/paginationLink";
import { PaginationConfig } from "antd/lib/pagination";

export type useSimpleListProps<TData, TError, TSearchVariables> =
    useTablePropsCore<TData, TError> & {
        onSearch?: (
            data: TSearchVariables,
        ) => CrudFilters | Promise<CrudFilters>;
    } & SuccessErrorNotification &
        LiveModeProps;

export type useSimpleListReturnType<
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
> = Omit<useTableReturnType<TData>, "tableQueryResult"> & {
    listProps: ListProps<TData>;
    queryResult: useTableReturnType["tableQueryResult"];
    searchFormProps: FormProps<TSearchVariables>;
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
    resource,
    initialCurrent,
    initialPageSize,
    pagination,
    hasPagination = true,
    initialSorter,
    permanentSorter,
    initialFilter,
    permanentFilter,
    defaultSetFilterBehavior,
    onSearch,
    queryOptions,
    syncWithLocation,
    successNotification,
    errorNotification,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
}: useSimpleListProps<
    TData,
    TError,
    TSearchVariables
> = {}): useSimpleListReturnType<TData, TSearchVariables> => {
    const {
        sorters,
        sorter,
        filters,
        current,
        pageSize,
        pageCount,
        setFilters,
        setCurrent,
        setPageSize,
        setSorter,
        setSorters,
        createLinkForSyncWithLocation,
        tableQueryResult: queryResult,
    } = useTableCore({
        resource,
        initialSorter,
        permanentSorter,
        initialFilter,
        permanentFilter,
        defaultSetFilterBehavior,
        initialCurrent,
        initialPageSize,
        queryOptions,
        successNotification,
        errorNotification,
        liveMode: liveModeFromProp,
        onLiveEvent,
        liveParams,
        metaData,
        syncWithLocation,
        dataProviderName,
        pagination,
        hasPagination,
    });

    const hasPaginationString = hasPagination ? "server" : "off";
    const isPaginationEnabled =
        pickNotDeprecated(pagination?.mode, hasPaginationString) !== "off";

    const breakpoint = Grid.useBreakpoint();

    const liveMode = useLiveMode(liveModeFromProp);

    const [form] = Form.useForm<TSearchVariables>();

    const { data, isFetched, isLoading } = queryResult;

    const onChange = (page: number, pageSize?: number): void => {
        if (isPaginationEnabled) {
            setCurrent(page);
            setPageSize(pageSize || 10);
        }
    };

    const onFinish = async (values: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(values);
            if (isPaginationEnabled) {
                setCurrent?.(1);
            }
            return setFilters(searchFilters);
        }
    };

    const antdPagination = (): false | PaginationConfig => {
        if (isPaginationEnabled) {
            return {
                itemRender: (page, type, element) => {
                    const link = createLinkForSyncWithLocation({
                        pagination: {
                            pageSize,
                            current: page,
                        },
                        sorters,
                        filters,
                    });

                    if (type === "page") {
                        return createElement(PaginationLink, {
                            to: link,
                            element: `${page}`,
                        });
                    }
                    if (type === "next" || type === "prev") {
                        return createElement(PaginationLink, {
                            to: link,
                            element: element,
                        });
                    }

                    if (type === "jump-next" || type === "jump-prev") {
                        const elementChildren = (element as React.ReactElement)
                            ?.props?.children;

                        return createElement(PaginationLink, {
                            to: link,
                            element:
                                Children.count(elementChildren) > 1
                                    ? createElement(
                                          Fragment,
                                          {},
                                          elementChildren,
                                      )
                                    : elementChildren,
                        });
                    }

                    return element;
                },
                pageSize,
                current,
                simple: !breakpoint.sm,
                total: data?.total,
                onChange,
            };
        }

        return false;
    };

    return {
        searchFormProps: {
            form,
            onFinish,
        },
        listProps: {
            dataSource: data?.data,
            loading: liveMode === "auto" ? isLoading : !isFetched,
            pagination: antdPagination(),
        },
        queryResult,
        filters,
        setFilters,
        sorter,
        setSorter,
        sorters,
        setSorters,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
        createLinkForSyncWithLocation,
    };
};
