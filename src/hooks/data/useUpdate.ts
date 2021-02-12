import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { BaseRecord, IDataContext, UpdateResponse } from "@interfaces";

type UseUpdateReturnType<TParams = BaseRecord> = UseMutationResult<
    UpdateResponse,
    unknown,
    { id: string; values: TParams },
    unknown
>;

export const useUpdate = <TParams = BaseRecord>(
    resource: string,
): UseUpdateReturnType<TParams> => {
    const { update } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const mutation = useMutation(
        ({ id, values }: { id: string; values: TParams }) =>
            update<TParams>(resource, id, values),
    );

    return mutation;
};
