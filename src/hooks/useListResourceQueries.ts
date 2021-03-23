import { useQueryClient } from "react-query";

export const useListResourceQueries = (resource: string) => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryCache();
    const listResourceQueries = data.getAll().filter((query) => {
        return query.queryKey.includes(`resource/list/${resource}`);
    });

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
