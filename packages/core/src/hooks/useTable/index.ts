import React, { useState, useEffect } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import qs from "qs";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import warnOnce from "warn-once";

import {
    useRouterContext,
    useSyncWithLocation,
    useNavigation,
    useList,
    useLiveMode,
    useRouterType,
    useResource,
    useParsed,
} from "@hooks";
import {
    stringifyTableParams,
    parseTableParams,
    unionFilters,
    setInitialFilters,
    setInitialSorters,
    unionSorters,
} from "@definitions/table";
import { pickNotDeprecated } from "@definitions/helpers";

import {
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaQuery,
    LiveModeProps,
    Pagination,
    Prettify,
} from "../../interfaces";
import { useGo } from "@hooks/router/use-go";
import { BaseListProps } from "../data/useList";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     */
    resource?: string;
    /**
     * Configuration for pagination
     */
    pagination?: Pagination;
    /**
     * Initial page index
     * @default 1
     * @deprecated `initialCurrent` property is deprecated. Use `pagination.current` instead.
     */
    initialCurrent?: number;
    /**
     * Initial number of items per page
     * @default 10
     * @deprecated `initialPageSize` property is deprecated. Use `pagination.pageSize` instead.
     */
    initialPageSize?: number;
    /**
     * Sort configs
     */
    sorters?: {
        /**
         * Initial sorter state
         */
        initial?: CrudSorting;
        /**
         * Default and unchangeable sorter state
         *  @default `[]`
         */
        permanent?: CrudSorting;
    };
    /**
     * Initial sorter state
     * @deprecated `initialSorter` property is deprecated. Use `sorters.initial` instead.
     */
    initialSorter?: CrudSorting;
    /**
     * Default and unchangeable sorter state
     *  @default `[]`
     *  @deprecated `permanentSorter` property is deprecated. Use `sorters.permanent` instead.
     */
    permanentSorter?: CrudSorting;
    /**
     * Filter configs
     */
    filters?: {
        /**
         * Initial filter state
         */
        initial?: CrudFilters;
        /**
         * Default and unchangeable filter state
         *  @default `[]`
         */
        permanent?: CrudFilters;
        /**
         * Default behavior of the `setFilters` function
         * @default `"merge"`
         */
        defaultBehavior?: SetFilterBehavior;
    };
    /**
     * Initial filter state
     * @deprecated `initialFilter` property is deprecated. Use `filters.initial` instead.
     */
    initialFilter?: CrudFilters;
    /**
     * Default and unchangeable filter state
     * @default `[]`
     * @deprecated `permanentFilter` property is deprecated. Use `filters.permanent` instead.
     */
    permanentFilter?: CrudFilters;
    /**
     * Default behavior of the `setFilters` function
     * @default `"merge"`
     * @deprecated `defaultSetFilterBehavior` property is deprecated. Use `filters.defaultBehavior` instead.
     */
    defaultSetFilterBehavior?: SetFilterBehavior;
    /**
     * Whether to use server side pagination or not.
     * @default `true`
     * @deprecated `hasPagination` property is deprecated. Use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * Sortings, filters, page index and records shown per page are tracked by browser history
     * @default Value set in [Refine](/docs/api-reference/core/components/refine-config/#syncwithlocation). If a custom resource is given, it will be `false`
     */
    syncWithLocation?: boolean;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    /**
     * Metadata query for dataProvider
     */
    meta?: MetaQuery;
    /**
     * Metadata query for dataProvider
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
} & SuccessErrorNotification<
    GetListResponse<TData>,
    TError,
    Prettify<BaseListProps>
> &
    LiveModeProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationParams = {
    pagination: { current?: number; pageSize?: number };
    /**
     * @deprecated `sorter` is deprecated. Use `sorters` instead.
     */
    sorter?: CrudSorting;
    sorters: CrudSorting;
    filters: CrudFilters;
};

export type useTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>, TError>;
    /**
     * @deprecated `sorter` is deprecated. Use `sorters` instead.
     */
    sorter: CrudSorting;
    sorters: CrudSorting;
    /**
     * @deprecated `setSorter` is deprecated. Use `setSorters` instead.
     */
    setSorter: (sorter: CrudSorting) => void;
    setSorters: (sorter: CrudSorting) => void;
    filters: CrudFilters;
    setFilters: ((filters: CrudFilters, behavior?: SetFilterBehavior) => void) &
        ((setter: (prevFilters: CrudFilters) => CrudFilters) => void);
    createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
    current: number;
    setCurrent: ReactSetState<useTableReturnType["current"]>;
    pageSize: number;
    setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
    pageCount: number;
};

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/table/useTable} for more details.
 */

