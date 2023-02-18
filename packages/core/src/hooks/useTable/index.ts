import React, { useMemo, useState, useEffect } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import qs from "qs";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

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
    unionFilters,
    setInitialFilters,
    setInitialSorters,
    unionSorters,
} from "@definitions/table";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaQuery,
    LiveModeProps,
} from "../../interfaces";
import { useParse } from "@hooks/router/use-parse";
import { useGo } from "@hooks/router/use-go";
import warnOnce from "warn-once";
import { pickNotDeprecated } from "@definitions/helpers";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     */
    resource?: string;
    /**
     * Initial page index
     * @default 1
     */
    initialCurrent?: number;
    /**
     * Initial number of items per page
     * @default 10
     */
    initialPageSize?: number;
    /**
     * Initial sorter state
     */
    initialSorter?: CrudSorting;
    /**
     * Default and unchangeable sorter state
     *  @default `[]`
     */
    permanentSorter?: CrudSorting;
    /**
     * Initial filter state
     */
    initialFilter?: CrudFilters;
    /**
     * WDefault and unchangeable filter state
     * @default `[]`
     */
    permanentFilter?: CrudFilters;
    /**
     *Default behavior of the `setFilters` function
     * @default `"merge"`
     */
    defaultSetFilterBehavior?: SetFilterBehavior;
    /**
     * Whether to use server side pagination or not.
     * @default `true`
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
} & SuccessErrorNotification &
    LiveModeProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationParams = {
    pagination: { current?: number; pageSize?: number };
    sorter: CrudSorting;
    filters: CrudFilters;
};

export type useTablePaginationKeys =
    | "current"
    | "setCurrent"
    | "pageSize"
    | "setPageSize"
    | "pageCount";

export type useTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>, TError>;
    sorter: CrudSorting;
    setSorter: (sorter: CrudSorting) => void;
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

export type useTableNoPaginationReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = Omit<useTableReturnType<TData, TError>, useTablePaginationKeys> &
    Record<useTablePaginationKeys, undefined>;

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/table/useTable} for more details.
 */

const defaultPermanentFilter: CrudFilters = [];
const defaultPermanentSorter: CrudSorting = [];

