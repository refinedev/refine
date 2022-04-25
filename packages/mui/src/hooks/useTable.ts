import { useState, useEffect } from "react";
import { QueryObserverResult, UseQueryOptions } from "react-query";
import unionWith from "lodash/unionWith";
import reverse from "lodash/reverse";

import {
    useRouterContext,
    useSyncWithLocation,
    useNavigation,
    useResourceWithRoute,
    useList,
    useLiveMode,
    stringifyTableParams,
    parseTableParams,
    setInitialFilters,
    setInitialSorters,
    unionSorters,
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    CrudFilter,
} from "@pankod/refine-core";

export const compareFilters = (
    left: CrudFilter,
    right: CrudFilter,
): boolean => {
    if (left.operator !== "or" && right.operator !== "or") {
        return left.field == right.field && left.operator == right.operator;
    }
    return false;
};
// export const unionFilters = (
//     permanentFilter: CrudFilters,
//     newFilters: CrudFilters,
//     prevFilters: CrudFilters,
// ): CrudFilters =>
//     reverse(
//         unionWith(permanentFilter, newFilters, prevFilters, compareFilters),
//     ).filter(
//         (crudFilter) =>
//             crudFilter.value !== undefined && crudFilter.value !== null,
//     );

// Without Previous Filters
export const unionFilters = (
    permanentFilter: CrudFilters,
    newFilters: CrudFilters,
): CrudFilters =>
    reverse(unionWith(permanentFilter, newFilters, compareFilters)).filter(
        (crudFilter) =>
            crudFilter.value !== undefined && crudFilter.value !== null,
    );

export type useTableProps<TData, TError> = {
    resource?: string;
    initialCurrent?: number;
    initialPageSize?: number;
    initialSorter?: CrudSorting;
    permanentSorter?: CrudSorting;
    initialFilter?: CrudFilters;
    permanentFilter?: CrudFilters;
    syncWithLocation?: boolean;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type useTableReturnType<TData extends BaseRecord = BaseRecord> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>>;
    sorter: CrudSorting;
    setSorter: (sorter: CrudSorting) => void;
    filters: CrudFilters;
    setFilters: (filters: CrudFilters) => void;
    current: number;
    setCurrent: ReactSetState<useTableReturnType["current"]>;
    pageSize: number;
    setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
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

export const useTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    initialCurrent = 1,
    initialPageSize = 10,
    initialSorter,
    permanentSorter = defaultPermanentSorter,
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
}: useTableProps<TData, TError> = {}): useTableReturnType<TData> => {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const { useLocation, useParams } = useRouterContext();
    const { search, pathname } = useLocation();
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

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();
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

    useEffect(() => {
        if (syncWithLocation) {
            const stringifyParams = stringifyTableParams({
                pagination: {
                    pageSize,
                    current,
                },
                sorter,
                filters,
            });

            // Careful! This triggers render
            return push(`${pathname}?${stringifyParams}`);
        }
    }, [syncWithLocation, current, pageSize, sorter, filters]);

    const queryResult = useList<TData, TError>({
        resource: resource.name,
        config: {
            pagination: {
                current,
                pageSize,
            },
            // filters: unionFilters(permanentFilter, [], filters),
            // Without Previous Filters
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

    // const setFiltersWithUnion = (newFilters: CrudFilters) => {
    //     setFilters((prevFilters) =>
    //         unionFilters(permanentFilter, newFilters, prevFilters),
    //     );
    // };

    // With Previous Filters
    const setFiltersWithUnion = (newFilters: CrudFilters) => {
        setFilters(() => unionFilters(permanentFilter, newFilters));
    };

    const setSortWithUnion = (newSorter: CrudSorting) => {
        setSorter(() => unionSorters(permanentSorter, newSorter));
    };

    return {
        tableQueryResult: queryResult,
        sorter,
        setSorter: setSortWithUnion,
        filters,
        setFilters: setFiltersWithUnion,
        current,
        setCurrent,
        pageSize,
        setPageSize,
    };
};
