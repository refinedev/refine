import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    Identifier,
    BaseRecord,
    UpdateManyResponse,
} from "../../interfaces";

type UseUpdateManyReturnType<
    T extends BaseRecord = BaseRecord
> = UseMutationResult<
    UpdateManyResponse,
    unknown,
    { id: Identifier[]; values: T },
    unknown
>;

export const useUpdateMany = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
): UseUpdateManyReturnType<TParams> => {
    const { updateMany } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const mutation = useMutation(
        ({ id, values }: { id: Identifier[]; values: TParams }) =>
            updateMany<TParams>(resource, id, values),
    );

    return mutation;
};
