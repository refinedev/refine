import { useContext } from "react";
import {
    useQueryClient,
    useMutation,
    UseMutationResult,
    QueryKey,
} from "react-query";

import { DataContext } from "@contexts/data";
import {
    DeleteOneResponse,
    IDataContext,
    MutationMode,
    GetListResponse,
    BaseRecord,
} from "@interfaces";

import { useMutationMode, useListResourceQueries } from "@hooks";

type DeleteParams = {
    id: string | number;
};

type DeleteContext = {
    previousListQueries: {
        query: GetListResponse<BaseRecord>;
        queryKey: QueryKey;
    }[];
};

type UseDeleteReturnType = UseMutationResult<
    DeleteOneResponse,
    unknown,
    DeleteParams,
    DeleteContext /* | undefined */
>;

export const useDelete = (
    resource: string,
    mutationModeProp?: MutationMode,
    onCancel?: (cancelMutation: () => void) => void,
): UseDeleteReturnType => {
    const queryClient = useQueryClient();
    const { deleteOne } = useContext<IDataContext>(DataContext);
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    if (!resource) {
        throw new Error("'resource' is required for useDelete hook.");
    }

    const listResourceQueries = useListResourceQueries(resource);

    const mutation = useMutation(
        /* <DeleteOneResponse, unknown, DeleteParams, DeleteContext> */ ({
            id,
        }: DeleteParams) => {
            if (!(mutationMode === "undoable")) {
                return deleteOne(resource, id);
            }

            const updatePromise = new Promise<DeleteOneResponse>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        resolve(deleteOne(resource, id));
                    }, 5000);

                    onCancel &&
                        onCancel(() => {
                            clearTimeout(updateTimeout);
                            reject("mutation cancelled");
                        });
                },
            );
            return updatePromise;
        },
        {
            onMutate: async (deleteParams) => {
                if (!(mutationMode === "pessimistic")) {
                    const previousListQueries: {
                        query: GetListResponse<BaseRecord>;
                        queryKey: QueryKey;
                    }[] = [];

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
                    return { previousListQueries: previousListQueries };
                }
                return;
            },
            onError: (err, variables, context: any) => {
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
