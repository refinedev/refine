import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { pickNotDeprecated } from "@definitions/helpers";
import {
  useDataProvider,
  useHandleNotification,
  useKeys,
  useMeta,
  useOnError,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CreateResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

interface UseCustomMutationConfig {
  headers?: {};
}

type useCustomMutationParams<TData, TError, TVariables> = {
  url: string;
  method: "post" | "put" | "patch" | "delete";
  values: TVariables;
  /**
   * Meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * Meta data for `dataProvider`
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  dataProviderName?: string;
  config?: UseCustomMutationConfig;
} & SuccessErrorNotification<
  CreateResponse<TData>,
  TError,
  Prettify<UseCustomMutationConfig & MetaQuery>
>;

export type UseCustomMutationReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationResult<
  CreateResponse<TData>,
  TError,
  useCustomMutationParams<TData, TError, TVariables>,
  unknown
> & {
  isLoading: boolean;
};

export type UseCustomMutationOptions<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationOptions<
  CreateResponse<TData>,
  TError,
  useCustomMutationParams<TData, TError, TVariables>,
  unknown
>;

export type UseCustomMutationProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: UseCustomMutationOptions<TData, TError, TVariables>;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useCustomMutation` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCustomMutation} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCustomMutation = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseCustomMutationProps<
  TData,
  TError,
  TVariables
> = {}): UseCustomMutationReturnType<TData, TError, TVariables> &
  UseLoadingOvertimeReturnType => {
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const mutation = useMutation<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >({
    mutationKey: keys().data().mutation("customMutation").get(),
    mutationFn: ({
      url,
      method,
      values,
      meta,
      metaData,
      dataProviderName,
      config,
    }: useCustomMutationParams<TData, TError, TVariables>) => {
      const combinedMeta = getMeta({
        meta: pickNotDeprecated(meta, metaData),
      });

      const { custom } = dataProvider(dataProviderName);

      if (custom) {
        return custom<TData>({
          url,
          method,
          payload: values,
          meta: combinedMeta,
          metaData: combinedMeta,
          headers: { ...config?.headers },
        });
      }

      throw Error("Not implemented custom on data provider.");
    },
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useCustomMutation"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data && mutation.variables) {
      const {
        successNotification: successNotificationFromProp,
        config,
        meta,
        metaData,
      } = mutation.variables;

      const notificationConfig =
        typeof successNotificationFromProp === "function"
          ? successNotificationFromProp(mutation.data, {
              ...config,
              ...(pickNotDeprecated(meta, metaData) || {}),
            })
          : successNotificationFromProp;

      handleNotification(notificationConfig);
    }
  }, [mutation.isSuccess, mutation.data, mutation.variables]);

  // Handle error with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isError && mutation.error && mutation.variables) {
      const {
        errorNotification: errorNotificationFromProp,
        method,
        config,
        meta,
        metaData,
      } = mutation.variables;

      checkError(mutation.error);

      const notificationConfig =
        typeof errorNotificationFromProp === "function"
          ? errorNotificationFromProp(mutation.error, {
              ...config,
              ...(pickNotDeprecated(meta, metaData) || {}),
            })
          : errorNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `${method}-notification`,
        message: translate(
          "notifications.error",
          { statusCode: mutation.error.statusCode },
          `Error (status code: ${mutation.error.statusCode})`,
        ),
        description: mutation.error.message,
        type: "error",
      });
    }
  }, [mutation.isError, mutation.error, mutation.variables]);

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isPending, // v5 uses isPending instead of isLoading
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    overtime: { elapsedTime },
  } as UseCustomMutationReturnType<TData, TError, TVariables> &
    UseLoadingOvertimeReturnType;
};
