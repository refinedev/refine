import {
    useQueryClient,
    useMutation,
    UseMutationResult,
    UseMutationOptions,
} from "@tanstack/react-query";
import pluralize from "pluralize";

import {
    DeleteManyResponse,
    HttpError,
    BaseRecord,
    BaseKey,
    MutationMode,
    PreviousQuery,
    GetListResponse,
    PrevContext as DeleteContext,
    SuccessErrorNotification,
    MetaQuery,
    IQueryKeys,
} from "../../interfaces";
import {
    useResource,
    useTranslate,
    useMutationMode,
    useCancelNotification,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useInvalidate,
    useLog,
    useOnError,
} from "@hooks";
import { ActionTypes } from "@contexts/undoableQueue";
import {
    queryKeys,
    pickDataProvider,
    handleMultiple,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions";

export type DeleteManyParams<TData, TError, TVariables> = {
    ids: BaseKey[];
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
} & SuccessErrorNotification<DeleteManyResponse<TData>, TError, BaseKey[]>;

export type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {},
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams<TData, TError, TVariables>,
    unknown
>;

export type UseDeleteManyProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            DeleteManyResponse<TData>,
            TError,
            DeleteManyParams<TData, TError, TVariables>,
            DeleteContext<TData>
        >,
        "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
    >;
};

/**
 * `useDeleteMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple delete mutations.
 *
 * It uses `deleteMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useDeleteMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 */
export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationOptions,
}: UseDeleteManyProps<TData, TError, TVariables> = {}): UseDeleteManyReturnType<
    TData,
    TError,
    TVariables
> => {
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const dataProvider = useDataProvider();

    const { notificationDispatch } = useCancelNotification();
    const translate = useTranslate();
    const publish = usePublish();
    const handleNotification = useHandleNotification();
    const invalidateStore = useInvalidate();
    const { log } = useLog();

    const { resources } = useResource();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteManyParams<TData, TError, TVariables>,
        DeleteContext<TData>
    >(
        ({
            resource,
            ids,
            mutationMode,
            undoableTimeout,
            onCancel,
            meta,
            metaData,
            dataProviderName,
            values,
        }: DeleteManyParams<TData, TError, TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            const selectedDataProvider = dataProvider(
                pickDataProvider(resource, dataProviderName, resources),
            );

            const mutationFn = () => {
                if (selectedDataProvider.deleteMany) {
                    return selectedDataProvider.deleteMany<TData, TVariables>({
                        resource,
                        ids,
                        meta: pickNotDeprecated(meta, metaData),
                        metaData: pickNotDeprecated(meta, metaData),
                        variables: values,
                    });
                } else {
                    return handleMultiple(
                        ids.map((id) =>
                            selectedDataProvider.deleteOne<TData, TVariables>({
                                resource,
                                id,
                                meta: pickNotDeprecated(meta, metaData),
                                metaData: pickNotDeprecated(meta, metaData),
                                variables: values,
                            }),
                        ),
                    );
                }
            };

            if (!(mutationModePropOrContext === "undoable")) {
                return mutationFn();
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        mutationFn()
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
                            id: ids,
                            resource: resource,
                            cancelMutation: cancelMutation,
                            doMutation: doMutation,
                            seconds: undoableTimeoutPropOrContext,
                            isSilent: !!onCancel,
                        },
                    });
                },
            );
            return updatePromise;
        },
        {
            onMutate: async ({
                ids,
                resource,
                mutationMode,
                dataProviderName,
            }) => {
                const queryKey = queryKeys(
                    resource,
                    pickDataProvider(resource, dataProviderName, resources),
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
                                (item) =>
                                    item.id &&
                                    !ids
                                        .map(String)
                                        .includes(item.id.toString()),
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
                                    if (record.id) {
                                        return !ids
                                            .map(String)
                                            .includes(record.id.toString());
                                    }
                                    return false;
                                },
                            );

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    for (const id of ids) {
                        queryClient.setQueriesData(
                            queryKey.detail(id),
                            (previous?: any | null) => {
                                if (!previous || previous.data.id == id) {
                                    return null;
                                }
                                return {
                                    ...previous,
                                };
                            },
                        );
                    }
                }

                return {
                    previousQueries,
                    queryKey,
                };
            },
            // Always refetch after error or success:
            onSettled: (
                _data,
                _error,
                {
                    resource,
                    ids,
                    dataProviderName,
                    invalidates = ["list", "many"],
                },
            ) => {
                // invalidate the cache for the list and many queries:
                invalidateStore({
                    resource,
                    dataProviderName: pickDataProvider(
                        resource,
                        dataProviderName,
                        resources,
                    ),
                    invalidates,
                });

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id: ids, resource },
                });
            },
            onSuccess: (
                _data,
                {
                    ids,
                    resource,
                    meta,
                    metaData,
                    dataProviderName,
                    successNotification,
                },
                context,
            ) => {
                // Remove the queries from the cache:
                ids.forEach((id) =>
                    queryClient.removeQueries(context?.queryKey.detail(id)),
                );

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(_data, ids, resource)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${ids}-${resource}-notification`,
                    description: translate("notifications.success", "Success"),
                    message: translate(
                        "notifications.deleteSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
                            ),
                        },
                        `Successfully deleted ${resource}`,
                    ),
                    type: "success",
                });

                publish?.({
                    channel: `resources/${resource}`,
                    type: "deleted",
                    payload: { ids },
                    date: new Date(),
                });

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "deleteMany",
                    resource,
                    meta: {
                        ids,
                        dataProviderName: pickDataProvider(
                            resource,
                            dataProviderName,
                            resources,
                        ),
                        ...rest,
                    },
                });

                // Remove the queries from the cache:
                ids.forEach((id) =>
                    queryClient.removeQueries(context?.queryKey.detail(id)),
                );
            },
            onError: (err, { ids, resource, errorNotification }, context) => {
                // set back the queries to the context:
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError(err);
                    const resourceSingular = pluralize.singular(resource);

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(err, ids, resource)
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${ids}-${resource}-notification`,
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
