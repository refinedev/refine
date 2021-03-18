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
    Context as UpdateContext,
} from "@interfaces";
import {
    useMutationMode,
    useListResourceQueries,
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
