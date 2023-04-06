import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";

import { ActionTypes } from "@contexts/undoableQueue";
import {
    BaseRecord,
    BaseKey,
    UpdateResponse,
    MutationMode,
    PrevContext as UpdateContext,
    HttpError,
    SuccessErrorNotification,
    MetaQuery,
    PreviousQuery,
    GetListResponse,
    IQueryKeys,
} from "../../interfaces";
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
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions/helpers";

export type UpdateParams<TData, TError, TVariables> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * id for mutation function
     */
    id: BaseKey;
    /**
     * [Determines when mutations are executed](/advanced-tutorials/mutation-mode.md)
     */
    mutationMode?: MutationMode;
    /**
     * Duration to wait before executing the mutation when `mutationMode = "undoable"`
     */
    undoableTimeout?: number;
    /**
     * Callback that runs when undo button is clicked on `mutationMode = "undoable"`
     */
    onCancel?: (cancelMutation: () => void) => void;
    /**
     * Values for mutation function
     */
    values: TVariables;
    /**
     * Metadata query for dataProvider
     */
    meta?: MetaQuery;
    /**
     * Metadata query for dataProvider
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
} & SuccessErrorNotification<
    UpdateResponse<TData>,
    TError,
    { id: BaseKey; values: TVariables }
>;

export type UseUpdateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    UpdateResponse<TData>,
    TError,
    UpdateParams<TData, TError, TVariables>,
    UpdateContext<TData>
>;

export type UseUpdateProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            UpdateResponse<TData>,
            TError,
            UpdateParams<TData, TError, TVariables>,
            UpdateContext<TData>
        >,
        "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
    >;
};

/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationOptions,
}: UseUpdateProps<TData, TError, TVariables> = {}): UseUpdateReturnType<
    TData,
    TError,
    TVariables
> => {
    const { resources } = useResource();
    const queryClient = useQueryClient();
    const dataProvider = useDataProvider();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const translate = useTranslate();
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const publish = usePublish();
    const { log } = useLog();
    const { notificationDispatch } = useCancelNotification();
    const handleNotification = useHandleNotification();
    const invalidateStore = useInvalidate();

    const mutation = useMutation<
        UpdateResponse<TData>,
        TError,
        UpdateParams<TData, TError, TVariables>,
        UpdateContext<TData>
    >(
        ({
            id,
            values,
            resource,
            mutationMode,
            undoableTimeout,
            onCancel,
            meta,
            metaData,
            dataProviderName,
        }) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(
                    pickDataProvider(resource, dataProviderName, resources),
                ).update<TData, TVariables>({
                    resource,
                    id,
                    variables: values,
                    meta: pickNotDeprecated(meta, metaData),
                    metaData: pickNotDeprecated(meta, metaData),
                });
            }
            const updatePromise = new Promise<UpdateResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(
                            pickDataProvider(
                                resource,
                                dataProviderName,
                                resources,
                            ),
                        )
                            .update<TData, TVariables>({
                                resource,
                                id,
                                variables: values,
                                meta: pickNotDeprecated(meta, metaData),
                                metaData: pickNotDeprecated(meta, metaData),
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
                            id: id,
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
                resource,
                id,
                mutationMode,
                values,
                dataProviderName,
            }) => {
                const queryKey = queryKeys(
                    resource,
                    pickDataProvider(resource, dataProviderName, resources),
                );

                const previousQueries: PreviousQuery<TData>[] =
                    queryClient.getQueriesData(queryKey.resourceAll);

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                await queryClient.cancelQueries(
                    queryKey.resourceAll,
                    undefined,
                    {
                        silent: true,
                    },
                );

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }
                            const data = previous.data.map((record: TData) => {
                                if (record.id?.toString() === id?.toString()) {
                                    return {
                                        id,
                                        ...record,
                                        ...values,
                                    } as unknown as TData;
                                }
                                return record;
                            });

                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.many(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record: TData) => {
                                if (record.id?.toString() === id?.toString()) {
                                    record = {
                                        id,
                                        ...record,
                                        ...values,
                                    } as unknown as TData;
                                }
                                return record;
                            });
                            return {
                                ...previous,
                                data,
                            };
                        },
                    );

                    queryClient.setQueriesData(
                        queryKey.detail(id),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            return {
                                ...previous,
                                data: {
                                    ...previous.data,
                                    ...values,
                                },
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
                    invalidates = ["list", "many", "detail"],
                },
            ) => {
                invalidateStore({
                    resource,
                    dataProviderName: pickDataProvider(
                        resource,
                        dataProviderName,
                        resources,
                    ),
                    invalidates,
                    id,
                });

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id, resource },
                });
            },
            onSuccess: (
                data,
                {
                    id,
                    resource,
                    successNotification,
                    dataProviderName,
                    values,
                    meta,
                    metaData,
                },
                context,
            ) => {
                const resourceSingular = pluralize.singular(resource);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, { id, values }, resource)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${id}-${resource}-notification`,
                    description: translate(
                        "notifications.success",
                        "Successful",
                    ),
                    message: translate(
                        "notifications.editSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully updated ${resourceSingular}`,
                    ),
                    type: "success",
                });

                publish?.({
                    channel: `resources/${resource}`,
                    type: "updated",
                    payload: {
                        ids: data.data?.id ? [data.data.id] : undefined,
                    },
                    date: new Date(),
                });

                let previousData: any;
                if (context) {
                    const queryData = queryClient.getQueryData<
                        UpdateResponse<TData>
                    >(context.queryKey.detail(id));

                    previousData = Object.keys(values || {}).reduce<any>(
                        (acc, item) => {
                            acc[item] = queryData?.data?.[item];
                            return acc;
                        },
                        {},
                    );
                }

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "update",
                    resource,
                    data: values,
                    previousData,
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
            },
            onError: (
                err: TError,
                { id, resource, errorNotification, values },
                context,
            ) => {
                // set back the queries to the context:

                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError?.(err);

                    const resourceSingular = pluralize.singular(resource);

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(err, { id, values }, resource)
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${id}-${resource}-notification`,
                        message: translate(
                            "notifications.editError",
                            {
                                resource: translate(
                                    `${resource}.${resource}`,
                                    resourceSingular,
                                ),
                                statusCode: err.statusCode,
                            },
                            `Error when updating ${resourceSingular} (status code: ${err.statusCode})`,
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
