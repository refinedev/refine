import React from "react";

import type {
  QueryObserverResult,
  UseQueryOptions,
} from "@tanstack/react-query";

import type {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";
import type {
  BaseKey,
  BaseRecord,
  GetOneResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";

export type UseShowReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  queryResult: QueryObserverResult<GetOneResponse<TData>, TError>;
  showId?: BaseKey;
  setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
} & UseLoadingOvertimeReturnType;

export type UseShowProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = {
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Data item ID for API data interactions
   * @default Reads `:id` from the URL
   */
  id?: BaseKey;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
   */
  queryOptions?: UseQueryOptions<
    GetOneResponse<TQueryFnData>,
    TError,
    GetOneResponse<TData>
  >;
  /**
   * Additional meta data to pass to the data provider's `getOne`
   */
  meta?: MetaQuery;
  /**
   * Additional meta data to pass to the data provider's `getOne`
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * Target data provider name for API call to be made
   * @default `"default"`
   */
  dataProviderName?: string;
} & LiveModeProps &
  SuccessErrorNotification<
    GetOneResponse<TData>,
    TError,
    Prettify<{ id?: BaseKey } & MetaQuery>
  > &
  UseLoadingOvertimeOptionsProps;

/**
 * @deprecated use `UseShowReturnType` instead
 */
export type useShowReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = UseShowReturnType<TData, TError>;

/**
 * @deprecated use `UseShowProps` instead
 */
export type useShowProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = UseShowProps<TQueryFnData, TError, TData>;
