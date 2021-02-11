import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { IDataContext, UpdateResponse } from "@interfaces";

type UseUpdateReturnType = UseMutationResult<
    UpdateResponse,
    unknown,
    { id: string; values: object },
    unknown
>;

// TODO update type
export const useUpdate = (resource: string): UseUpdateReturnType => {
    const { update } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const mutation = useMutation(
        ({ id, values }: { id: string; values: object }) =>
            update(resource, id, values),
    );

    return mutation;
};
