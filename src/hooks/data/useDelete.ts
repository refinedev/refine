import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    DeleteOneResponse,
    IDataContext,
    MutationMode,
    GetListResponse,
    ListQuery,
    Context as DeleteContext,
    IGetOneResponse,
    GetOneQuery,
} from "@interfaces";

import {
    useMutationMode,
    useListResourceQueries,
    useCancelNotification,
    useGetOneQueries,
} from "@hooks";

type DeleteParams = {
    id: string | number;
};

type UseDeleteReturnType = UseMutationResult<
    DeleteOneResponse,
    unknown,
    DeleteParams,
    DeleteContext
>;

export const useDelete = (
    resource: string,
    mutationModeProp?: MutationMode,
    onCancel?: (cancelMutation: () => void) => void,
): UseDeleteReturnType => {
    const queryClient = useQueryClient();
    const { deleteOne } = useContext<IDataContext>(DataContext);
    const { mutationMode: mutationModeContext } = useMutationMode();
    const cancelNotification = useCancelNotification();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    if (!resource) {
        throw new Error("'resource' is required for useDelete hook.");
    }

    const listResourceQueries = useListResourceQueries(resource);
    const getOneQueries = useGetOneQueries(resource);

    const mutation = useMutation<
        DeleteOneResponse,
        unknown,
        DeleteParams,
        DeleteContext
    >(
        ({ id }) => {
            if (!(mutationMode === "undoable")) {
                return deleteOne(resource, id);
            }

            const updatePromise = new Promise<DeleteOneResponse>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        resolve(deleteOne(resource, id));
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
            onMutate: async (deleteParams) => {
                const previousListQueries: ListQuery[] = [];
                const previousGetOneQueries: GetOneQuery[] = [];

                if (!(mutationMode === "pessimistic")) {
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

                            const { data, total } = previousListQuery;

                            queryClient.setQueryData(queryKey, {
                                ...previousListQuery,
                                data: (data ?? []).filter(
                                    (record) =>
                                        !(
                                            record.id.toString() ===
                                            deleteParams.id.toString()
                                        ),
                                ),
                                total: total - 1,
                            });
                        }
                    }

                    const getOneQueriesWithId = getOneQueries.filter(
                        (query) => {
                            return (
                                (query.queryKey[1] as any).id ===
                                deleteParams.id.toString()
                            );
                        },
                    );

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

                            queryClient.removeQueries(queryKey);
                        }
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
