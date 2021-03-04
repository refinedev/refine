import { useContext } from "react";
import {
    QueryKey,
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "react-query";
import { DataContext } from "@contexts/data";
import {
    BaseRecord,
    IDataContext,
    UpdateResponse,
    GetListResponse,
    MutationMode,
} from "@interfaces";
import { useMutationMode, useListResourceQueries } from "@hooks";

type UpdateContext = {
    previousListQueries: {
        query: GetListResponse<BaseRecord>;
        queryKey: QueryKey;
    }[];
};

type UpdateParams<TParams> = {
    id: string;
    values: TParams;
};
type UseUpdateReturnType<
    TParams extends BaseRecord = BaseRecord
> = UseMutationResult<
    UpdateResponse,
    unknown,
    UpdateParams<TParams>,
    UpdateContext
>;

export const useUpdate = <TParams extends BaseRecord = BaseRecord>(
    resource: string,
    mutationModeProp?: MutationMode,
    onCancel?: (cancelMutation: () => void) => void,
): UseUpdateReturnType<TParams> => {
    const queryClient = useQueryClient();
    const { update } = useContext<IDataContext>(DataContext);
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    if (!resource) {
        throw new Error("'resource' is required for useUpdate hook.");
    }

    const listResourceQueries = useListResourceQueries(resource);

    const mutation = useMutation(
        /* <
        UpdateResponse,
        unknown,
        UpdateParams<TParams>,
        UpdateContext
    > */ ({
            id,
            values,
        }: UpdateParams<TParams>) => {
            if (!(mutationMode === "undoable")) {
                return update<TParams>(resource, id, values);
            }

            const updatePromise = new Promise<UpdateResponse>(
                (resolve, reject) => {
                    const updateTimeout = setTimeout(() => {
                        resolve(update<TParams>(resource, id, values));
                    }, 5000);

                    onCancel &&
                        onCancel(() => {
                            clearTimeout(updateTimeout);
                            reject("mutation cancelled");
                        });
                },
            );
            return updatePromise;
        },
        {
            onMutate: !(mutationMode === "pessimistic")
                ? async (formValue) => {
                      const previousListQueries: {
                          query: GetListResponse<BaseRecord>;
                          queryKey: QueryKey;
                      }[] = [];

                      for (const listQuery of listResourceQueries) {
                          const { queryKey } = listQuery;

                          await queryClient.cancelQueries(queryKey);

                          const previousListQuery = queryClient.getQueryData<GetListResponse>(
                              queryKey,
                          );

                          if (previousListQuery)
                              previousListQueries.push({
                                  query: previousListQuery,
                                  queryKey,
                              });

                          const { data } = previousListQuery ?? {};

                          queryClient.setQueryData(queryKey, {
                              ...previousListQuery,
                              data: (data ?? []).map((record) => {
                                  if (record.id.toString() === formValue.id) {
                                      return {
                                          ...formValue.values,
                                          id: formValue.id,
                                      };
                                  }
                                  return record;
                              }),
                          });
                      }
                      return { previousListQueries: previousListQueries };
                  }
                : undefined,
            onError: !(mutationMode === "pessimistic")
                ? (err, variables, context: UpdateContext | undefined) => {
                      if (context) {
                          for (const query of context.previousListQueries) {
                              queryClient.setQueryData(
                                  query.queryKey,
                                  query.query,
                              );
                          }
                      }
                  }
                : undefined,
            onSettled: !(mutationMode === "pessimistic")
                ? () => {
                      for (const query of listResourceQueries) {
                          queryClient.invalidateQueries(query.queryKey);
                      }
                  }
                : undefined,
        },
    );

    return mutation;
};
