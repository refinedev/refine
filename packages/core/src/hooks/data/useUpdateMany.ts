import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    Identifier,
    BaseRecord,
    UpdateManyResponse,
    HttpError,
} from "../../interfaces";

type UseUpdateManyReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = UseMutationResult<
    UpdateManyResponse<TData>,
    TError,
    { id: Identifier[]; values: TVariables },
    unknown
>;

export const useUpdateMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
>(
    resource: string,
): UseUpdateManyReturnType<TData, TError, TVariables> => {
    const { updateMany } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const mutation = useMutation<
        UpdateManyResponse<TData>,
        TError,
        {
            id: Identifier[];
            values: TVariables;
        },
        unknown
    >(({ id, values }: { id: Identifier[]; values: TVariables }) =>
        updateMany<TData, TVariables>(resource, id, values),
    );

    return mutation;
};
