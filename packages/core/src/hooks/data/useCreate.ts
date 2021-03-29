import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext, BaseRecord } from "../../interfaces";

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

    const mutation = useMutation(
        ({ resource, values }: { resource: string; values: TParams }) =>
            create<TParams>(resource, values),
    );

    return mutation;
};
