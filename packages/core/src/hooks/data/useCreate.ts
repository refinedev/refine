import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext, BaseRecord } from "../../interfaces";
import { useListResourceQueries } from "@hooks";

type UseCreateReturnType<
    TParams extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateResponse,
    unknown,
    {
        resource: string;
        values: TParams;
    },
    unknown
>;

export const useCreate = <
    TParams extends BaseRecord = BaseRecord
>(): UseCreateReturnType<TParams> => {
    const { create } = useContext<IDataContext>(DataContext);
    const getAllQueries = useListResourceQueries();

    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: TParams }) =>
            create<TParams>(resource, values),
        {
            onSettled: (_, __, { resource }) => {
                getAllQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
        },
    );

    return mutation;
};
