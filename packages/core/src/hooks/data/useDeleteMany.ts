import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import { notification } from "antd";

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
    useTranslate,
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useCheckError,
} from "@hooks";
import { ActionTypes } from "@contexts/notification";
import pluralize from "pluralize";

type DeleteManyParams = {
    ids: string[];
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
};

type UseDeleteManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError = HttpError,
> = UseMutationResult<
    DeleteManyResponse<TData>,
    TError,
    DeleteManyParams,
    unknown
>;

export const useDeleteMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(): UseDeleteManyReturnType<TData, TError> => {
    const { mutate: checkError } = useCheckError();
    const { deleteMany } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();

    const { notificationDispatch } = useCancelNotification();
    const translate = useTranslate();
    const cacheQueries = useCacheQueries();

    const queryClient = useQueryClient();

    const mutation = useMutation<
        DeleteManyResponse<TData>,
        TError,
        DeleteManyParams,
        DeleteContext
    >(
        ({
            resource,
            ids,
            mutationMode,
            undoableTimeout,
            onCancel,
        }: DeleteManyParams) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;
            if (!(mutationModePropOrContext === "undoable")) {
                return deleteMany<TData>(resource, ids);
            }

            const updatePromise = new Promise<DeleteManyResponse<TData>>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        deleteMany<TData>(resource, ids)
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    }, undoableTimeoutPropOrContext);

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
                                seconds: undoableTimeoutPropOrContext,
                            },
                        });
                    }
                },
            );
            return updatePromise;
        },
        {
            onMutate: async ({ ids, resource, mutationMode }) => {
                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;
                const previousQueries: ContextQuery[] = [];

                const allQueries = cacheQueries(resource, ids);

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey);

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
                                        (record: TData) =>
                                            !ids.includes(
                                                record.id!.toString(),
                                            ),
                                    ),
                                    total: total - ids.length,
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
            onSettled: (_data, _error, { resource, ids }) => {
                const allQueries = cacheQueries(resource, ids);
                for (const query of allQueries) {
                    if (
                        !query.queryKey.includes(`resource/getOne/${resource}`)
                    ) {
                        queryClient.invalidateQueries(query.queryKey);
                    }
                }
            },
            onSuccess: (_data, { ids, resource }) => {
                const resourceSingular = pluralize.singular(resource);

                notification.success({
                    key: `${ids}-${resource}-notification`,
                    message: translate("notifications.success", "Success"),
                    description: translate(
                        "notifications.deleteSuccess",
                        { resource: resourceSingular },
                        `Successfully deleted ${resource}`,
                    ),
                });
            },
            onError: (err, { ids, resource }, context) => {
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
                    checkError(err);
                    const resourceSingular = pluralize.singular(resource);

                    notification.error({
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
                    });
                }
            },
        },
    );

    return mutation;
};
