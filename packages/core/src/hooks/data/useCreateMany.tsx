import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { IDataContext, BaseRecord, CreateManyResponse } from "../../interfaces";
import { useListResourceQueries } from "@hooks";

type UseCreateManyReturnType<
    T extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateManyResponse,
    unknown,
    { resource: string; values: T[] },
    unknown
>;

export const useCreateMany = <
    TParams extends BaseRecord = BaseRecord
>(): UseCreateManyReturnType<TParams> => {
    const { createMany } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const queryClient = useQueryClient();

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: TParams[] }) =>
            createMany<TParams>(resource, values),
        {
            onSettled: (_, __, { resource }) => {
                getListQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
        },
    );

    return mutation;
};
