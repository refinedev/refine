import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DataContext } from "@contexts/data";
import {
    BaseRecord,
    IDataContext,
    UpdateResponse,
    GetListResponse,
    MutationMode,
    ListQuery,
    GetOneQuery,
    Context as UpdateContext,
    IGetOneResponse,
} from "@interfaces";
import {
    useMutationMode,
    useListResourceQueries,
    useGetOneQueries,
    useCancelNotification,
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

    const listResourceQueries = useListResourceQueries(resource);
    const getOneQueries = useGetOneQueries(resource);

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
            onMutate: async (formValue) => {
                const previousListQueries: ListQuery[] = [];
                const previousGetOneQueries: GetOneQuery[] = [];

                for (const listQuery of listResourceQueries) {
                    const { queryKey } = listQuery;

                    await queryClient.cancelQueries(queryKey);

                    const previousListQuery = queryClient.getQueryData<GetListResponse>(
                        queryKey,
                    );

                    if (previousListQuery) {
                        previousListQueries.push({
                            query: previousListQuery,
                            queryKey,
                        });

                        const { data } = previousListQuery;

                        queryClient.setQueryData(queryKey, {
                            ...previousListQuery,
                            data: data.map((record) => {
                                if (record.id.toString() === formValue.id) {
                                    return {
                                        ...formValue.values,
                                        id: formValue.id,
                                    };
                                }
                                return record;
                            }),
                        });
                    }
                }

                const getOneQueriesWithId = getOneQueries.filter((query) => {
                    return (query.queryKey[1] as any).id === formValue.id;
                });

                for (const getOneQuery of getOneQueriesWithId) {
                    const { queryKey } = getOneQuery;

                    await queryClient.cancelQueries(queryKey);

                    const previousGetOneQuery = queryClient.getQueryData<IGetOneResponse>(
                        queryKey,
                    );

                    if (previousGetOneQuery) {
                        previousGetOneQueries.push({
                            query: previousGetOneQuery,
                            queryKey,
                        });

                        queryClient.setQueryData(queryKey, {
                            data: {
                                ...previousGetOneQuery.data,
                                ...formValue.values,
                            },
                        });
                    }
                }
                return {
                    previousListQueries: previousListQueries,
                    previousGetOneQueries: previousGetOneQueries,
                };
            },
            onError: (err, variables, context) => {
                if (!(mutationMode === "pessimistic")) {
                    if (context) {
                        for (const query of context.previousListQueries) {
                            queryClient.setQueryData(
                                query.queryKey,
                                query.query,
                            );
                        }
                        if (context.previousGetOneQueries) {
                            for (const query of context.previousGetOneQueries) {
                                queryClient.setQueryData(
                                    query.queryKey,
                                    query.query,
                                );
                            }
                        }
                    }
                }
            },
            onSettled: (_data, _error, variables) => {
                for (const query of listResourceQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }

                const getOneQueriesWithId = getOneQueries.filter((query) => {
                    return (query.queryKey[1] as any).id === variables.id;
                });

                for (const query of getOneQueriesWithId) {
                    queryClient.invalidateQueries(query.queryKey);
                }
            },
        },
    );

    return mutation;
};
