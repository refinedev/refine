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
    MetaDataQuery,
    LiveModeProps,
} from "../../interfaces";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TData, TError> = {
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    hasPagination?: boolean;
    initialSorter?: CrudSorting;
    permanentSorter?: CrudSorting;
    defaultSetFilterBehavior?: SetFilterBehavior;
    initialFilter?: CrudFilters;
    permanentFilter?: CrudFilters;
    syncWithLocation?: boolean;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
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

export type useTableReturnType<TData extends BaseRecord = BaseRecord> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>>;
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
> = Omit<useTableReturnType<TData>, useTablePaginationKeys> &
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
): useTableReturnType<TData>;
// overload without pagination
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props?: useTableProps<TData, TError> & {
        hasPagination: false;
    },
): useTableNoPaginationReturnType<TData>;
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
    metaData,
    dataProviderName,
}: useTableProps<TData, TError> = {}):
    | useTableReturnType<TData>
    | useTableNoPaginationReturnType<TData> {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const { useLocation, useParams } = useRouterContext();
    const { search, pathname } = useLocation();
    const liveMode = useLiveMode(liveModeFromProp);

    // We want to always parse the query string even when syncWithLocation is
    // deactivated, for hotlinking to work properly
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(search);

    const defaultCurrent = parsedCurrent || initialCurrent;
    const defaultPageSize = parsedPageSize || initialPageSize;
    const defaultSorter = parsedSorter.length ? parsedSorter : initialSorter;
    const defaultFilter = parsedFilters.length ? parsedFilters : initialFilter;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { replace } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

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
        return `${pathname}?${stringifyParams}`;
    };

    useEffect(() => {
        if (search === "") {
            setCurrent(defaultCurrent);
            setPageSize(defaultPageSize);
            setSorter(setInitialSorters(permanentSorter, defaultSorter ?? []));
            setFilters(setInitialFilters(permanentFilter, defaultFilter ?? []));
        }
    }, [search]);

    useEffect(() => {
        if (syncWithLocation) {
            const currentQueryParams = qs.parse(search?.slice(1)); // remove first ? character
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
                ...currentQueryParams,
            });

            // Careful! This triggers render
            return replace(`${pathname}?${stringifyParams}`, undefined, {
                shallow: true,
            });
        }
    }, [syncWithLocation, current, pageSize, sorter, filters]);

    const queryResult = useList<TData, TError>({
        resource: resource.name,
        config: {
            hasPagination,
            pagination: { current, pageSize },
            filters: unionFilters(permanentFilter, filters),
            sort: unionSorters(permanentSorter, sorter),
        },
        queryOptions,
        successNotification,
        errorNotification,
        metaData,
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
