import { useQueryClient } from "react-query";

export const useListResourceQueries = (resource: string) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryCache();
    const listResourceQueries = data.getAll().filter((query) => {
        return query.queryKey.includes(`resource/list/${resource}`);
    });

    return listResourceQueries;
};
