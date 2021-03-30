import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DataContext } from "@contexts/data";
import {
    BaseRecord,
    IDataContext,
    UpdateResponse,
    GetListResponse,
    QueryResponse,
    MutationMode,
    Context as UpdateContext,
    ContextQuery,
} from "../../interfaces";
import {
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
} from "@hooks";

type UpdateParams<TParams> = {
    id: string;
    values: TParams;
};
type UseUpdateReturnType<
    TParams extends BaseRecord = BaseRecord
> = UseMutationResult<
    UpdateResponse,
    unknown,
    UpdateParams<TParams>,
    UpdateContext
>;

export const useUpdate = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
    mutationModeProp?: MutationMode,
    onCancel?: (cancelMutation: () => void) => void,
): UseUpdateReturnType<TParams> => {
    const queryClient = useQueryClient();
    const { update } = useContext<IDataContext>(DataContext);
    const { mutationMode: mutationModeContext } = useMutationMode();
    const cancelNotification = useCancelNotification();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const getAllQueries = useCacheQueries(resource);

    const mutation = useMutation<
        UpdateResponse,
        unknown,
        UpdateParams<TParams>,
        UpdateContext
    >(
        ({ id, values }) => {
            if (!(mutationMode === "undoable")) {
                return update<TParams>(resource, id, values);
            }
            const updatePromise = new Promise<UpdateResponse>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        resolve(update<TParams>(resource, id, values));
                    }, 5000);

                    const cancelMutation = () => {
                        clearTimeout(updateTimeout);
                        reject("mutation cancelled");
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    } else {
                        cancelNotification(cancelMutation);
                    }
                },
            );
            return updatePromise;
        },
        {
            onMutate: async (variables) => {
                const previousQueries: ContextQuery[] = [];

                const allQueries = getAllQueries(variables.id);

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
                                    data: data.map((record: BaseRecord) => {
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
            onError: (_err, _variables, context) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }
            },
            onSettled: (_data, _error, variables) => {
                const allQueries = getAllQueries(variables.id);
                for (const query of allQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }
            },
        },
    );

    return mutation;
};
