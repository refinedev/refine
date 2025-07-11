import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  pickDataProvider,
  pickNotDeprecated,
  queryKeysReplacement,
} from "@definitions/helpers";
import {
  useCancelNotification,
  useDataProvider,
  useHandleNotification,
  useInvalidate,
  useKeys,
  useLog,
  useMeta,
  useMutationMode,
  useOnError,
  usePublish,
  useRefineContext,
  useResource,
  useTranslate,
} from "@hooks";

import type {
  BaseKey,
  BaseRecord,
  DeleteOneResponse,
  GetListResponse,
  HttpError,
  IQueryKeys,
  MetaQuery,
  MutationMode,
  PrevContext as DeleteContext,
  PreviousQuery,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import { ActionTypes } from "../../contexts/undoableQueue/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type DeleteParams<TData, TError, TVariables> = {
  /**
   * id for mutation function
   */
  id: BaseKey;
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * [Determines when mutations are executed](/docs/advanced-tutorials/mutation-mode/)
   */
  mutationMode?: MutationMode;
  /**
   * Duration in ms to wait before executing the mutation when `mutationMode = "undoable"`
   */
  undoableTimeout?: number;
  /**
   * Provides a function to cancel the mutation when `mutationMode = "undoable"`
   */
  onCancel?: (cancelMutation: () => void) => void;
  /**
   * Metadata query for dataProvider
   */
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default "default"
   */
  dataProviderName?: string;
  /**
   *  You can use it to manage the invalidations that will occur at the end of the mutation.
   */
  invalidates?: Array<keyof IQueryKeys>;
  /**
   * Values for mutation function
   */
  values?: TVariables;
} & SuccessErrorNotification<DeleteOneResponse<TData>, TError, BaseKey>;

export type UseDeleteReturnType<
  TData extends BaseRecord = BaseRecord,
  TError = HttpError,
  TVariables = {},
> = UseMutationResult<
  DeleteOneResponse<TData>,
  TError,
  DeleteParams<TData, TError, TVariables>,
  DeleteContext<TData>
> &
  UseLoadingOvertimeReturnType & {
    isLoading: boolean;
  };

// Custom type to extend UseMutationOptions with v4 callbacks for backward compatibility
export type UseDeleteMutationOptions<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = Omit<
  UseMutationOptions<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >,
  "mutationFn"
> & {
  // Add v4 callbacks for backward compatibility
  onSuccess?: (
    data: DeleteOneResponse<TData>,
    variables: DeleteParams<TData, TError, TVariables>,
    context: DeleteContext<TData>,
  ) => void;
  onError?: (
    error: TError,
    variables: DeleteParams<TData, TError, TVariables>,
    context: DeleteContext<TData>,
  ) => void;
  onSettled?: (
    data: DeleteOneResponse<TData> | undefined,
    error: TError | null,
    variables: DeleteParams<TData, TError, TVariables>,
    context: DeleteContext<TData>,
  ) => void;
};

export type UseDeleteProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  mutationOptions?: UseDeleteMutationOptions<TData, TError, TVariables>;
} & UseLoadingOvertimeOptionsProps;

