import { Children, createElement, Fragment } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { ListProps, FormProps, Form, Grid } from "antd";

import {
    BaseRecord,
    CrudFilters,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    LiveModeProps,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType,
    CrudSorting,
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
> = {
    listProps: ListProps<TData>;
    queryResult: QueryObserverResult<GetListResponse<TData>>;
    searchFormProps: FormProps<TSearchVariables>;
    filters: CrudFilters;
    setFilters: useTableReturnType<TData>["setFilters"];
    sorter?: CrudSorting;
    setSorter: useTableReturnType<TData>["setSorter"];
    current?: number;
    setCurrent: useTableReturnType<TData>["setCurrent"];
    pageSize: number;
    setPageSize: useTableReturnType<TData>["setPageSize"];
    pageCount: number;
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
        sorter,
        filters,
        current,
        pageSize,
        pageCount,
        setFilters,
        setCurrent,
        setPageSize,
        setSorter,
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
        hasPagination,
    });

    const hasPaginationString = hasPagination ? "server" : "off";

    const breakpoint = Grid.useBreakpoint();

    const liveMode = useLiveMode(liveModeFromProp);

    const [form] = Form.useForm<TSearchVariables>();

    const { data, isFetched, isLoading } = queryResult;

    const onChange = (page: number, pageSize?: number): void => {
        if (
            pickNotDeprecated(pagination?.mode, hasPaginationString) !== "off"
        ) {
            setCurrent(page);
            setPageSize(pageSize || 10);
        }
    };

    const onFinish = async (values: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(values);
            if (
                pickNotDeprecated(pagination?.mode, hasPaginationString) !==
                "off"
            ) {
                setCurrent?.(1);
            }
            return setFilters(searchFilters);
        }
    };

    const antdPagination = (): false | PaginationConfig => {
        if (
            pickNotDeprecated(pagination?.mode, hasPaginationString) !== "off"
        ) {
            return {
                itemRender: (page, type, element) => {
                    const link = createLinkForSyncWithLocation({
                        pagination: {
                            pageSize,
                            current: page,
                        },
                        sorter,
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
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
    };
};
