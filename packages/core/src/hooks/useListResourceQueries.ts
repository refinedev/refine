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

export const useCacheQueries = () => {
    const listResourceQueries = useListResourceQueries();
    const getOneQuery = useGetOneQueries();

    return useCallback((resource: string, id?: string) => {
        const query = getOneQuery(resource);
        const listQuery = listResourceQueries(resource);

        if (id) {
            const getOneQueriesWithId = query.filter((query) => {
                return (query.queryKey[1] as any).id === id;
            });

            return [...listQuery, ...getOneQueriesWithId];
        }
        return [...listQuery, ...query];
    }, []);
};
