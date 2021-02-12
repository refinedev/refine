import { useContext } from "react";
import { useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { CreateResponse, IDataContext, BaseRecord } from "@interfaces";

type UseCreateReturnType<
    TParams extends BaseRecord = BaseRecord
> = UseMutationResult<
    CreateResponse,
    unknown,
    {
        values: TParams;
    },
    unknown
>;

export const useCreate = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
): UseCreateReturnType<TParams> => {
    const { create } = useContext<IDataContext>(DataContext);

    const mutation = useMutation(({ values }: { values: TParams }) =>
        create<TParams>(resource, values),
    );

    return mutation;
};
