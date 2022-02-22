import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { BaseKey } from "../interfaces";

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

    return useCallback((resource: string, id?: BaseKey | BaseKey[]) => {
        const queries = getOneQuery(resource);
        const listQuery = listResourceQueries(resource);
        const getManyQuery = getManyResourceQuery(resource);

        if (id) {
            const ids = Array.isArray(id) ? id : [id];

            const getOneQueriesWithId = queries.filter((query) => {
                return ids.map(String).includes((query.queryKey[1] as any).id);
            });

            return [...listQuery, ...getManyQuery, ...getOneQueriesWithId];
        }

        return [...listQuery, ...getManyQuery, ...queries];
    }, []);
};
