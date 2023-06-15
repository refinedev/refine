import {
    useQueryClient,
    useMutation,
    UseMutationResult,
    UseMutationOptions,
} from "@tanstack/react-query";
import pluralize from "pluralize";

import {
    useResource,
    useMutationMode,
    useCancelNotification,
    useTranslate,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useLog,
    useInvalidate,
    useOnError,
    useMeta,
    useRouterType,
} from "@hooks";
import { ActionTypes } from "@contexts/undoableQueue";
import {
    DeleteOneResponse,
    MutationMode,
    PrevContext as DeleteContext,
    BaseRecord,
    BaseKey,
    HttpError,
    GetListResponse,
    SuccessErrorNotification,
    PreviousQuery,
    IQueryKeys,
    MetaQuery,
} from "../../interfaces";
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions/helpers";

export type DeleteParams<TData, TError, TVariables> = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    meta?: MetaQuery;
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
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
>;

export type UseDeleteProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            DeleteOneResponse<TData>,
            TError,
            DeleteParams<TData, TError, TVariables>,
            DeleteContext<TData>
        >,
        "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
    >;
};

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
}: UseDeleteProps<TData, TError, TVariables> = {}): UseDeleteReturnType<
    TData,
    TError,
    TVariables
> => {
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
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

    const mutation = useMutation<
        DeleteOneResponse<TData>,
        TError,
        DeleteParams<TData, TError, TVariables>,
        DeleteContext<TData>
    >(
        ({
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
            const resource = select(resourceName);

            const resourceIdentifierOrName =
                resource.identifier ?? resource.name;

            const combinedMeta = getMeta({
                resource,
                meta: pickNotDeprecated(meta, metaData),
            });

            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(
                    pickDataProvider(
                        resourceIdentifierOrName,
                        dataProviderName,
                        resources,
                    ),
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
                            pickDataProvider(
                                resourceIdentifierOrName,
                                dataProviderName,
                                resources,
                            ),
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
                            resource: resourceIdentifierOrName,
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
        {
            onMutate: async ({
                id,
                resource: resourceName,
                mutationMode,
                dataProviderName,
                meta,
                metaData,
            }) => {
                const resource = select(resourceName);

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                const preferredMeta = pickNotDeprecated(meta, metaData);

                const queryKey = queryKeys(
                    resourceIdentifierOrName,
                    pickDataProvider(
                        resourceIdentifierOrName,
                        dataProviderName,
                        resources,
                    ),
                    preferredMeta,
                );

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                await queryClient.cancelQueries(
                    queryKey.resourceAll,
                    undefined,
                    {
                        silent: true,
                    },
                );

                const previousQueries: PreviousQuery<TData>[] =
                    queryClient.getQueriesData(queryKey.resourceAll);

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }
                            const data = previous.data.filter(
                                (record: TData) =>
                                    record.id?.toString() !== id.toString(),
                            );

                            return {
                                data,
                                total: previous.total - 1,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.many(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }
                            const data = previous.data.filter(
                                (record: TData) => {
                                    return (
                                        record.id?.toString() !== id?.toString()
                                    );
                                },
                            );

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
                const resource = select(resourceName);

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                // invalidate the cache for the list and many queries:
                invalidateStore({
                    resource: resourceIdentifierOrName,
                    dataProviderName: pickDataProvider(
                        resourceIdentifierOrName,
                        dataProviderName,
                        resources,
                    ),
                    invalidates,
                });

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id, resource: resourceIdentifierOrName },
                });
            },
            onSuccess: (
                _data,
                {
                    id,
                    resource: resourceName,
                    successNotification,
                    dataProviderName,
                    meta,
                    metaData,
                },
                context,
            ) => {
                const resource = select(resourceName);

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                const resourceSingular = pluralize.singular(
                    resourceIdentifierOrName,
                );

                // Remove the queries from the cache:
                queryClient.removeQueries(context?.queryKey.detail(id));

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(
                              _data,
                              id,
                              resourceIdentifierOrName,
                          )
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${id}-${resourceIdentifierOrName}-notification`,
                    description: translate("notifications.success", "Success"),
                    message: translate(
                        "notifications.deleteSuccess",
                        {
                            resource: translate(
                                `${resourceIdentifierOrName}.${resourceIdentifierOrName}`,
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
                });

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "delete",
                    resource: resource.name,
                    meta: {
                        id,
                        dataProviderName: pickDataProvider(
                            resourceIdentifierOrName,
                            dataProviderName,
                            resources,
                        ),
                        ...rest,
                    },
                });

                // Remove the queries from the cache:
                queryClient.removeQueries(context?.queryKey.detail(id));
            },
            onError: (
                err: TError,
                { id, resource: resourceName, errorNotification },
                context,
            ) => {
                const resource = select(resourceName);

                const resourceIdentifierOrName =
                    resource.identifier ?? resource.name;

                // set back the queries to the context:
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError(err);

                    const resourceSingular = pluralize.singular(
                        resourceIdentifierOrName,
                    );

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(
                                  err,
                                  id,
                                  resourceIdentifierOrName,
                              )
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${id}-${resourceIdentifierOrName}-notification`,
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
            },
            ...mutationOptions,
        },
    );

    return mutation;
};
