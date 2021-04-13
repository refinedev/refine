import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useListResourceQueries = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();

    const listResourceQueries = useCallback((resource: string) => {
        return data.getAll().filter((query) => {
            return query.queryKey.includes(`resource/list/${resource}`);
        });
    }, []);

    return listResourceQueries;
};

export const useGetOneQueries = (resource: string) => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();
    const getOneQueries = data.getAll().filter((query) => {
        return query.queryKey.includes(`resource/getOne/${resource}`);
    });

    return getOneQueries;
};

export const useCacheQueries = (resource: string) => {
    const listQuery = useListResourceQueries();
    const getOneQuery = useGetOneQueries(resource);

    return (id?: string) => {
        if (id) {
            const getOneQueriesWithId = getOneQuery.filter((query) => {
                return (query.queryKey[1] as any).id === id;
            });
            return [...listQuery(resource), ...getOneQueriesWithId];
        }
        return [...listQuery(resource), ...getOneQuery];
    };
};
