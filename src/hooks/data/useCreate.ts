import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext } from "@interfaces";

type UseCreateReturnType = UseMutationResult<
    CreateResponse,
    unknown,
    {
        values: object;
    },
    unknown
>;

export const useCreate = (resource: string): UseCreateReturnType => {
    const { create } = useContext<IDataContext>(DataContext);

    const mutation = useMutation(({ values }: { values: object }) =>
        create(resource, values),
    );

    return mutation;
};