// overload with pagination
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props?: useTableProps<TData, TError> & {
        hasPagination?: true;
    },
): useTableReturnType<TData, TError>;
// overload without pagination
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props?: useTableProps<TData, TError> & {
        hasPagination: false;
    },
): useTableNoPaginationReturnType<TData, TError>;
// implementation
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    initialCurrent = 1,
    initialPageSize = 10,
    hasPagination = true,
    initialSorter,
    permanentSorter = defaultPermanentSorter,
    defaultSetFilterBehavior = "merge",
    initialFilter,
    permanentFilter = defaultPermanentFilter,
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
}: useTableProps<TData, TError> = {}):
    | useTableReturnType<TData, TError>
    | useTableNoPaginationReturnType<TData, TError> {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const liveMode = useLiveMode(liveModeFromProp);

    const { useLocation, useParams } = useRouterContext();
    const { search, pathname } = useLocation();

    const parse = useParse();

    const { resource: resourceFromBindings, ...parsedParams } = React.useMemo(
        () => parse(),
        [parse],
    );

    /** `parseTableParams` is redundant with the new routing */
    // We want to always parse the query string even when syncWithLocation is
    // deactivated, for hotlinking to work properly
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(search ?? "?");

    const defaultCurrent =
        parsedParams?.params?.current || parsedCurrent || initialCurrent;
    const defaultPageSize =
        parsedParams?.params?.pageSize || parsedPageSize || initialPageSize;
    const defaultSorter =
        parsedParams?.params?.sorters ||
        (parsedSorter.length ? parsedSorter : initialSorter);
    const defaultFilter =
        parsedParams?.params?.filters ||
        (parsedFilters.length ? parsedFilters : initialFilter);

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { replace } = useNavigation();
    /** New way of `replace` calls to the router is using `useGo` */
    const go = useGo();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const resourceInUse =
        typeof resourceFromBindings === "string"
            ? resourceFromBindings
            : resourceFromBindings?.name ?? resource?.name;

    React.useEffect(() => {
        warnOnce(
            typeof resourceInUse === "undefined",
            `useTable: \`resource\` is not defined.`,
        );
    }, [resourceInUse]);

    const [sorter, setSorter] = useState<CrudSorting>(
        setInitialSorters(permanentSorter, defaultSorter ?? []),
    );
    const [filters, setFilters] = useState<CrudFilters>(
        setInitialFilters(permanentFilter, defaultFilter ?? []),
    );
    const [current, setCurrent] = useState<number>(defaultCurrent);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);

    const createLinkForSyncWithLocation = ({
        pagination: { current, pageSize },
        sorter,
        filters,
    }: SyncWithLocationParams) => {
        if (
            (go as { __provided?: boolean })?.__provided &&
            (parse as { __provided?: boolean })?.__provided
        ) {
            return (
                go({
                    type: "path",
                    options: {
                        keepHash: true,
                        keepQuery: true,
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
                sorter,
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
            setSorter(setInitialSorters(permanentSorter, defaultSorter ?? []));
            setFilters(setInitialFilters(permanentFilter, defaultFilter ?? []));
        }
    }, [search]);

    const currentQueryParams = (): object => {
        if ((parse as { __provided?: boolean })?.__provided) {
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

            if ((go as { __provided?: boolean })?.__provided) {
                go({
                    type: "replace",
                    query: {
                        current,
                        pageSize,
                        sorter: differenceWith(
                            sorter,
                            permanentSorter,
                            isEqual,
                        ),
                        filters: differenceWith(
                            filters,
                            permanentFilter,
                            isEqual,
                        ),
                        queryParams,
                    },
                });
            } else if (replace) {
                const stringifyParams = stringifyTableParams({
                    ...(hasPagination
                        ? {
                              pagination: {
                                  pageSize,
                                  current,
                              },
                          }
                        : {}),
                    sorter: differenceWith(sorter, permanentSorter, isEqual),
                    filters: differenceWith(filters, permanentFilter, isEqual),
                    ...queryParams,
                });
                return replace(`${pathname}?${stringifyParams}`, undefined, {
                    shallow: true,
                });
            }
        }
    }, [syncWithLocation, current, pageSize, sorter, filters]);

    const queryResult = useList<TData, TError>({
        resource: resourceInUse,
        hasPagination,
        pagination: { current, pageSize },
        filters: unionFilters(permanentFilter, filters),
        sorters: unionSorters(permanentSorter, sorter),
        queryOptions,
        successNotification,
        errorNotification,
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        liveMode,
        liveParams,
        onLiveEvent,
        dataProviderName,
    });

    const setFiltersAsMerge = (newFilters: CrudFilters) => {
        setFilters((prevFilters) =>
            unionFilters(permanentFilter, newFilters, prevFilters),
        );
    };

    const setFiltersAsReplace = (newFilters: CrudFilters) => {
        setFilters(unionFilters(permanentFilter, newFilters));
    };

    const setFiltersWithSetter = (
        setter: (prevFilters: CrudFilters) => CrudFilters,
    ) => {
        setFilters((prev) => unionFilters(permanentFilter, setter(prev)));
    };

    const setFiltersFn: useTableReturnType<TData>["setFilters"] = (
        setterOrFilters,
        behavior: SetFilterBehavior = defaultSetFilterBehavior,
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
        setSorter(() => unionSorters(permanentSorter, newSorter));
    };

    const paginationValues = useMemo(() => {
        if (hasPagination) {
            return {
                current,
                setCurrent,
                pageSize,
                setPageSize,
                pageCount: pageSize
                    ? Math.ceil((queryResult.data?.total ?? 0) / pageSize)
                    : 1,
            };
        }

        return {
            current: undefined,
            setCurrent: undefined,
            pageSize: undefined,
            setPageSize: undefined,
            pageCount: undefined,
        };
    }, [hasPagination, current, pageSize, queryResult.data?.total]);

    return {
        tableQueryResult: queryResult,
        sorter,
        setSorter: setSortWithUnion,
        filters,
        setFilters: setFiltersFn,
        ...paginationValues,
        createLinkForSyncWithLocation,
    };
}
