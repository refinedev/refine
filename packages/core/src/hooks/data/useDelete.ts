import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import {
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useTranslate,
    useCheckError,
    usePublish,
    useHandleNotification,
    useDataProvider,
} from "@hooks";
import { ActionTypes } from "@contexts/undoableQueue";
import pluralize from "pluralize";
import {
    DeleteOneResponse,
    MutationMode,
    QueryResponse,
    Context as DeleteContext,
    BaseRecord,
    BaseKey,
    ContextQuery,
    HttpError,
    GetListResponse,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";

type DeleteParams = {
    id: BaseKey;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification;

type UseDeleteReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
> = UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    DeleteParams,
    DeleteContext
>;

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
>(): UseDeleteReturnType<TData, TError> => {
    const { mutate: checkError } = useCheckError();
    const dataProvider = useDataProvider();

    const queryClient = useQueryClient();

    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const { notificationDispatch } = useCancelNotification();
    const translate = useTranslate();
    const publish = usePublish();
    const handleNotification = useHandleNotification();

    const cacheQueries = useCacheQueries();

    const mutation = useMutation<
        DeleteOneResponse<TData>,
        TError,
        DeleteParams,
        DeleteContext
    >(
        ({
            id,
            mutationMode,
            undoableTimeout,
            resource,
            onCancel,
            metaData,
            dataProviderName,
        }) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return dataProvider(dataProviderName).deleteOne<TData>({
                    resource,
                    id,
                    metaData,
                });
            }

            const deletePromise = new Promise<DeleteOneResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        dataProvider(dataProviderName)
                            .deleteOne<TData>({ resource, id, metaData })
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
            onMutate: async ({ id, resource, mutationMode }) => {
                const previousQueries: ContextQuery[] = [];

                const allQueries = cacheQueries(resource, id);

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey, undefined, {
                        silent: true,
                    });

                    const previousQuery =
                        queryClient.getQueryData<QueryResponse<TData>>(
                            queryKey,
                        );

                    if (!(mutationModePropOrContext === "pessimistic")) {
                        if (previousQuery) {
                            previousQueries.push({
                                query: previousQuery,
                                queryKey,
                            });

                            if (
                                queryKey.includes(`resource/list/${resource}`)
                            ) {
                                const { data, total } =
                                    previousQuery as GetListResponse<TData>;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: (data ?? []).filter(
                                        (record: TData) => !(record.id == id),
                                    ),
                                    total: total - 1,
                                });
                            } else {
                                queryClient.removeQueries(queryKey);
                            }
                        }
                    }
                }

                return {
                    previousQueries: previousQueries,
                };
            },
            onError: (
                err: TError,
                { id, resource, errorNotification },
                context,
            ) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError(err);

                    const resourceSingular = pluralize.singular(resource);

                    handleNotification(errorNotification, {
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
            onSuccess: (_data, { id, resource, successNotification }) => {
                const resourceSingular = pluralize.singular(resource);

                const allQueries = cacheQueries(resource, id);
                for (const query of allQueries) {
                    if (
                        query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }

                handleNotification(successNotification, {
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
            },
            onSettled: (_data, _error, { id, resource }) => {
                const allQueries = cacheQueries(resource, id);
                for (const query of allQueries) {
                    if (
                        !query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id, resource },
                });
            },
        },
    );

    return mutation;
};
