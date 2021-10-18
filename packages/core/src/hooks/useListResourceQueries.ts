import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useListResourceQueries = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();

    const listResourceQueries = useCallback(
        (resource: string) => {
            return data.getAll().filter((query) => {
                return query.queryKey.includes(`resource/list/${resource}`);
            });
        },
        [data],
    );

    return listResourceQueries;
};

export const useGetOneQueries = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();

    return useCallback(
        (resource: string) => {
            const getOneQueries = data.getAll().filter((query) => {
                return query.queryKey.includes(`resource/getOne/${resource}`);
            });

            return getOneQueries;
        },
        [data],
    );
};

export const useGetManyQueries = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();

    const getManyResourceQueries = useCallback(
        (resource: string) => {
            return data.getAll().filter((query) => {
                return query.queryKey.includes(`resource/getMany/${resource}`);
            });
        },
        [data],
    );

    return getManyResourceQueries;
};

export const useCacheQueries = () => {
    const listResourceQueries = useListResourceQueries();
    const getOneQuery = useGetOneQueries();
    const getManyResourceQuery = useGetManyQueries();

    return useCallback((resource: string, id?: string | string[]) => {
        const queries = getOneQuery(resource);
        const listQuery = listResourceQueries(resource);
        const getManyQuery = getManyResourceQuery(resource);

        if (id) {
            let getOneQueriesWithId;
            if (Array.isArray(id)) {
                getOneQueriesWithId = queries.filter((query) => {
                    return id.includes((query.queryKey[1] as any).id);
                });
            } else {
                getOneQueriesWithId = queries.filter((query) => {
                    return (query.queryKey[1] as any).id === id;
                });
            }

            return [...listQuery, ...getManyQuery, ...getOneQueriesWithId];
        }

        return [...listQuery, ...getManyQuery, ...queries];
    }, []);
};
