import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import {
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useNotification,
    useTranslate,
} from "@hooks";
import { DataContext } from "@contexts/data";
import { ActionTypes } from "@contexts/notification";
import pluralize from "pluralize";
import {
    DeleteOneResponse,
    IDataContext,
    MutationMode,
    QueryResponse,
    Context as DeleteContext,
    BaseRecord,
    ContextQuery,
    HttpError,
    GetListResponse,
} from "../../interfaces";

type UseDeleteReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
    TVariables = {}
> = UseMutationResult<
    DeleteOneResponse<TData>,
    TError,
    TVariables,
    DeleteContext
>;

export const useDelete = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends BaseRecord = BaseRecord
>(
    resource: string,
    mutationModeProp?: MutationMode,
    undoableTimeoutProp?: number,
    onCancel?: (cancelMutation: () => void) => void,
): UseDeleteReturnType<TData, TError, TVariables> => {
    const queryClient = useQueryClient();
    const { deleteOne } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const { notificationDispatch } = useCancelNotification();
    const notification = useNotification();
    const translate = useTranslate();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const undoableTimeout = undoableTimeoutProp ?? undoableTimeoutContext;

    if (!resource) {
        throw new Error("'resource' is required for useDelete hook.");
    }

    const cacheQueries = useCacheQueries();

    const mutation = useMutation<
        DeleteOneResponse<TData>,
        TError,
        TVariables,
        DeleteContext
    >(
        (variables) => {
            if (!(mutationMode === "undoable")) {
                return deleteOne<TData, TVariables>(resource, variables);
            }

            const updatePromise = new Promise<DeleteOneResponse<TData>>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        deleteOne<TData>(resource, variables)
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
                                id: variables.id,
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

                const allQueries = cacheQueries(
                    resource,
                    deleteParams.id?.toString(),
                );

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey);

                    const previousQuery = queryClient.getQueryData<
                        QueryResponse<TData>
                    >(queryKey);

                    if (!(mutationMode === "pessimistic")) {
                        if (previousQuery) {
                            previousQueries.push({
                                query: previousQuery,
                                queryKey,
                            });

                            if (
                                queryKey.includes(`resource/list/${resource}`)
                            ) {
                                const {
                                    data,
                                    total,
                                    // eslint-disable-next-line prettier/prettier
                                } = previousQuery as GetListResponse<
                                    TData
                                >;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: (data ?? []).filter(
                                        (record: TData) =>
                                            !(
                                                record.id!.toString() ===
                                                deleteParams.id?.toString()
                                            ),
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
            onError: (err: TError, { id }, context) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: {
                        id,
                    },
                });

                if (err.message !== "mutationCancelled") {
                    notification.error({
                        key: `${id}-${resource}-notification`,
                        message: translate(
                            "common:notifications.error",
                            { statusCode: err.statusCode },
                            `Error (status code: ${err.statusCode})`,
                        ),
                        description: err.message,
                    });
                }
            },
            onSuccess: (_data, { id }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.success({
                    key: `${id}-${resource}-notification`,
                    message: translate(
                        "common:notifications.success",
                        "Success",
                    ),
                    description: translate(
                        "common:notifications.deleteSuccess",
                        { resource: resourceSingular },
                        `Successfully deleted a ${resourceSingular}`,
                    ),
                });
            },
            onSettled: (_data, _error, variables) => {
                const allQueries = cacheQueries(
                    resource,
                    variables.id?.toString(),
                );
                for (const query of allQueries) {
                    if (
                        !query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }
            },
        },
    );

    return mutation;
};
