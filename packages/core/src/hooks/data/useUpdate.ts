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
    useRefineContext,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions/helpers";
import {
    useLoadingOvertime,
    UseLoadingOvertimeOptionsProps,
    UseLoadingOvertimeReturnType,
} from "../useLoadingOvertime";

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
> &
    UseLoadingOvertimeReturnType;

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
} & UseLoadingOvertimeOptionsProps;

/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences/#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    mutationOptions,
    overtimeOptions,
}: UseUpdateProps<TData, TError, TVariables> = {}): UseUpdateReturnType<
    TData,
    TError,
    TVariables
> => {
    const { resources, select } = useResource();
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
    const getMeta = useMeta();
    const {
        options: { textTransformers },
    } = useRefineContext();

    const mutation = useMutation<
        UpdateResponse<TData>,
        TError,
        UpdateParams<TData, TError, TVariables>,
        UpdateContext<TData>
    >(
        ({
            id,
            values,
            resource: resourceName,
            mutationMode,
            undoableTimeout,
            onCancel,
            meta,
            metaData,
            dataProviderName,
        }) => {
            const { resource, identifier } = select(resourceName);

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
                    pickDataProvider(identifier, dataProviderName, resources),
                ).update<TData, TVariables>({
                    resource: resource.name,
                    id,
                    variables: values,
                    meta: combinedMeta,
                    metaData: combinedMeta,
                });
            }
            const updatePromise = new Promise<UpdateResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(
                            pickDataProvider(
                                identifier,
                                dataProviderName,
                                resources,
                            ),
                        )
                            .update<TData, TVariables>({
                                resource: resource.name,
                                id,
                                variables: values,
                                meta: combinedMeta,
                                metaData: combinedMeta,
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
                            resource: identifier,
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
                resource: resourceName,
                id,
                mutationMode,
                values,
                dataProviderName,
                meta,
                metaData,
            }) => {
                const { identifier } = select(resourceName);

                const preferredMeta = pickNotDeprecated(meta, metaData);

                const queryKey = queryKeys(
                    identifier,
                    pickDataProvider(identifier, dataProviderName, resources),
                    preferredMeta,
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
                    resource: resourceName,
                    dataProviderName,
                    invalidates = ["list", "many", "detail"],
                },
            ) => {
                const { identifier } = select(resourceName);

                invalidateStore({
                    resource: identifier,
                    dataProviderName: pickDataProvider(
                        identifier,
                        dataProviderName,
                        resources,
                    ),
                    invalidates,
                    id,
                });

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id, resource: identifier },
                });
            },
            onSuccess: (
                data,
                {
                    id,
                    resource: resourceName,
                    successNotification,
                    dataProviderName,
                    values,
                    meta,
                    metaData,
                },
                context,
            ) => {
                const { resource, identifier } = select(resourceName);

                const resourceSingular = textTransformers.singular(identifier);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, { id, values }, identifier)
                        : successNotification;

                handleNotification(notificationConfig, {
                    key: `${id}-${identifier}-notification`,
                    description: translate(
                        "notifications.success",
                        "Successful",
                    ),
                    message: translate(
                        "notifications.editSuccess",
                        {
                            resource: translate(
                                `${identifier}.${identifier}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully updated ${resourceSingular}`,
                    ),
                    type: "success",
                });

                publish?.({
                    channel: `resources/${resource.name}`,
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
                    resource: resource.name,
                    data: values,
                    previousData,
                    meta: {
                        id,
                        dataProviderName: pickDataProvider(
                            identifier,
                            dataProviderName,
                            resources,
                        ),
                        ...rest,
                    },
                });
            },
            onError: (
                err: TError,
                { id, resource: resourceName, errorNotification, values },
                context,
            ) => {
                const { identifier } = select(resourceName);

                // set back the queries to the context:
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query[0], query[1]);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError?.(err);

                    const resourceSingular =
                        textTransformers.singular(identifier);

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(err, { id, values }, identifier)
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${id}-${identifier}-notification`,
                        message: translate(
                            "notifications.editError",
                            {
                                resource: translate(
                                    `${identifier}.${identifier}`,
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

    const { elapsedTime } = useLoadingOvertime({
        isLoading: mutation.isLoading,
        interval: overtimeOptions?.interval,
        onInterval: overtimeOptions?.onInterval,
    });

    return { ...mutation, overtime: { elapsedTime } };
};
