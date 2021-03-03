import React, { useContext } from "react";
import { QueryKey, useMutation, UseMutationResult, useQueryClient } from "react-query";
import { Button } from "antd"
import { DataContext } from "@contexts/data";
import { BaseRecord, IDataContext, UpdateResponse, GetListResponse } from "@interfaces";
import { useNotification } from "@hooks"

type UseUpdateReturnType<
    TParams extends BaseRecord = BaseRecord
    > = UseMutationResult<
        UpdateResponse,
        unknown,
        { id: string; values: TParams },
        Context
    >;

export const useUpdate = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
): UseUpdateReturnType<TParams> => {
    const queryClient = useQueryClient();
    const notification = useNotification()
    const { update } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const listResourceQueries = useListResourceQueries(resource)

    const mutation = useMutation<UpdateResponse, unknown, { id: string; values: TParams }, Context>(
        ({ id, values }/* { id: string; values: TParams } */) => {
            console.log("mutation start")
            const updatePromise = new Promise<UpdateResponse>((resolve, reject) => {
                console.log("mutation promise")

                const updateTimeout = setTimeout(() => {
                    console.log("mutation timeout")

                    // let updateResponse
                    // updateResponse = update<TParams>(resource, id, values)

                    resolve(update<TParams>(resource, id, values))
                }, 5000)
                notification.info({
                    description: "Undo",
                    message: "You have 5 seconds to undo",
                    btn: (
                        <Button
                            onClick={() => {
                                clearTimeout(updateTimeout)
                                reject("mutation cancelled")
                                notification.close("undo")
                            }}
                        >
                            Undo
                        </Button>),
                    key: "undo"
                })
            })
            return updatePromise
        },
        {
            onMutate: async (formValue) => {
                // console.log("onMutate formValue: ", formValue);

                let previousListQueries: { query: GetListResponse<BaseRecord>; queryKey: QueryKey }[] = []

                for (const listQuery of listResourceQueries) {
                    console.log("onMutate query selam: ", listQuery)

                    const { queryKey } = listQuery

                    await queryClient.cancelQueries(queryKey);

                    const previousListQuery = queryClient.getQueryData<GetListResponse>(queryKey)

                    console.log("previousListQuery: ", previousListQuery)

                    if (previousListQuery) previousListQueries.push({ query: previousListQuery, queryKey })

                    const { data } = previousListQuery ?? {}

                    console.log("previousListQueries: ", previousListQueries)

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
                    // console.log("onMutate undefşned: ", undefined);
                }


                console.log("previousListQueries before return", previousListQueries)

                return { previousListQueries: previousListQueries }

                // console.log("onMutate data: ", data)
            },
            onError: (err, variables, context) => {
                console.log("onError: ", err, context)
                console.log("error, context.previousListQuery top: ", context?.previousListQueries)

                if (context) {
                    for (const query of context?.previousListQueries) {
                        queryClient.setQueryData(query.queryKey, query.query)
                    }
                }

                // listResourceQueries.forEach(query => {
                //     console.log("error, selam")
                //     console.log("error, context.previousListQuery: ", context.previousListQuery)
                //     console.log("error, query: ", query)
                //     queryClient.setQueryData(query.queryKey, context.previousListQuery)
                // })
            },
            onSettled: () => {
                console.log("onSettled")
                for (const query of listResourceQueries) {

                    console.log("settled, query: ", query)

                    queryClient.invalidateQueries(query.queryKey);
                }
            },
        },
    );

    return mutation;
};

type Context = {
    previousListQueries: {
        query: GetListResponse<BaseRecord>;
        queryKey: QueryKey;
    }[]
}

const useListResourceQueries = (
    resource: string,
) => {
    console.log("useListResourceQueries")

    const queryClient = useQueryClient();

    const data = queryClient.getQueryCache();
    const listResourceQueries = data.getAll().filter((query) => {
        return query.queryKey.includes(`resource/list/${resource}`);
    });

    console.log("useListResourceQueries listResourceQueries: ", listResourceQueries)

    return listResourceQueries;
}