import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { DeleteManyResponse, IDataContext } from "@interfaces";

type UseDeleteManyReturnType = UseMutationResult<
    DeleteManyResponse,
    unknown,
    {
        id: (string | number)[];
    },
    unknown
>;

export const useDeleteMany = (resource: string): UseDeleteManyReturnType => {
    const { deleteMany } = useContext<IDataContext>(DataContext);

    if (!resource) {
        throw new Error("'resource' is required for useDelete hook.");
    }

    const queryClient = useQueryClient();

    const queryResource = `resource/list/${resource}`;

    const mutation = useMutation(
        ({ id }: { id: (string | number)[] }) => deleteMany(resource, id),
        {
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(queryResource);
            },
        },
    );

    return mutation;
};
