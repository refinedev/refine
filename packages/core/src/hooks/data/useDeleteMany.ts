import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    DeleteManyResponse,
    IDataContext,
    HttpError,
    BaseRecord,
    MutationMode,
    ContextQuery,
    QueryResponse,
    GetListResponse,
    Context as DeleteContext,
} from "../../interfaces";
import {
    useNotification,
    useTranslate,
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useCheckError,
} from "@hooks";
import { ActionTypes } from "@contexts/notification";

type DeleteParams = {
    ids: string[];
};

type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    { ids: string[] },
    unknown
>;

export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    resource: string,
    mutationModeProp?: MutationMode,
    undoableTimeoutProp?: number,
    onCancel?: (cancelMutation: () => void) => void,
): UseDeleteManyReturnType<TData, TError> => {
    const checkError = useCheckError();
    const { deleteMany } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const { notificationDispatch } = useCancelNotification();
    const notification = useNotification();
    const translate = useTranslate();
    const cacheQueries = useCacheQueries();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const undoableTimeout = undoableTimeoutProp ?? undoableTimeoutContext;

    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteParams,
        DeleteContext
    >(
        ({ ids }: { ids: string[] }) => {
            if (!(mutationMode === "undoable")) {
                return deleteMany<TData>(resource, ids);
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        deleteMany<TData>(resource, ids)
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    }, undoableTimeout);

                    const cancelMutation = () => {
                        clearTimeout(updateTimeout);
                        reject({ message: "mutationCancelled" });
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    } else {
                        notificationDispatch({
                            type: ActionTypes.ADD,
                            payload: {
                                id: ids,
                                resource: resource,
                                cancelMutation: cancelMutation,
                                seconds: undoableTimeout,
                            },
                        });
                    }
                },
            );
            return updatePromise;
        },
        {
            onMutate: async (deleteParams) => {
                const previousQueries: ContextQuery[] = [];

                const allQueries = cacheQueries(resource, deleteParams.ids);

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey);

                    const previousQuery =
                        queryClient.getQueryData<QueryResponse<TData>>(
                            queryKey,
                        );

                    if (!(mutationMode === "pessimistic")) {
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
                                        (record: TData) =>
                                            !deleteParams.ids.includes(
                                                record.id!,
                                            ),
                                    ),
                                    total: total - deleteParams.ids.length,
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
            // Always refetch after error or success:
            onSettled: (_data, _error, variables) => {
                const allQueries = cacheQueries(resource, variables.ids);
                for (const query of allQueries) {
                    if (
                        !query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }
            },
            onSuccess: (_data, { ids }) => {
                notification.success({
                    key: `${ids}-${resource}-notification`,
                    message: translate("notifications.success", "Success"),
                    description: translate(
                        "notifications.deleteSuccess",
                        { resource },
                        `Successfully deleted ${resource}`,
                    ),
                });
            },
            onError: (err, { ids }, context) => {
                checkError?.(err);
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: {
                        id: ids,
                    },
                });
                if (err.message !== "mutationCancelled") {
                    checkError?.(err);

                    notification.error({
                        key: `${ids}-${resource}-notification`,
                        message: translate(
                            "notifications.deleteError",
                            { resource, statusCode: err.statusCode },
                            `Error (status code: ${err.statusCode})`,
                        ),
                        description: err.message,
                    });
                }
            },
        },
    );

    return mutation;
};
