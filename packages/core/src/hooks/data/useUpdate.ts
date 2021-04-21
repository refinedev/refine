import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DataContext } from "@contexts/data";
import { ActionTypes } from "@contexts/notification";
import {
    BaseRecord,
    IDataContext,
    UpdateResponse,
    QueryResponse,
    MutationMode,
    Context as UpdateContext,
    ContextQuery,
    HttpError,
} from "../../interfaces";
import pluralize from "pluralize";
import {
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useNotification,
    useTranslate,
} from "@hooks";

type UpdateParams<T> = {
    id: string;
    values: T;
};
export type UseUpdateReturnType<T> = UseMutationResult<
    UpdateResponse<T>,
    unknown,
    UpdateParams<BaseRecord>,
    UpdateContext
>;

export const useUpdate = <RecordType extends BaseRecord = BaseRecord>(
    resource: string,
    mutationModeProp?: MutationMode,
    undoableTimeoutProp?: number,
    onCancel?: (cancelMutation: () => void) => void,
): UseUpdateReturnType<RecordType> => {
    const queryClient = useQueryClient();
    const { update } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const notification = useNotification();
    const translate = useTranslate();

    const { notificationDispatch } = useCancelNotification();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const undoableTimeout = undoableTimeoutProp ?? undoableTimeoutContext;

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const resourceSingular = pluralize.singular(resource);

    const getAllQueries = useCacheQueries();

    const mutation = useMutation<
        UpdateResponse<RecordType>,
        HttpError,
        UpdateParams<BaseRecord>,
        UpdateContext
    >(
        ({ id, values }) => {
            if (!(mutationMode === "undoable")) {
                return update<RecordType>(resource, id, values);
            }
            const updatePromise = new Promise<UpdateResponse<RecordType>>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        resolve(update<RecordType>(resource, id, values));
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
                                id: id,
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
            onMutate: async (variables) => {
                const previousQueries: ContextQuery[] = [];

                const allQueries = getAllQueries(resource, variables.id);

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey);

                    const previousQuery = queryClient.getQueryData<QueryResponse>(
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
                                const { data } = previousQuery;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: data.map((record: RecordType) => {
                                        if (
                                            record.id!.toString() ===
                                            variables.id
                                        ) {
                                            return {
                                                ...variables.values,
                                                id: variables.id,
                                            };
                                        }
                                        return record;
                                    }),
                                });
                            } else {
                                queryClient.setQueryData(queryKey, {
                                    data: {
                                        ...previousQuery.data,
                                        ...variables.values,
                                    },
                                });
                            }
                        }
                    }
                }

                return {
                    previousQueries: previousQueries,
                };
            },
            onError: (err: HttpError, { id }, context) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    notification.error({
                        key: `${id}-${resource}-notification`,
                        message: translate(
                            "common:notifications:editError",
                            { resourceSingular },
                            `Error when editing ${resourceSingular} (status code: ${err.statusCode}`,
                        ),
                        description: err.message,
                    });
                }
            },
            onSettled: (_data, _error, variables) => {
                const allQueries = getAllQueries(resource, variables.id);
                for (const query of allQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }
            },
            onSuccess: (_data, { id }) => {
                notification.success({
                    key: `${id}-${resource}-notification`,
                    message: translate(
                        "common:notifications:success",
                        "Successful",
                    ),
                    description: translate(
                        "common:notifications:editSuccess",
                        { resourceSingular },
                        `Successfully edited ${resourceSingular}`,
                    ),
                });
            },
        },
    );

    return mutation;
};
