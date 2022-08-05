import React, { Children, createElement, Fragment } from "react";
import { Grid, FormProps, Form, TablePaginationConfig, TableProps } from "antd";
import { QueryObserverResult } from "@tanstack/react-query";
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
    useTableReturnType as useTableCoreReturnType,
} from "@pankod/refine-core";

import {
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
} from "../../../definitions/table";
import { PaginationLink } from "./paginationLink";

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
    setFilters: useTableCoreReturnType<TData>["setFilters"];
    setSorter: useTableCoreReturnType<TData>["setSorter"];
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
>(
    {
        onSearch,
        initialCurrent,
        initialPageSize,
        hasPagination = true,
        initialSorter,
        permanentSorter,
        initialFilter,
        permanentFilter,
        defaultSetFilterBehavior,
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
    }: useTableProps<TData, TError, TSearchVariables> = { hasPagination: true },
): useTableReturnType<TData, TSearchVariables> => {
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
        createLinkForSyncWithLocation,
    } = useTableCore({
        permanentSorter,
        permanentFilter,
        initialCurrent,
        initialPageSize,
        // @ts-expect-error currently boolean casting is not supported in overloaded types.
        hasPagination: hasPagination,
        initialSorter,
        initialFilter,
        syncWithLocation: syncWithLocationProp,
        resource: resourceFromProp,
        defaultSetFilterBehavior,
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
        if (tableFilters && Object.keys(tableFilters).length > 0) {
            // Map Antd:Filter -> refine:CrudFilter
            const crudFilters = mapAntdFilterToCrudFilter(
                tableFilters,
                filters,
            );
            setFilters(crudFilters);
        }

        if (sorter && Object.keys(sorter).length > 0) {
            // Map Antd:Sorter -> refine:CrudSorting
            const crudSorting = mapAntdSorterToCrudSorting(sorter);
            setSorter(crudSorting);
        }

        // tablePropsSunflower.onChange(pagination, filters, sorter);
        if (hasPagination) {
            setCurrent?.(pagination.current || 1);
            setPageSize?.(pagination.pageSize || 10);
        }
    };

    const onFinish = async (value: TSearchVariables) => {
        if (onSearch) {
            const searchFilters = await onSearch(value);
            setFilters(searchFilters);
            if (hasPagination) {
                setCurrent?.(1);
            }
        }
    };

    const antdPagination = (): false | TablePaginationConfig => {
        if (hasPagination) {
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
                position: !breakpoint.sm ? ["bottomCenter"] : ["bottomRight"],
                total: data?.total,
            };
        }

        return false;
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
            pagination: antdPagination(),
            scroll: { x: true },
        },
        tableQueryResult,
        sorter,
        filters,
        setSorter,
        setFilters,
    };
};
