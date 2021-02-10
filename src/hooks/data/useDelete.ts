import { useContext } from 'react';
import { useQueryClient, useMutation, UseMutationResult } from 'react-query';

import { DataContext } from '@contexts/data';
import { DeleteOneResponse, IDataContext } from '@interfaces';

type UseDeleteReturnType = UseMutationResult<
  DeleteOneResponse,
  unknown,
  {
    id: string | number;
  },
  unknown
>;

export const useDelete = (resource: string): UseDeleteReturnType => {
  const { deleteOne } = useContext<IDataContext>(DataContext);

  if (!resource) {
    throw new Error("'resource' is required for useDelete hook.");
  }

  const queryClient = useQueryClient();

  const queryResource = `resource/list/${resource}`;

  const mutation = useMutation(
    ({ id }: { id: string | number }) => deleteOne(resource, id),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(queryResource);
      }
    }
  );

  return mutation;
};
