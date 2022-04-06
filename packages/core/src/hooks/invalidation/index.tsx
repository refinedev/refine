import { useCallback } from "react";
import { useQueryClient } from "react-query";

import { queryKeys } from "@definitions";
import { BaseKey, IQueryKeys } from "../../interfaces";

export type UseInvalidationProps = {
    resource: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys>;
};

export const useInvalidation = () => {
    const queryClient = useQueryClient();

    const invalidate = useCallback(
        ({
            resource,
            dataProviderName,
            invalidates,
            id,
        }: UseInvalidationProps) => {
            const queryKey = queryKeys(resource, dataProviderName);
            invalidates.forEach((key) => {
                switch (key) {
                    case "all":
                        queryClient.invalidateQueries(queryKey.all);
                        break;
                    case "list":
                        queryClient.invalidateQueries(queryKey.list());
                        break;
                    case "many":
                        queryClient.invalidateQueries(queryKey.many());
                        break;
                    case "resourceAll":
                        queryClient.invalidateQueries(queryKey.resourceAll);
                        break;
                    case "detail":
                        queryClient.invalidateQueries(
                            queryKey.detail(id || ""),
                        );
                        break;
                    default:
                        break;
                }
            });
        },
        [],
    );

    return invalidate;
};
