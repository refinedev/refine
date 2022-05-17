import { useState, useEffect } from "react";
import { QueryObserverResult, UseQueryOptions } from "react-query";

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

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { push } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const [sorter, setSorter] = useState<CrudSorting>(
        setInitialSorters(permanentSorter, initialSorter ?? []),
    );
    const [filters, setFilters] = useState<CrudFilters>(
        setInitialFilters(permanentFilter, initialFilter ?? []),
    );
    const [current, setCurrent] = useState<number>(initialCurrent);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);

    useEffect(() => {
        if (syncWithLocation && search === "") {
            setCurrent(initialCurrent);
            setPageSize(initialPageSize);
            setSorter(setInitialSorters(permanentSorter, initialSorter ?? []));
            setFilters(setInitialFilters(permanentFilter, initialFilter ?? []));
        }
    }, [syncWithLocation, search]);

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
            filters: unionFilters(permanentFilter, [], filters),
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

    const setFiltersWithUnion = (newFilters: CrudFilters) => {
        setFilters((prevFilters) =>
            unionFilters(permanentFilter, newFilters, prevFilters),
        );
    };

    const setSortWithUnion = (newSorter: CrudSorting) => {
        setSorter(() => unionSorters(permanentSorter, newSorter));
    };

    const pageCount = Math.ceil((queryResult.data?.total ?? 0) / pageSize);

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
        pageCount,
    };
};
