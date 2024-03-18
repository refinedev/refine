import React, { useState, useEffect } from "react";

import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import qs from "qs";
import warnOnce from "warn-once";

import { pickNotDeprecated } from "@definitions/helpers";
import {
  parseTableParams,
  setInitialFilters,
  setInitialSorters,
  stringifyTableParams,
  unionFilters,
  unionSorters,
} from "@definitions/table";
import {
  useGo,
  useList,
  useLiveMode,
  useMeta,
  useNavigation,
  useParsed,
  useResource,
  useRouterContext,
  useRouterType,
  useSyncWithLocation,
} from "@hooks";

import {
  BaseRecord,
  CrudFilter,
  CrudSort,
  GetListResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import { LiveModeProps } from "../../contexts/live/types";
import { SuccessErrorNotification } from "../../contexts/notification/types";
import { BaseListProps } from "../data/useList";
import {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
  useLoadingOvertime,
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
   * Initial sorter state
   * @deprecated `initialSorter` property is deprecated. Use `sorters.initial` instead.
   */
  initialSorter?: CrudSort[];
  /**
   * Default and unchangeable sorter state
   *  @default `[]`
   *  @deprecated `permanentSorter` property is deprecated. Use `sorters.permanent` instead.
   */
  permanentSorter?: CrudSort[];
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
   * Initial filter state
   * @deprecated `initialFilter` property is deprecated. Use `filters.initial` instead.
   */
  initialFilter?: CrudFilter[];
  /**
   * Default and unchangeable filter state
   * @default `[]`
   * @deprecated `permanentFilter` property is deprecated. Use `filters.permanent` instead.
   */
  permanentFilter?: CrudFilter[];
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
  queryOptions?: UseQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >;
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
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationParams = {
  pagination: { current?: number; pageSize?: number };
  /**
   * @deprecated `sorter` is deprecated. Use `sorters` instead.
   */
  sorter?: CrudSort[];
  sorters: CrudSort[];
  filters: CrudFilter[];
};

export type useTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  tableQueryResult: QueryObserverResult<GetListResponse<TData>, TError>;
  /**
   * @deprecated `sorter` is deprecated. Use `sorters` instead.
   */
  sorter: CrudSort[];
  sorters: CrudSort[];
  /**
   * @deprecated `setSorter` is deprecated. Use `setSorters` instead.
   */
  setSorter: (sorter: CrudSort[]) => void;
  setSorters: (sorter: CrudSort[]) => void;
  filters: CrudFilter[];
  setFilters: ((filters: CrudFilter[], behavior?: SetFilterBehavior) => void) &
    ((setter: (prevFilters: CrudFilter[]) => CrudFilter[]) => void);
  createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
  current: number;
  setCurrent: ReactSetState<useTableReturnType["current"]>;
  pageSize: number;
  setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
  pageCount: number;
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

export function useTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
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
  overtimeOptions,
}: useTableProps<TQueryFnData, TError, TData> = {}): useTableReturnType<
  TData,
  TError
> {
  const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

  const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

  const liveMode = useLiveMode(liveModeFromProp);

  const routerType = useRouterType();
  const { useLocation } = useRouterContext();
  const { search, pathname } = useLocation();
  const getMeta = useMeta();
  const parsedParams = useParsed();

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
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
  let defaultSorter: CrudSort[] | undefined;
  let defaultFilter: CrudFilter[] | undefined;

  if (syncWithLocation) {
    defaultCurrent =
      parsedParams?.params?.current || parsedCurrent || prefferedCurrent || 1;
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

  const { resource, identifier } = useResource(resourceFromProp);

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
  const [current, setCurrent] = useState<number>(defaultCurrent);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const getCurrentQueryParams = (): object => {
    if (routerType === "new") {
      // We get QueryString parameters that are uncontrolled by refine.
      const { sorters, filters, pageSize, current, ...rest } =
        parsedParams?.params ?? {};

      return rest;
    }

    // We get QueryString parameters that are uncontrolled by refine.
    const { sorter, filters, pageSize, current, ...rest } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    return rest;
  };

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
            ...getCurrentQueryParams(),
          },
        }) ?? ""
      );
    }
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
  };

  useEffect(() => {
    if (search === "") {
      setCurrent(defaultCurrent);
      setPageSize(defaultPageSize);
      setSorters(
        setInitialSorters(preferredPermanentSorters, defaultSorter ?? []),
      );
      setFilters(
        setInitialFilters(preferredPermanentFilters, defaultFilter ?? []),
      );
    }
  }, [search]);

  useEffect(() => {
    if (syncWithLocation) {
      // Careful! This triggers render
      const queryParams = getCurrentQueryParams();

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
          sorters: differenceWith(sorters, preferredPermanentSorters, isEqual),
          filters: differenceWith(filters, preferredPermanentFilters, isEqual),
          ...queryParams,
        });
        return replace?.(`${pathname}?${stringifyParams}`, undefined, {
          shallow: true,
        });
      }
    }
  }, [syncWithLocation, current, pageSize, sorters, filters]);

  const queryResult = useList<TQueryFnData, TError, TData>({
    resource: identifier,
    hasPagination,
    pagination: { current, pageSize, mode: pagination?.mode },
    filters: isServerSideFilteringEnabled
      ? unionFilters(preferredPermanentFilters, filters)
      : undefined,
    sorters: isServerSideSortingEnabled
      ? unionSorters(preferredPermanentSorters, sorters)
      : undefined,
    queryOptions,
    successNotification,
    errorNotification,
    meta: combinedMeta,
    metaData: combinedMeta,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName,
  });

  const setFiltersAsMerge = (newFilters: CrudFilter[]) => {
    setFilters((prevFilters) =>
      unionFilters(preferredPermanentFilters, newFilters, prevFilters),
    );
  };

  const setFiltersAsReplace = (newFilters: CrudFilter[]) => {
    setFilters(unionFilters(preferredPermanentFilters, newFilters));
  };

  const setFiltersWithSetter = (
    setter: (prevFilters: CrudFilter[]) => CrudFilter[],
  ) => {
    setFilters((prev) => unionFilters(preferredPermanentFilters, setter(prev)));
  };

  const setFiltersFn: useTableReturnType<TQueryFnData>["setFilters"] = (
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

  const setSortWithUnion = (newSorter: CrudSort[]) => {
    setSorters(() => unionSorters(preferredPermanentSorters, newSorter));
  };

  const { elapsedTime } = useLoadingOvertime({
    isLoading: queryResult.isFetching,
    interval: overtimeOptions?.interval,
    onInterval: overtimeOptions?.onInterval,
  });

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
    overtime: {
      elapsedTime,
    },
  };
}
