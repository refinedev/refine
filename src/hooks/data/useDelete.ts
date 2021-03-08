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
} from "@interfaces";

import {
    useMutationMode,
    useListResourceQueries,
    useCancelNotification,
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
                }
                return { previousListQueries: previousListQueries };
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
                    }
                }
            },
            onSettled: () => {
                for (const query of listResourceQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }
            },
        },
    );

    return mutation;
};
