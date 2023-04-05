import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import pluralize from "pluralize";

import {
    useResource,
    useCancelNotification,
    useMutationMode,
    useTranslate,
    usePublish,
    useHandleNotification,
    useDataProvider,
    useInvalidate,
    useLog,
    useOnError,
} from "@hooks";
import { ActionTypes } from "@contexts/undoableQueue";
import {
    BaseRecord,
    BaseKey,
    UpdateManyResponse,
    HttpError,
    MutationMode,
    QueryResponse,
    PrevContext as UpdateContext,
    SuccessErrorNotification,
    MetaQuery,
    GetListResponse,
    IQueryKeys,
} from "../../interfaces";
import {
    queryKeys,
    pickDataProvider,
    handleMultiple,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions/helpers";

type UpdateManyParams<TData, TError, TVariables> = {
    ids: BaseKey[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    /**
     * meta data for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     * meta data for `dataProvider`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    dataProviderName?: string;
    invalidates?: Array<keyof IQueryKeys>;
} & SuccessErrorNotification<
    UpdateManyResponse<TData>,
    TError,
    { ids: BaseKey[]; values: TVariables }
>;

type UseUpdateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    UpdateManyResponse<TData>,
    TError,
    UpdateManyParams<TData, TError, TVariables>,
    UpdateContext<TData>
>;

export type UseUpdateManyProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = {
    mutationOptions?: Omit<
        UseMutationOptions<
            UpdateManyResponse<TData>,
            TError,
            UpdateManyParams<TData, TError, TVariables>,
            UpdateContext<TData>
        >,
        "mutationFn" | "onError" | "onSuccess" | "onSettled" | "onMutate"
    >;
};

/**
 * `useUpdateMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for multiple update mutations.
 *
 * It uses `updateMany` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useUpdateMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationOptions,
}: UseUpdateManyProps<TData, TError, TVariables> = {}): UseUpdateManyReturnType<
    TData,
    TError,
    TVariables
> => {
    const { resources } = useResource();
    const queryClient = useQueryClient();
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const { notificationDispatch } = useCancelNotification();
    const publish = usePublish();
    const handleNotification = useHandleNotification();
    const invalidateStore = useInvalidate();
    const { log } = useLog();

    const mutation = useMutation<
        UpdateManyResponse<TData>,
        TError,
        UpdateManyParams<TData, TError, TVariables>,
        UpdateContext<TData>
    >(
        ({
            ids,
            values,
            resource,
            onCancel,
            mutationMode,
            undoableTimeout,
            meta,
            metaData,
            dataProviderName,
        }: UpdateManyParams<TData, TError, TVariables>) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            const selectedDataProvider = dataProvider(
                pickDataProvider(resource, dataProviderName, resources),
            );

            const mutationFn = () => {
                if (selectedDataProvider.updateMany) {
                    return selectedDataProvider.updateMany<TData, TVariables>({
                        resource,
                        ids,
                        variables: values,
                        meta: pickNotDeprecated(meta, metaData),
                        metaData: pickNotDeprecated(meta, metaData),
                    });
                } else {
                    return handleMultiple(
                        ids.map((id) =>
                            selectedDataProvider.update<TData, TVariables>({
                                resource,
                                id,
                                variables: values,
                                meta: pickNotDeprecated(meta, metaData),
                                metaData: pickNotDeprecated(meta, metaData),
                            }),
                        ),
                    );
                }
            };

            if (!(mutationModePropOrContext === "undoable")) {
                return mutationFn();
            }

            const updatePromise = new Promise<UpdateManyResponse<TData>>(
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
                resource,
                ids,
                values,
                mutationMode,
                dataProviderName,
                meta,
                metaData,
            }) => {
                const queryKey = queryKeys(
                    resource,
                    pickDataProvider(resource, dataProviderName, resources),
                    pickNotDeprecated(meta, metaData),
                    pickNotDeprecated(meta, metaData),
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

                const previousQueries = queryClient.getQueriesData<
                    QueryResponse<TData>
                >(queryKey.resourceAll);

                if (!(mutationModePropOrContext === "pessimistic")) {
                    // Set the previous queries to the new ones:
                    queryClient.setQueriesData(
                        queryKey.list(),
                        (previous?: GetListResponse<TData> | null) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record: TData) => {
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        ...record,
                                        ...values,
                                    };
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
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        ...record,
                                        ...values,
                                    };
                                }
                                return record;
                            });
                            return {
                                ...previous,
                                data,
                            };
                        },
                    );
                    for (const id of ids) {
                        queryClient.setQueriesData(
                            queryKey.detail(id),
                            (previous?: GetListResponse<TData> | null) => {
                                if (!previous) {
                                    return null;
                                }

                                const data = {
                                    ...previous.data,
                                    ...values,
                                };
                                return {
                                    ...previous,
                                    data,
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
            onSettled: (_data, _error, { ids, resource, dataProviderName }) => {
                // invalidate the cache for the list and many queries:
                invalidateStore({
                    resource,
                    invalidates: ["list", "many"],
                    dataProviderName: pickDataProvider(
                        resource,
                        dataProviderName,
                        resources,
                    ),
                });

                ids.forEach((id) =>
                    invalidateStore({
                        resource,
                        invalidates: ["detail"],
                        dataProviderName: pickDataProvider(
                            resource,
                            dataProviderName,
                            resources,
                        ),
                        id,
                    }),
                );

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id: ids, resource },
                });
            },
            onSuccess: (
                data,
                {
                    ids,
                    resource,
                    meta,
                    metaData,
                    dataProviderName,
                    successNotification,
                    values,
                },
                context,
            ) => {
                const resourceSingular = pluralize.singular(resource);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, { ids, values }, resource)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${ids}-${resource}-notification`,
                    description: translate(
                        "notifications.success",
                        "Successful",
                    ),
                    message: translate(
                        "notifications.editSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resource,
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
                        ids: ids.map(String),
                    },
                    date: new Date(),
                });

                const previousData: any[] = [];
                if (context) {
                    ids.forEach((id) => {
                        const queryData = queryClient.getQueryData<
                            UpdateManyResponse<TData>
                        >(context.queryKey.detail(id));

                        previousData.push(
                            Object.keys(values || {}).reduce<any>(
                                (acc, item: any) => {
                                    acc[item] = queryData?.data?.[item];
                                    return acc;
                                },
                                {},
                            ),
                        );
                    });
                }

                const { fields, operation, variables, ...rest } =
                    pickNotDeprecated(meta, metaData) || {};

                log?.mutate({
                    action: "updateMany",
                    resource,
                    data: values,
                    previousData,
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
            },
            onError: (
                err: TError,
                { ids, resource, errorNotification, values },
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
                            ? errorNotification(err, { ids, values }, resource)
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${ids}-${resource}-updateMany-error-notification`,
                        message: translate(
                            "notifications.editError",
                            {
                                resource: resourceSingular,
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
