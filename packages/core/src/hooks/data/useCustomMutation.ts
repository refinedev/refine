import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import { pickNotDeprecated, useActiveAuthProvider } from "@definitions/helpers";
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
>;

export type UseCustomMutationProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      CreateResponse<TData>,
      TError,
      useCustomMutationParams<TData, TError, TVariables>,
      unknown
    >,
    "mutationFn" | "onError" | "onSuccess"
  >;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useCustomMutation` is a modified version of `react-query`'s {@link https://tanstack.com/query/v4/docs/framework/react/reference/useMutation `useMutation`} for create mutations.
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
  const authProvider = useActiveAuthProvider();
  const { mutate: checkError } = useOnError({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const handleNotification = useHandleNotification();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const getMeta = useMeta();
  const { keys, preferLegacyKeys } = useKeys();

  const mutation = useMutation<
    CreateResponse<TData>,
    TError,
    useCustomMutationParams<TData, TError, TVariables>,
    unknown
  >(
    ({
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
    {
      onSuccess: (
        data,
        {
          successNotification: successNotificationFromProp,
          config,
          meta,
          metaData,
        },
      ) => {
        const notificationConfig =
          typeof successNotificationFromProp === "function"
            ? successNotificationFromProp(data, {
                ...config,
                ...(pickNotDeprecated(meta, metaData) || {}),
              })
            : successNotificationFromProp;

        handleNotification(notificationConfig);
      },
      onError: (
        err: TError,
        {
          errorNotification: errorNotificationFromProp,
          method,
          config,
          meta,
          metaData,
        },
      ) => {
        checkError(err);

        const notificationConfig =
          typeof errorNotificationFromProp === "function"
            ? errorNotificationFromProp(err, {
                ...config,
                ...(pickNotDeprecated(meta, metaData) || {}),
              })
            : errorNotificationFromProp;

        handleNotification(notificationConfig, {
          key: `${method}-notification`,
          message: translate(
            "notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`,
          ),
          description: err.message,
          type: "error",
        });
      },
      mutationKey: keys()
        .data()
        .mutation("customMutation")
        .get(preferLegacyKeys),
      ...mutationOptions,
      meta: {
        ...mutationOptions?.meta,
        ...getXRay("useCustomMutation", preferLegacyKeys),
      },
    },
  );

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isLoading,
  });

  return { ...mutation, overtime: { elapsedTime } };
};
