import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext } from "@interfaces";

type UseCreateReturnType = UseMutationResult<
    CreateResponse,
    unknown,
    {
        values: string;
    },
    unknown
>;

export const useCreate = (resource?: string): UseCreateReturnType => {
    const { create } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useCreate hook.");
    }

    const mutation = useMutation(({ values }: { values: string }) =>
        create(resource, values),
    );

    return mutation;
};
