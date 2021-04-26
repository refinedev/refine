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
    RecordType extends BaseRecord = BaseRecord
> = UseMutationResult<
    UpdateManyResponse<RecordType>,
    unknown,
    { id: Identifier[]; values: BaseRecord },
    unknown
>;

export const useUpdateMany = <RecordType extends BaseRecord = BaseRecord>(
    resource: string,
): UseUpdateManyReturnType<RecordType> => {
    const { updateMany } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const mutation = useMutation(
        ({ id, values }: { id: Identifier[]; values: BaseRecord }) =>
            updateMany<RecordType>(resource, id, values),
    );

    return mutation;
};