const defaultPermanentFilter: CrudFilters = [];
const defaultPermanentSorter: CrudSorting = [];

export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    initialCurrent,
    initialPageSize,
    hasPagination = true,
    pagination,
    initialSorter,
    permanentSorter = defaultPermanentSorter,
    defaultSetFilterBehavior,
    initialFilter,
    permanentFilter = defaultPermanentFilter,
    filters: filtersFromProp,
    sorters: sortersFromProp,
    syncWithLocation: syncWithLocationProp,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    meta,
    metaData,
    dataProviderName,
}: useTableProps<TData, TError> = {}): useTableReturnType<TData, TError> {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const liveMode = useLiveMode(liveModeFromProp);

    const routerType = useRouterType();
    const { useLocation } = useRouterContext();
    const { search, pathname } = useLocation();

    const parsedParams = useParsed();

    const hasPaginationString = hasPagination === false ? "off" : "server";
    const isPaginationEnabled =
        (pagination?.mode ?? hasPaginationString) !== "off";
    const prefferedCurrent = pickNotDeprecated(
        pagination?.current,
        initialCurrent,
    );
    const prefferedPageSize = pickNotDeprecated(
        pagination?.pageSize,
        initialPageSize,
    );
    const preferredMeta = pickNotDeprecated(meta, metaData);

    /** `parseTableParams` is redundant with the new routing */
    // We want to always parse the query string even when syncWithLocation is
    // deactivated, for hotlinking to work properly
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(search ?? "?");

    const preferredInitialFilters = pickNotDeprecated(
        filtersFromProp?.initial,
        initialFilter,
    );
    const preferredPermanentFilters =
        pickNotDeprecated(filtersFromProp?.permanent, permanentFilter) ??
        defaultPermanentFilter;

    const preferredInitialSorters = pickNotDeprecated(
        sortersFromProp?.initial,
        initialSorter,
    );
    const preferredPermanentSorters =
        pickNotDeprecated(sortersFromProp?.permanent, permanentSorter) ??
        defaultPermanentSorter;

    const prefferedFilterBehavior =
        pickNotDeprecated(
            filtersFromProp?.defaultBehavior,
            defaultSetFilterBehavior,
        ) ?? "merge";

    let defaultCurrent: number;
    let defaultPageSize: number;
    let defaultSorter: CrudSorting | undefined;
    let defaultFilter: CrudFilters | undefined;

    if (syncWithLocation) {
        defaultCurrent =
            parsedParams?.params?.current ||
            parsedCurrent ||
            prefferedCurrent ||
            1;
        defaultPageSize =
            parsedParams?.params?.pageSize ||
            parsedPageSize ||
            prefferedPageSize ||
            10;
        defaultSorter =
            parsedParams?.params?.sorters ||
            (parsedSorter.length ? parsedSorter : preferredInitialSorters);
        defaultFilter =
            parsedParams?.params?.filters ||
            (parsedFilters.length ? parsedFilters : preferredInitialFilters);
    } else {
        defaultCurrent = prefferedCurrent || 1;
        defaultPageSize = prefferedPageSize || 10;
        defaultSorter = preferredInitialSorters;
        defaultFilter = preferredInitialFilters;
    }

    const { replace } = useNavigation();
    /** New way of `replace` calls to the router is using `useGo` */
    const go = useGo();

    const { resource } = useResource(resourceFromProp);

    const resourceInUse = resource?.name;

    React.useEffect(() => {
        warnOnce(
            typeof resourceInUse === "undefined",
            `useTable: \`resource\` is not defined.`,
        );
    }, [resourceInUse]);

    const [sorters, setSorters] = useState<CrudSorting>(
        setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
    );
    const [filters, setFilters] = useState<CrudFilters>(
        setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
    );
    const [current, setCurrent] = useState<number>(defaultCurrent);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);

    const createLinkForSyncWithLocation = ({
        pagination: { current, pageSize },
        sorter,
        filters,
    }: SyncWithLocationParams) => {
        if (routerType === "new") {
            return (
                go({
                    type: "path",
                    options: {
                        keepHash: true,
                        keepQuery: true,
                    },
                    query: {
                        ...(isPaginationEnabled ? { current, pageSize } : {}),
                        sorters: sorter,
                        filters,
                        ...currentQueryParams(),
                    },
                }) ?? ""
            );
        } else {
            const currentQueryParams = qs.parse(search?.substring(1)); // remove first ? character

            const stringifyParams = stringifyTableParams({
                pagination: {
                    pageSize,
                    current,
                },
                sorters: sorters ?? sorter,
                filters,
                ...currentQueryParams,
            });
            return `${pathname ?? ""}?${stringifyParams ?? ""}`;
        }
    };

    useEffect(() => {
        if (search === "") {
            setCurrent(defaultCurrent);
            setPageSize(defaultPageSize);
            setSorters(
                setInitialSorters(
                    preferredPermanentSorters,
                    defaultSorter ?? [],
                ),
            );
            setFilters(
                setInitialFilters(
                    preferredPermanentFilters,
                    defaultFilter ?? [],
                ),
            );
        }
    }, [search]);

    const currentQueryParams = (): object => {
        if (routerType === "new") {
            // We get QueryString parameters that are uncontrolled by refine.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { sorters, filters, pageSize, current, ...rest } =
                parsedParams?.params ?? {};

            return rest;
        } else {
            // We get QueryString parameters that are uncontrolled by refine.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { sorter, filters, pageSize, current, ...rest } = qs.parse(
                search,
                {
                    ignoreQueryPrefix: true,
                },
            );

            return rest;
        }
    };

    useEffect(() => {
        if (syncWithLocation) {
            // Careful! This triggers render
            const queryParams = currentQueryParams();

            if (routerType === "new") {
                go({
                    type: "replace",
                    options: {
                        keepQuery: true,
                    },
                    query: {
                        ...(isPaginationEnabled ? { pageSize, current } : {}),
                        sorters: differenceWith(
                            sorters,
                            preferredPermanentSorters,
                            isEqual,
                        ),
                        filters: differenceWith(
                            filters,
                            preferredPermanentFilters,
                            isEqual,
                        ),
                        // ...queryParams,
                    },
                });
            } else {
                const stringifyParams = stringifyTableParams({
                    ...(isPaginationEnabled
                        ? {
                              pagination: {
                                  pageSize,
                                  current,
                              },
                          }
                        : {}),
                    sorters: differenceWith(
                        sorters,
                        preferredPermanentSorters,
                        isEqual,
                    ),
                    filters: differenceWith(
                        filters,
                        preferredPermanentFilters,
                        isEqual,
                    ),
                    ...queryParams,
                });
                return replace?.(`${pathname}?${stringifyParams}`, undefined, {
                    shallow: true,
                });
            }
        }
    }, [syncWithLocation, current, pageSize, sorters, filters]);

    const queryResult = useList<TData, TError>({
        resource: resourceInUse,
        hasPagination,
        pagination: { current, pageSize, mode: pagination?.mode },
        filters: unionFilters(preferredPermanentFilters, filters),
        sorters: unionSorters(preferredPermanentSorters, sorters),
        queryOptions,
        successNotification,
        errorNotification,
        meta: preferredMeta,
        metaData: preferredMeta,
        liveMode,
        liveParams,
        onLiveEvent,
        dataProviderName,
    });

    const setFiltersAsMerge = (newFilters: CrudFilters) => {
        setFilters((prevFilters) =>
            unionFilters(preferredPermanentFilters, newFilters, prevFilters),
        );
    };

    const setFiltersAsReplace = (newFilters: CrudFilters) => {
        setFilters(unionFilters(preferredPermanentFilters, newFilters));
    };

    const setFiltersWithSetter = (
        setter: (prevFilters: CrudFilters) => CrudFilters,
    ) => {
        setFilters((prev) =>
            unionFilters(preferredPermanentFilters, setter(prev)),
        );
    };

    const setFiltersFn: useTableReturnType<TData>["setFilters"] = (
        setterOrFilters,
        behavior: SetFilterBehavior = prefferedFilterBehavior,
    ) => {
        if (typeof setterOrFilters === "function") {
            setFiltersWithSetter(setterOrFilters);
        } else {
            if (behavior === "replace") {
                setFiltersAsReplace(setterOrFilters);
            } else {
                setFiltersAsMerge(setterOrFilters);
            }
        }
    };

    const setSortWithUnion = (newSorter: CrudSorting) => {
        setSorters(() => unionSorters(preferredPermanentSorters, newSorter));
    };

    return {
        tableQueryResult: queryResult,
        sorters,
        setSorters: setSortWithUnion,
        sorter: sorters,
        setSorter: setSortWithUnion,
        filters,
        setFilters: setFiltersFn,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount: pageSize
            ? Math.ceil((queryResult.data?.total ?? 0) / pageSize)
            : 1,
        createLinkForSyncWithLocation,
    };
}
