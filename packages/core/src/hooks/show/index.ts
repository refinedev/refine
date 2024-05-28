import warnOnce from "warn-once";
import { useMeta, useOne, useResourceParams, useLoadingOvertime } from "@hooks";
import { pickNotDeprecated } from "@definitions/helpers";

import type { UseShowProps, UseShowReturnType } from "./types";
import type { BaseKey, BaseRecord, HttpError } from "../../contexts/data/types";

export type {
  UseShowProps,
  UseShowReturnType,
  useShowProps,
  useShowReturnType,
} from "./types";

/**
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/core/refine-component `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/data/hooks/use-show} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/core/interface-references/#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interface-references/#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/core/interface-references/#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */
export const useShow = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  id,
  meta,
  metaData,
  queryOptions,
  overtimeOptions,
  ...useOneProps
}: UseShowProps<TQueryFnData, TError, TData> = {}): UseShowReturnType<
  TData,
  TError
> => {
  const {
    resource,
    identifier,
    id: showId,
    setId: setShowId,
  } = useResourceParams({
    id,
    resource: resourceFromProp,
  });

  const getMeta = useMeta();

  const combinedMeta = getMeta({
    resource,
    meta: pickNotDeprecated(meta, metaData),
  });

  warnOnce(
    Boolean(resourceFromProp) && !showId,
    idWarningMessage(identifier, showId),
  );

  const queryResult = useOne<TQueryFnData, TError, TData>({
    resource: identifier,
    id: showId ?? "",
    queryOptions: {
      enabled: showId !== undefined,
      ...queryOptions,
    },
    meta: combinedMeta,
    metaData: combinedMeta,
    ...useOneProps,
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

const idWarningMessage = (identifier?: string, id?: BaseKey) =>
  `[useShow]: resource: "${identifier}", id: ${id} \n\nIf you don't use the \`setShowId\` method to set the \`showId\`, you should pass the \`id\` prop to \`useShow\`. Otherwise, \`useShow\` will not be able to infer the \`id\` from the current URL. \n\nSee https://refine.dev/docs/data/hooks/use-show/#resource`;
