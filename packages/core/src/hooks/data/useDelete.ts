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
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useDelete} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
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

    const { resources } = useResource();
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
            resource,
            onCancel,
            meta,
            metaData,
            dataProviderName,
            values,
        }) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(
                    pickDataProvider(resource, dataProviderName, resources),
                ).deleteOne<TData, TVariables>({
                    resource,
                    id,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                    variables: values,
                });
            }

            const deletePromise = new Promise<DeleteOneResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(
                            pickDataProvider(
                                resource,
                                dataProviderName,
                                resources,
                            ),
                        )
                            .deleteOne<TData, TVariables>({
                                resource,
                                id,
                                meta: pickNotDeprecated(meta, metaData),
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
                            resource: resource,
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
                    resource,
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
                    payload: { id, resource },
                });
            },
            onSuccess: (
                _data,
                {
                    id,
                    resource,
                    successNotification,
                    dataProviderName,
                    meta,
                    metaData,
                },
                context,
            ) => {
                const resourceSingular = pluralize.singular(resource ?? "");

                // Remove the queries from the cache:
                queryClient.removeQueries(context?.queryKey.detail(id));

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(_data, id, resource)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${id}-${resource}-notification`,
                    description: translate("notifications.success", "Success"),
                    message: translate(
                        "notifications.deleteSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully deleted a ${resourceSingular}`,
                    ),
                    type: "success",
                });

                publish?.({
                    channel: `resources/${resource}`,
                    type: "deleted",
                    payload: {
                        ids: id ? [id] : [],
                    },
                    date: new Date(),
                });

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "delete",
                    resource,
                    meta: {
                        id,
                        dataProviderName: pickDataProvider(
                            resource,
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
                { id, resource, errorNotification },
                context,
            ) => {
                // set back the queries to the context:
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError(err);

                    const resourceSingular = pluralize.singular(resource ?? "");

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(err, id, resource)
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${id}-${resource}-notification`,
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
