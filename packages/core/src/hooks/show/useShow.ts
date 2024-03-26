import React, { useState } from "react";

import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import warnOnce from "warn-once";

import { pickNotDeprecated } from "@definitions/helpers";
import { useMeta, useOne } from "@hooks";

import {
  BaseKey,
  BaseRecord,
  GetOneResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import { LiveModeProps } from "../../contexts/live/types";
import { SuccessErrorNotification } from "../../contexts/notification/types";
import { useResource } from "../resource/useResource";
import {
  UseLoadingOvertimeOptionsProps,
  UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type useShowReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = {
  queryResult: QueryObserverResult<GetOneResponse<TData>, TError>;
  showId?: BaseKey;
  setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
} & UseLoadingOvertimeReturnType;

export type useShowProps<
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
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-reference/core/components/refine-config/ `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/show/useShow} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useShow = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  id,
  successNotification,
  errorNotification,
  meta,
  metaData,
  liveMode,
  onLiveEvent,
  dataProviderName,
  queryOptions,
  overtimeOptions,
}: useShowProps<TQueryFnData, TError, TData> = {}): useShowReturnType<
  TData,
  TError
> => {
  const {
    resource,
    id: idFromRoute,
    identifier,
  } = useResource(resourceFromProp);
  const { identifier: inferredIdentifier } = useResource();
  const getMeta = useMeta();

  const getDefaultId = () => {
    const idFromPropsOrRoute = id ?? idFromRoute;

    if (resourceFromProp && resourceFromProp !== inferredIdentifier) {
      return id;
    }

    return idFromPropsOrRoute;
  };
  const defaultId = getDefaultId();

  const [showId, setShowId] = useState<BaseKey | undefined>(defaultId);

  React.useEffect(() => {
    setShowId(defaultId);
  }, [defaultId]);

  const combinedMeta = getMeta({
    resource,
    meta: pickNotDeprecated(meta, metaData),
  });

  warnOnce(
    Boolean(resourceFromProp) && !id,
    `[useShow]: resource: "${identifier}", id: ${id} \n\nIf you don't use the \`setShowId\` method to set the \`showId\`, you should pass the \`id\` prop to \`useShow\`. Otherwise, \`useShow\` will not be able to infer the \`id\` from the current URL. \n\nSee https://refine.dev/docs/api-reference/core/hooks/show/useShow/#resource`,
  );

  const queryResult = useOne<TQueryFnData, TError, TData>({
    resource: identifier,
    id: showId ?? "",
    queryOptions: {
      enabled: showId !== undefined,
      ...queryOptions,
    },
    successNotification,
    errorNotification,
    meta: combinedMeta,
    metaData: combinedMeta,
    liveMode,
    onLiveEvent,
    dataProviderName,
  });

  const { elapsedTime } = useLoadingOvertime({
    isLoading: queryResult.isFetching,
    interval: overtimeOptions?.interval,
    onInterval: overtimeOptions?.onInterval,
  });

  return {
    queryResult,
    showId,
    setShowId,
    overtime: { elapsedTime },
  };
};
