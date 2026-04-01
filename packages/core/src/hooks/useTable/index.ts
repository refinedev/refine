import React, { useState, useEffect, useCallback } from "react";

import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import warnOnce from "warn-once";

import {
  parseTableParams,
  setInitialFilters,
  setInitialSorters,
  unionFilters,
  unionSorters,
} from "@definitions/table";
import {
  useGo,
  useList,
  useLiveMode,
  useMeta,
  useParsed,
  useResourceParams,
  useSyncWithLocation,
} from "@hooks";

import type {
  BaseRecord,
  CrudFilter,
  CrudSort,
  CursorDirection,
  CursorValue,
  GetListResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import type { BaseListProps } from "../data/useList";
import type { MakeOptional } from "../../definitions/types/index";
import type {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TQueryFnData, TError, TData> = {
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
   * Sort configs
   */
  sorters?: {
    /**
     * Initial sorter state
     */
    initial?: CrudSort[];
    /**
     * Default and unchangeable sorter state
     *  @default `[]`
     */
    permanent?: CrudSort[];
    /**
     * Whether to use server side sorting or not.
     * @default "server"
     */
    mode?: "server" | "off";
  };
  /**
   * Filter configs
   */
  filters?: {
    /**
     * Initial filter state
     */
    initial?: CrudFilter[];
    /**
     * Default and unchangeable filter state
     *  @default `[]`
     */
    permanent?: CrudFilter[];
    /**
     * Default behavior of the `setFilters` function
     * @default `"merge"`
     */
    defaultBehavior?: SetFilterBehavior;
    /**
     * Whether to use server side filter or not.
     * @default "server"
     */
    mode?: "server" | "off";
  };
  /**
   * Sortings, filters, page index and records shown per page are tracked by browser history
   * @default Value set in [Refine](/docs/api-reference/core/components/refine-config/#syncwithlocation). If a custom resource is given, it will be `false`
   */
  syncWithLocation?: boolean;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) options
   */
  queryOptions?: MakeOptional<
    UseQueryOptions<
      GetListResponse<TQueryFnData>,
      TError,
      GetListResponse<TData>
    >,
    "queryKey" | "queryFn"
  >;
  /**
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  GetListResponse<TData>,
  TError,
  Prettify<BaseListProps>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationPagination = Pick<
  Pagination,
  "currentPage" | "pageSize"
> & {
  cursor?: Required<
    Pick<NonNullable<Pagination["cursor"]>, "current" | "direction">
  >;
};

type SyncWithLocationParams = {
  pagination: SyncWithLocationPagination;
  sorters: CrudSort[];
  filters: CrudFilter[];
};

type CursorState = {
  current?: CursorValue;
  direction: CursorDirection;
};

type UseTableCursorType = Pick<
  NonNullable<Pagination["cursor"]>,
  "next" | "prev"
> & {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

export type useTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  tableQuery: QueryObserverResult<GetListResponse<TData>, TError>;
  sorters: CrudSort[];
  setSorters: (sorter: CrudSort[]) => void;
  filters: CrudFilter[];
  setFilters: ((filters: CrudFilter[], behavior?: SetFilterBehavior) => void) &
    ((setter: (prevFilters: CrudFilter[]) => CrudFilter[]) => void);
  createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
  currentPage: number;
  setCurrentPage: ReactSetState<useTableReturnType["currentPage"]>;
  pageSize: number;
  setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
  pageCount: number;
  result: {
    data: TData[];
    total: number | undefined;
    [key: string]: any;
  };
  cursor: UseTableCursorType;
} & UseLoadingOvertimeReturnType;

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/useTable} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

const defaultPermanentFilter: CrudFilter[] = [];
const defaultPermanentSorter: CrudSort[] = [];
const EMPTY_ARRAY = Object.freeze([]) as [];

export function useTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  pagination,
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
  dataProviderName,
  overtimeOptions,
}: useTableProps<TQueryFnData, TError, TData> = {}): useTableReturnType<
  TData,
  TError
> {
  const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

  const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

  const liveMode = useLiveMode(liveModeFromProp);

  const getMeta = useMeta();
  const parsedParams = useParsed();

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
  const isPaginationEnabled = pagination?.mode !== "off";
  const isCursorPaginationEnabled = pagination?.mode === "cursor";
  const prefferedCurrentPage = pagination?.currentPage;
  const prefferedPageSize = pagination?.pageSize;
  const preferredCursor = pagination?.cursor;
  const preferredMeta = meta;

  // Parse table params from URL if available
  const {
    parsedCurrentPage,
    parsedPageSize,
    parsedSorter,
    parsedFilters,
    parsedCursor,
    parsedCursorDirection,
  } = parseTableParams(parsedParams.params?.search ?? "?");

  const preferredInitialFilters = filtersFromProp?.initial;
  const preferredPermanentFilters =
    filtersFromProp?.permanent ?? defaultPermanentFilter;

  const preferredInitialSorters = sortersFromProp?.initial;
  const preferredPermanentSorters =
    sortersFromProp?.permanent ?? defaultPermanentSorter;

  const prefferedFilterBehavior = filtersFromProp?.defaultBehavior ?? "merge";

  let defaultCurrentPage: number;
  let defaultPageSize: number;
  let defaultSorter: CrudSort[] | undefined;
  let defaultFilter: CrudFilter[] | undefined;
  let initialCursorCurrent = preferredCursor?.current;
  let initialCursorDirection = preferredCursor?.direction ?? "after";

  if (syncWithLocation) {
    if (isCursorPaginationEnabled) {
      if (parsedCursor !== undefined) {
        initialCursorCurrent = parsedCursor;
        initialCursorDirection = parsedCursorDirection;
      }
    }
    defaultCurrentPage = isCursorPaginationEnabled
      ? 1
      : parsedParams?.params?.currentPage ||
        parsedCurrentPage ||
        prefferedCurrentPage ||
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
    defaultCurrentPage = isCursorPaginationEnabled
      ? 1
      : prefferedCurrentPage || 1;
    defaultPageSize = prefferedPageSize || 10;
    defaultSorter = preferredInitialSorters;
    defaultFilter = preferredInitialFilters;
  }

  const go = useGo();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProp,
  });

  const combinedMeta = getMeta({
    resource,
    meta: preferredMeta,
  });

  React.useEffect(() => {
    warnOnce(
      typeof identifier === "undefined",
      "useTable: `resource` is not defined.",
    );
  }, [identifier]);

  const [sorters, setSorters] = useState<CrudSort[]>(
    setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
  );
  const [filters, setFilters] = useState<CrudFilter[]>(
    setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
  );
  const [currentPage, setCurrentPageState] =
    useState<number>(defaultCurrentPage);
  const [pageSize, setPageSizeState] = useState<number>(defaultPageSize);
  const [cursorState, setCursorState] = useState<CursorState>({
    current: initialCursorCurrent,
    direction: initialCursorDirection,
  });

  const getCurrentQueryParams = (): object => {
    // We get QueryString parameters that are uncontrolled by refine.
    const {
      sorter,
      sorters,
      filters,
      pageSize,
      current,
      currentPage,
      after,
      before,
      ...rest
    } = parsedParams?.params ?? {};

    return rest;
  };

  const getPaginationQueryForSyncWithLocation = ({
    currentPage,
    pageSize,
    cursor,
  }: SyncWithLocationPagination) => {
    if (!isPaginationEnabled) {
      return {
        currentPage: undefined,
        pageSize: undefined,
        after: undefined,
        before: undefined,
      };
    }

    if (isCursorPaginationEnabled) {
      return {
        currentPage: undefined,
        pageSize,
        after: cursor?.direction === "after" ? cursor.current : undefined,
        before: cursor?.direction === "before" ? cursor.current : undefined,
      };
    }

    return {
      currentPage,
      pageSize,
      after: undefined,
      before: undefined,
    };
  };

  const createLinkForSyncWithLocation = ({
    pagination,
    sorters,
    filters,
  }: SyncWithLocationParams) => {
    return (
      go({
        type: "path",
        options: {
          keepHash: true,
          keepQuery: true,
        },
        query: {
          ...getPaginationQueryForSyncWithLocation(pagination),
          sorters,
          filters,
          ...getCurrentQueryParams(),
        },
      }) ?? ""
    );
  };

  useEffect(() => {
    if (parsedParams?.params?.search === "") {
      setCurrentPageState(defaultCurrentPage);
      setPageSizeState(defaultPageSize);
      setSorters(
        setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
      );
      setFilters(
        setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
      );
      setCursorState({
        current: preferredCursor?.current,
        direction: preferredCursor?.direction ?? "after",
      });
    }
  }, [
    defaultCurrentPage,
    defaultPageSize,
    parsedParams?.params?.search,
    preferredCursor?.current,
    preferredCursor?.direction,
    preferredPermanentFilters,
    preferredPermanentSorters,
    defaultFilter,
    defaultSorter,
  ]);

  useEffect(() => {
    if (syncWithLocation) {
      const syncCursor =
        cursorState.current !== undefined
          ? {
              current: cursorState.current,
              direction: cursorState.direction,
            }
          : undefined;

      go({
        type: "replace",
        options: {
          keepQuery: true,
        },
        query: {
          ...getPaginationQueryForSyncWithLocation({
            currentPage,
            pageSize,
            cursor: syncCursor,
          }),
          sorters: differenceWith(sorters, preferredPermanentSorters, isEqual),
          filters: differenceWith(filters, preferredPermanentFilters, isEqual),
        },
      });
    }
  }, [
    syncWithLocation,
    pageSize,
    sorters,
    filters,
    isCursorPaginationEnabled,
    isPaginationEnabled,
    currentPage,
    cursorState.current,
    cursorState.direction,
  ]);

  const currentPageValue = isCursorPaginationEnabled ? 1 : currentPage;

  const paginationForQuery = isCursorPaginationEnabled
    ? {
        currentPage: currentPageValue,
        pageSize,
        mode: pagination?.mode,
        ...(cursorState.current !== undefined
          ? {
              cursor: {
                current: cursorState.current,
                direction: cursorState.direction,
              },
            }
          : {}),
      }
    : {
        currentPage: currentPageValue,
        pageSize,
        mode: pagination?.mode,
      };

  const queryResult = useList<TQueryFnData, TError, TData>({
    resource: identifier,
    pagination: paginationForQuery,
    filters: isServerSideFilteringEnabled
      ? unionFilters(preferredPermanentFilters, filters)
      : undefined,
    sorters: isServerSideSortingEnabled
      ? unionSorters(preferredPermanentSorters, sorters)
      : undefined,
    queryOptions,
    overtimeOptions,
    successNotification,
    errorNotification,
    meta: combinedMeta,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName,
  });

  const resetCursorState = useCallback(() => {
    if (!isCursorPaginationEnabled) {
      return;
    }

    setCursorState({
      current: preferredCursor?.current,
      direction: preferredCursor?.direction ?? "after",
    });
  }, [
    isCursorPaginationEnabled,
    preferredCursor?.current,
    preferredCursor?.direction,
  ]);

  const setFiltersAsMerge = useCallback(
    (newFilters: CrudFilter[]) => {
      resetCursorState();
      setFilters((prevFilters) =>
        unionFilters(preferredPermanentFilters, newFilters, prevFilters),
      );
    },
    [preferredPermanentFilters, resetCursorState],
  );

  const setFiltersAsReplace = useCallback(
    (newFilters: CrudFilter[]) => {
      resetCursorState();
      setFilters(unionFilters(preferredPermanentFilters, newFilters));
    },
    [preferredPermanentFilters, resetCursorState],
  );

  const setFiltersWithSetter = useCallback(
    (setter: (prevFilters: CrudFilter[]) => CrudFilter[]) => {
      resetCursorState();
      setFilters((prev) =>
        unionFilters(preferredPermanentFilters, setter(prev)),
      );
    },
    [preferredPermanentFilters, resetCursorState],
  );

  const setFiltersFn: useTableReturnType<TQueryFnData>["setFilters"] =
    useCallback(
      (
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
      },
      [setFiltersWithSetter, setFiltersAsReplace, setFiltersAsMerge],
    );

  const setSortWithUnion = useCallback(
    (newSorter: CrudSort[]) => {
      resetCursorState();
      setSorters(() => unionSorters(preferredPermanentSorters, newSorter));
    },
    [preferredPermanentSorters, resetCursorState],
  );

  const setCurrentPage: ReactSetState<useTableReturnType["currentPage"]> =
    useCallback(
      (value) => {
        if (isCursorPaginationEnabled) {
          return;
        }

        setCurrentPageState(value);
      },
      [isCursorPaginationEnabled],
    );

  const setPageSize: ReactSetState<useTableReturnType["pageSize"]> =
    useCallback(
      (value) => {
        resetCursorState();
        setPageSizeState(value);
      },
      [resetCursorState],
    );

  const nextCursor = queryResult.result.cursor?.next;
  const previousCursor = queryResult.result.cursor?.prev;

  const goToNextPage = useCallback(() => {
    if (!isCursorPaginationEnabled) {
      setCurrentPageState((prev) => prev + 1);
      return;
    }

    if (nextCursor !== undefined) {
      setCursorState({
        current: nextCursor,
        direction: "after",
      });
    }
  }, [isCursorPaginationEnabled, nextCursor]);

  const goToPreviousPage = useCallback(() => {
    if (!isCursorPaginationEnabled) {
      setCurrentPageState((prev) => Math.max(1, prev - 1));
      return;
    }

    if (previousCursor !== undefined) {
      setCursorState({
        current: previousCursor,
        direction: "before",
      });
    }
  }, [isCursorPaginationEnabled, previousCursor]);

  const pageCount = pageSize
    ? Math.ceil((queryResult.result?.total ?? 0) / pageSize)
    : 1;

  const hasNextPage = isCursorPaginationEnabled
    ? nextCursor !== undefined
    : currentPageValue < pageCount;

  const hasPreviousPage = isCursorPaginationEnabled
    ? previousCursor !== undefined
    : currentPageValue > 1;

  const cursor: UseTableCursorType = {
    next: nextCursor,
    prev: previousCursor,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  };

  return {
    tableQuery: queryResult.query,
    sorters,
    setSorters: setSortWithUnion,
    filters,
    setFilters: setFiltersFn,
    currentPage: currentPageValue,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount,
    createLinkForSyncWithLocation,
    overtime: queryResult.overtime,
    result: {
      ...queryResult.result,
      data: queryResult.result?.data || EMPTY_ARRAY,
      total: queryResult.result?.total,
    },
    cursor,
  };
}
