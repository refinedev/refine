import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { DataContext } from "@contexts/data";
import { BaseRecord, IDataContext, UpdateResponse, GetListResponse } from "@interfaces";

type UseUpdateReturnType<
    TParams extends BaseRecord = BaseRecord
    > = UseMutationResult<
        UpdateResponse,
        unknown,
        { id: string; values: TParams },
        unknown
    >;

export const useUpdate = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
): UseUpdateReturnType<TParams> => {
    const queryClient = useQueryClient();
    const { update } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const listResourceQueries = useListResourceQueries(resource)

    const mutation = useMutation(
        ({ id, values }: { id: string; values: TParams }) => {
            // console.log("mutation start")
            // const updatePromise = new Promise<UpdateResponse>((resolve, reject) => {
            //     console.log("mutation promise")

            //     const updateTimeout = setTimeout(() => {
            //         console.log("mutation timeout")

            //         // let updateResponse
            //         // updateResponse = update<TParams>(resource, id, values)
            //         resolve(update<TParams>(resource, id, values))
            //     }, 5000)
            // })
            // return updatePromise
            // let updateResponse/* : Promise<UpdateResponse> */
            // const updateTimeout = setTimeout(() => {
            //     updateResponse = update<TParams>(resource, id, values)
            //     return updateResponse
            // }, 3000)
            return update<TParams>(resource, id, values)
            // return updateResponse
        },
        {
            onMutate: async (formValue) => {
                // console.log("onMutate formValue: ", formValue);

                listResourceQueries.forEach(async (listQuery) => {

                    const { queryKey } = listQuery

                    await queryClient.cancelQueries(queryKey);

                    const previousListQuery = queryClient.getQueryData<GetListResponse>(queryKey)

                    const { data } = previousListQuery ?? {}

                    console.log("previousListQuery: selamss: ", previousListQuery)

                    queryClient.setQueryData(queryKey, {
                        ...previousListQuery,
                        data: (data ?? []).map((record) => {
                            if (record.id.toString() === formValue.id) {
                                return {
                                    ...formValue.values,
                                    id: formValue.id,
                                };
                            }
                            return record;
                        }),
                    });

                    console.log("onMutate listQuery: ", listQuery);

                    return { previousListQuery }

                });

                // console.log("onMutate data: ", data)
            },
            onError: (err, variables, context: any) => {
                listResourceQueries.forEach(query => {
                    queryClient.setQueryData(query.queryKey, context.previousListQuery)
                })
            },
            onSettled: () => {
                listResourceQueries.forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },

        },
    );

    return mutation;
};

const useListResourceQueries = (
    resource: string,
) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryCache();
    const listResourceQueries = data.getAll().filter((query) => {
        return query.queryKey.includes(`resource/list/${resource}`);
    });

    return listResourceQueries;
}