import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext, Params } from "@interfaces";

type UseCreateReturnType = UseMutationResult<
    CreateResponse,
    unknown,
    {
        values: Params;
    },
    unknown
>;

export const useCreate = <TData extends CreateResponse = CreateResponse>(
    resource: string,
): UseCreateReturnType => {
    const { create } = useContext<IDataContext>(DataContext);

    const mutation = useMutation(({ values }: { values: Params }) =>
        create(resource, values),
    );

    return mutation;
};
