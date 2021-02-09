import { useContext } from "react";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";

import { DataContext } from "@contexts/data";
import { DeleteOneResponse, GetListResponse, IDataContext } from "@interfaces";

type UseDeleteReturnType = UseMutationResult<
    DeleteOneResponse,
    unknown,
    {
        id: string | number;
    },
    unknown
>;

export const useDelete = (
    resource: string,
    optimistic = true,
): UseDeleteReturnType => {
    const { deleteOne } = useContext<IDataContext>(DataContext);

    const queryClient = useQueryClient();

    const queryResource = `resource/list/${resource}`;

    const mutation = useMutation(
        ({ id }: { id: string | number }) => deleteOne(resource, id),
        {
            onMutate: optimistic
                ? async ({ id }) => {
                      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                      await queryClient.cancelQueries(queryResource);
                      // Snapshot the previous value
                      const previousData = queryClient.getQueryData(
                          queryResource,
                      );

                      // Optimistically remove item from list
                      queryClient.setQueryData<GetListResponse>(
                          queryResource,
                          (old) => {
                              const newList = [...(old?.data ?? [])].filter(
                                  (item) => item.id === id,
                              );
                              return {
                                  total: old?.total ?? 0,
                                  data: newList,
                              };
                          },
                      );

                      // Return a context object with the snapshotted value
                      return { previousData };
                  }
                : undefined,
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: optimistic
                ? (_err, _updated, { previousData }) => {
                      queryClient.setQueryData(queryResource, previousData);
                  }
                : undefined,
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(queryResource);
            },
        },
    );

    return mutation;
};
