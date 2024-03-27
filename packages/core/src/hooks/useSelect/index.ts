import { useCallback, useMemo, useState } from "react";

import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";

import { pickNotDeprecated } from "@definitions/helpers";
import { useList, useMany, useMeta } from "@hooks";

import {
  BaseKey,
  BaseOption,
  BaseRecord,
  CrudFilter,
  CrudSort,
  GetListResponse,
  GetManyResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import { LiveModeProps } from "../../contexts/live/types";
import { SuccessErrorNotification } from "../../contexts/notification/types";
import { BaseListProps } from "../data/useList";
import { useResource } from "../resource/useResource/index";
import {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type UseSelectProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * Set the option's label value
   * @default `"title"`
   */
  optionLabel?: keyof TData extends string
    ? keyof TData
    : never | ((item: TData) => string);
  /**
   * Set the option's value
   * @default `"id"`
   */
  optionValue?: keyof TData extends string
    ? keyof TData
    : never | ((item: TData) => string);
  /**
   * Field name to search for.
   * @description If provided `optionLabel` is a string, uses `optionLabel`'s value.
   * @default `"title"`
   * @example
   * // when optionLabel is string.
   * useSelect({ optionLabel: "name" })
   * // uses `name` field.
   * @example
   * // when optionLabel is function.
   * useSelect({ optionLabel: (field) => field.description })
   * // uses `title`, since `optionLabel` is a function.
   */
  searchField?: keyof TData extends string ? keyof TData : never;
  /**
   * Allow us to sort the options
   * @deprecated Use `sorters` instead
   */
  sort?: CrudSort[];
  /**
   * Allow us to sort the options
   */
  sorters?: CrudSort[];
  /**
   * Resource name for API data interactions
   */
  filters?: CrudFilter[];
  /**
   * Adds extra `options`
   */
  defaultValue?: BaseKey | BaseKey[];
  /**
   * The number of milliseconds to delay
   * @default `300`
   */
  debounce?: number;
  /**
   * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
   */
  queryOptions?: UseQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >;
  /**
   * Pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
   * @type {  current?: number; pageSize?: number;}
   * @default `undefined`
   */
  pagination?: Prettify<
    Omit<Pagination, "mode"> & {
      /**
       * Whether to use server side pagination or not.
       * @default "off"
       */
      mode?: Pagination["mode"];
    }
  >;
  /**
   * Disabling pagination option from [`useList()`](/docs/api-reference/core/hooks/data/useList/)
   * @type boolean
   * @default `false`
   * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
   */
  hasPagination?: boolean;
  /**
   * react-query [useQuery](https://react-query.tanstack.com/reference/useQuery) options
   */
  defaultValueQueryOptions?: UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError
  >;
  /**
   * If defined, this callback allows us to override all filters for every search request.
   * @default `undefined`
   */
  onSearch?: (value: string) => CrudFilter[];
  /**
   * Additional meta data to pass to the `useMany` from the data provider
   */
  meta?: MetaQuery;
  /**
   * Additional meta data to pass to the `useMany` from the data provider
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default `default`
   */
  dataProviderName?: string;
  /**
   * Amount of records to fetch in select box list.
   * @deprecated use [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) instead
   * @default `undefined`
   */
  fetchSize?: number;
} & SuccessErrorNotification<
  GetListResponse<TData>,
  TError,
  Prettify<BaseListProps>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

export type UseSelectReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TOption extends BaseOption = BaseOption,
> = {
  queryResult: QueryObserverResult<GetListResponse<TData>, TError>;
  defaultValueQueryResult: QueryObserverResult<GetManyResponse<TData>>;
  onSearch: (value: string) => void;
  options: TOption[];
} & UseLoadingOvertimeReturnType;

/**
 * `useSelect` hook is used to fetch data from the dataProvider and return the options for the select box.
 *
 * It uses `getList` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-reference/core/components/refine-config/ `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/useSelect} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useSelect = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
  TOption extends BaseOption = BaseOption,
>(
  props: UseSelectProps<TQueryFnData, TError, TData>,
): UseSelectReturnType<TData, TError, TOption> => {
  const [search, setSearch] = useState<CrudFilter[]>([]);
  const [options, setOptions] = useState<TOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);

  const {
    resource: resourceFromProps,
    sort,
    sorters,
    filters = [],
    optionLabel = "title",
    optionValue = "id",
    searchField = typeof optionLabel === "string" ? optionLabel : "title",
    debounce: debounceValue = 300,
    successNotification,
    errorNotification,
    defaultValueQueryOptions: defaultValueQueryOptionsFromProps,
    queryOptions,
    fetchSize,
    pagination,
    hasPagination = false,
    liveMode,
    defaultValue = [],
    onLiveEvent,
    onSearch: onSearchFromProp,
    liveParams,
    meta,
    metaData,
    dataProviderName,
    overtimeOptions,
  } = props;

  const getOptionLabel = useCallback(
    (item: TData) => {
      if (typeof optionLabel === "string") {
        return get(item, optionLabel);
      }

      return optionLabel(item);
    },
    [optionLabel],
  );

  const getOptionValue = useCallback(
    (item: TData) => {
      if (typeof optionValue === "string") {
        return get(item, optionValue);
      }

      return optionValue(item);
    },
    [optionValue],
  );

  const { resource, identifier } = useResource(resourceFromProps);

  const getMeta = useMeta();

  const combinedMeta = getMeta({
    resource,
    meta: pickNotDeprecated(meta, metaData),
  });

  const defaultValues = Array.isArray(defaultValue)
    ? defaultValue
    : [defaultValue];

  const defaultValueQueryOnSuccess = useCallback(
    (data: GetManyResponse<TData>) => {
      setSelectedOptions(
        data.data.map(
          (item) =>
            ({
              label: getOptionLabel(item),
              value: getOptionValue(item),
            }) as TOption,
        ),
      );
    },
    [optionLabel, optionValue],
  );

  const defaultValueQueryOptions =
    defaultValueQueryOptionsFromProps ?? (queryOptions as any);

  const defaultValueQueryResult = useMany<TQueryFnData, TError, TData>({
    resource: identifier,
    ids: defaultValues,
    queryOptions: {
      ...defaultValueQueryOptions,
      enabled:
        defaultValues.length > 0 && (defaultValueQueryOptions?.enabled ?? true),
      onSuccess: (data) => {
        defaultValueQueryOnSuccess(data);
        defaultValueQueryOptions?.onSuccess?.(data);
      },
    },
    meta: combinedMeta,
    metaData: combinedMeta,
    liveMode: "off",
    dataProviderName,
  });

  const defaultQueryOnSuccess = useCallback(
    (data: GetListResponse<TData>) => {
      setOptions(
        data.data.map(
          (item) =>
            ({
              label: getOptionLabel(item),
              value: getOptionValue(item),
            }) as TOption,
        ),
      );
    },
    [optionLabel, optionValue],
  );

  const queryResult = useList<TQueryFnData, TError, TData>({
    resource: identifier,
    sorters: pickNotDeprecated(sorters, sort),
    filters: filters.concat(search),
    pagination: {
      current: pagination?.current,
      pageSize: pagination?.pageSize ?? fetchSize,
      mode: pagination?.mode,
    },
    hasPagination,
    queryOptions: {
      ...queryOptions,
      onSuccess: (data) => {
        defaultQueryOnSuccess(data);
        queryOptions?.onSuccess?.(data);
      },
    },
    successNotification,
    errorNotification,
    meta: combinedMeta,
    metaData: combinedMeta,
    liveMode,
    liveParams,
    onLiveEvent,
    dataProviderName,
  });

  const onSearch = (value: string) => {
    if (onSearchFromProp) {
      setSearch(onSearchFromProp(value));
      return;
    }

    if (!value) {
      setSearch([]);
      return;
    }

    setSearch([
      {
        field: searchField,
        operator: "contains",
        value,
      },
    ]);
  };

  const { elapsedTime } = useLoadingOvertime({
    isLoading: queryResult.isFetching || defaultValueQueryResult.isFetching,
    interval: overtimeOptions?.interval,
    onInterval: overtimeOptions?.onInterval,
  });

  const combinedOptions = useMemo(
    () => uniqBy([...options, ...selectedOptions], "value"),
    [options, selectedOptions],
  );

  return {
    queryResult,
    defaultValueQueryResult,
    options: combinedOptions,
    onSearch: debounce(onSearch, debounceValue),
    overtime: { elapsedTime },
  };
};