/**
 * `useDelete` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for delete mutations.
 *
 * It uses `deleteOne` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useDelete} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDelete = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
>({
  mutationOptions,
  overtimeOptions,
}: UseDeleteProps<TData, TError, TVariables> = {}): UseDeleteReturnType<
  TData,
  TError,
  TVariables
> => {
  const { mutate: checkError } = useOnError();
  const dataProvider = useDataProvider();

  const { resources, select } = useResource();
  const queryClient = useQueryClient();

  const {
    mutationMode: mutationModeContext,
    undoableTimeout: undoableTimeoutContext,
  } = useMutationMode();

  const { notificationDispatch } = useCancelNotification();
  const translate = useTranslate();
  const publish = usePublish();
  const { log } = useLog();
  const handleNotification = useHandleNotification();
  const invalidateStore = useInvalidate();
  const getMeta = useMeta();
  const {
    options: { textTransformers },
  } = useRefineContext();
  const { keys } = useKeys();

  // Clean mutationOptions - remove v4 callbacks that don't exist in v5
  const { onSuccess, onError, onSettled, ...cleanMutationOptions } =
    mutationOptions || {};

  const mutation = useMutation<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams<TData, TError, TVariables>,
    DeleteContext<TData>
  >({
    mutationKey: keys().data().mutation("delete").get(),
    mutationFn: ({
      id,
      mutationMode,
      undoableTimeout,
      resource: resourceName,
      onCancel,
      meta,
      metaData,
      dataProviderName,
      values,
    }) => {
      const { resource, identifier } = select(resourceName);

      const combinedMeta = getMeta({
        resource,
        meta: pickNotDeprecated(meta, metaData),
      });

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      const undoableTimeoutPropOrContext =
        undoableTimeout ?? undoableTimeoutContext;

      if (!(mutationModePropOrContext === "undoable")) {
        return dataProvider(
          pickDataProvider(identifier, dataProviderName, resources),
        ).deleteOne<TData, TVariables>({
          resource: resource.name,
          id,
          meta: combinedMeta,
          metaData: combinedMeta,
          variables: values,
        });
      }

      const deletePromise = new Promise<DeleteOneResponse<TData>>(
        (resolve, reject) => {
          const doMutation = () => {
            dataProvider(
              pickDataProvider(identifier, dataProviderName, resources),
            )
              .deleteOne<TData, TVariables>({
                resource: resource.name,
                id,
                meta: combinedMeta,
                metaData: combinedMeta,
                variables: values,
              })
              .then((result) => resolve(result))
              .catch((err) => reject(err));
          };

          const cancelMutation = () => {
            reject({ message: "mutationCancelled" });
          };

          if (onCancel) {
            onCancel(cancelMutation);
          }

          notificationDispatch({
            type: ActionTypes.ADD,
            payload: {
              id,
              resource: identifier,
              cancelMutation: cancelMutation,
              doMutation: doMutation,
              seconds: undoableTimeoutPropOrContext,
              isSilent: !!onCancel,
            },
          });
        },
      );
      return deletePromise;
    },
    onMutate: async ({
      id,
      resource: resourceName,
      mutationMode,
      dataProviderName,
      meta,
      metaData,
    }) => {
      const { identifier } = select(resourceName);

      const {
        gqlMutation: _,
        gqlQuery: __,
        ...preferredMeta
      } = pickNotDeprecated(meta, metaData) ?? {};

      const queryKey = queryKeysReplacement()(
        identifier,
        pickDataProvider(identifier, dataProviderName, resources),
        preferredMeta,
      );

      const resourceKeys = keys()
        .data(pickDataProvider(identifier, dataProviderName, resources))
        .resource(identifier);

      const mutationModePropOrContext = mutationMode ?? mutationModeContext;

      await queryClient.cancelQueries({
        queryKey: resourceKeys.get(),
      });

      const previousQueries: PreviousQuery<TData>[] =
        queryClient.getQueriesData({
          queryKey: resourceKeys.get(),
        });

      if (mutationModePropOrContext !== "pessimistic") {
        // Set the previous queries to the new ones:
        queryClient.setQueriesData(
          {
            queryKey: resourceKeys
              .action("list")
              .params(preferredMeta ?? {})
              .get(),
          },
          (previous?: GetListResponse<TData> | null) => {
            if (!previous) {
              return null;
            }
            const data = previous.data.filter(
              (record: TData) => record.id?.toString() !== id.toString(),
            );

            return {
              data,
              total: previous.total - 1,
            };
          },
        );

        queryClient.setQueriesData(
          {
            queryKey: resourceKeys.action("many").get(),
          },
          (previous?: GetListResponse<TData> | null) => {
            if (!previous) {
              return null;
            }
            const data = previous.data.filter((record: TData) => {
              return record.id?.toString() !== id?.toString();
            });

            return {
              ...previous,
              data,
            };
          },
        );
      }

      return {
        previousQueries,
        queryKey,
      };
    },
    // onSuccess and onError removed for v5 compatibility
    // onSettled callback kept as it's used for cleanup
    onSettled: (
      _data,
      _error,
      {
        id,
        resource: resourceName,
        dataProviderName,
        invalidates = ["list", "many"],
      },
    ) => {
      const { identifier } = select(resourceName);

      // invalidate the cache for the list and many queries:
      invalidateStore({
        resource: identifier,
        dataProviderName: pickDataProvider(
          identifier,
          dataProviderName,
          resources,
        ),
        invalidates,
      });

      notificationDispatch({
        type: ActionTypes.REMOVE,
        payload: { id, resource: identifier },
      });

      // Also call user's onSettled if provided
      onSettled?.(
        _data,
        _error,
        {
          id,
          resource: resourceName,
          dataProviderName,
          invalidates,
        } as DeleteParams<TData, TError, TVariables>,
        {} as DeleteContext<TData>,
      );
    },
    // onSuccess and onError removed for v5 compatibility
    ...cleanMutationOptions,
    meta: {
      ...cleanMutationOptions?.meta,
      ...getXRay("useDelete"),
    },
  });

  // Handle success with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isSuccess && mutation.data && mutation.variables) {
      const _data = mutation.data;
      const variables = mutation.variables;
      const context = {} as DeleteContext<TData>;

      const {
        id,
        resource: resourceName,
        successNotification,
        dataProviderName: dataProviderNameFromProp,
        meta,
        metaData,
      } = variables;

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

      // Remove the queries from the cache:
      queryClient.removeQueries({
        queryKey: context?.queryKey?.detail(id),
      });

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(_data, id, identifier)
          : successNotification;

      handleNotification(notificationConfig, {
        key: `${id}-${identifier}-notification`,
        description: translate("notifications.success", "Success"),
        message: translate(
          "notifications.deleteSuccess",
          {
            resource: translate(
              `${identifier}.${identifier}`,
              resourceSingular,
            ),
          },
          `Successfully deleted a ${resourceSingular}`,
        ),
        type: "success",
      });

      publish?.({
        channel: `resources/${resource.name}`,
        type: "deleted",
        payload: {
          ids: [id],
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
        action: "delete",
        resource: resource.name,
        meta: {
          id,
          dataProviderName,
          ...rest,
        },
      });

      // Remove the queries from the cache:
      queryClient.removeQueries({
        queryKey: context?.queryKey?.detail(id),
      });

      // Also call user's onSuccess if provided
      onSuccess?.(_data, variables, context);
    }
  }, [mutation.isSuccess, mutation.data, mutation.variables, onSuccess]);

  // Handle error with useEffect for v5 compatibility
  useEffect(() => {
    if (mutation.isError && mutation.error && mutation.variables) {
      const err = mutation.error;
      const variables = mutation.variables;
      const context = {} as DeleteContext<TData>;

      const { id, resource: resourceName, errorNotification } = variables;

      const { identifier } = select(resourceName);

      // set back the queries to the context:
      if (context) {
        for (const query of context.previousQueries) {
          queryClient.setQueryData(query[0], query[1]);
        }
      }

      if (err.message !== "mutationCancelled") {
        checkError(err);

        const resourceSingular = textTransformers.singular(identifier);

        const notificationConfig =
          typeof errorNotification === "function"
            ? errorNotification(err, id, identifier)
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${id}-${identifier}-notification`,
          message: translate(
            "notifications.deleteError",
            {
              resource: resourceSingular,
              statusCode: err.statusCode,
            },
            `Error (status code: ${err.statusCode})`,
          ),
          description: err.message,
          type: "error",
        });
      }

      // Also call user's onError if provided
      onError?.(err, variables, context);
    }
  }, [mutation.isError, mutation.error, mutation.variables, onError]);

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: mutation.isPending, // v5 uses isPending instead of isLoading
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    overtime: { elapsedTime },
  };
};
