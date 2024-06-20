import {
  pickDataProvider,
  pickNotDeprecated,
  useActiveAuthProvider,
} from "@definitions/helpers";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

import {
  useDataProvider,
  useHandleNotification,
  useInvalidate,
  useKeys,
  useLog,
  useMeta,
  useOnError,
  usePublish,
  useRefineContext,
  useResource,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CreateResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type UseCreateParams<TData, TError, TVariables> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * Values for mutation function
   */
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
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   * You can use it to manage the invalidations that will occur at the end of the mutation.
   */
  invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<CreateResponse<TData>, TError, TVariables>;

export type UseCreateReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = UseMutationResult<
  CreateResponse<TData>,
  TError,
  UseCreateParams<TData, TError, TVariables>,
  unknown
>;

export type UseCreateProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: Omit<
    UseMutationOptions<
      CreateResponse<TData>,
      TError,
      UseCreateParams<TData, TError, TVariables>,
      unknown
    >,
    "mutationFn" | "onError" | "onSuccess"
  >;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useCreate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */

export const useCreate = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseCreateProps<TData, TError, TVariables> = {}): UseCreateReturnType<
  TData,
  TError,
  TVariables
> &
  UseLoadingOvertimeReturnType => {
  const authProvider = useActiveAuthProvider();
  const { mutate: checkError } = useOnError({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const dataProvider = useDataProvider();
  const invalidateStore = useInvalidate();
  const { resources, select } = useResource();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys, preferLegacyKeys } = useKeys();

  const mutation = useMutation<
    CreateResponse<TData>,
    TError,
    UseCreateParams<TData, TError, TVariables>,
    unknown
  >({
    mutationFn: ({
      resource: resourceName,
      values,
      meta,
      metaData,
      dataProviderName,
    }: UseCreateParams<TData, TError, TVariables>) => {
      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta: pickNotDeprecated(meta, metaData),
      });

      return dataProvider(
        pickDataProvider(identifier, dataProviderName, resources),
      ).create<TData, TVariables>({
        resource: resource.name,
        variables: values,
        meta: combinedMeta,
        metaData: combinedMeta,
      });
    },
    onSuccess: (
      data,
      {
        resource: resourceName,
        successNotification: successNotificationFromProp,
        dataProviderName: dataProviderNameFromProp,
        invalidates = ["list", "many"],
        values,
        meta,
        metaData,
      },
    ) => {
      const { resource, identifier } = select(resourceName);
      const resourceSingular = textTransformers.singular(identifier);

      const dataProviderName = pickDataProvider(
        identifier,
        dataProviderNameFromProp,
        resources,
      );

      const combinedMeta = getMeta({
        resource,
        meta: pickNotDeprecated(meta, metaData),
      });

      const notificationConfig =
        typeof successNotificationFromProp === "function"
          ? successNotificationFromProp(data, values, identifier)
          : successNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `create-${identifier}-notification`,
        message: translate(
          "notifications.createSuccess",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
          },
          `Successfully created ${resourceSingular}`,
        ),
        description: translate("notifications.success", "Success"),
        type: "success",
      });

      invalidateStore({
        resource: identifier,
        dataProviderName,
        invalidates,
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "created",
        payload: {
          ids: data?.data?.id ? [data.data.id] : undefined,
        },
        date: new Date(),
        meta: {
          ...combinedMeta,
          dataProviderName,
        },
      });

      const {
        fields: _fields,
        operation: _operation,
        variables: _variables,
        ...rest
      } = combinedMeta || {};
      log?.mutate({
        action: "create",
        resource: resource.name,
        data: values,
        meta: {
          dataProviderName,
          id: data?.data?.id ?? undefined,
          ...rest,
        },
      });
    },
    onError: (
      err: TError,
      {
        resource: resourceName,
        errorNotification: errorNotificationFromProp,
        values,
      },
    ) => {
      checkError(err);

      const { identifier } = select(resourceName);

      const resourceSingular = textTransformers.singular(identifier);

      const notificationConfig =
        typeof errorNotificationFromProp === "function"
          ? errorNotificationFromProp(err, values, identifier)
          : errorNotificationFromProp;

      handleNotification(notificationConfig, {
        key: `create-${identifier}-notification`,
        description: err.message,
        message: translate(
          "notifications.createError",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
            statusCode: err.statusCode,
          },
          `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
        ),
        type: "error",
      });
    },
    mutationKey: keys().data().mutation("create").get(preferLegacyKeys),
    ...mutationOptions,
    meta: {
      ...mutationOptions?.meta,
      ...getXRay("useCreate", preferLegacyKeys),
    },
  });

  const { elapsedTime } = useLoadingOvertime({
    isLoading: mutation.isLoading,
    interval: overtimeOptions?.interval,
    onInterval: overtimeOptions?.onInterval,
  });

  return { ...mutation, overtime: { elapsedTime } };
};
