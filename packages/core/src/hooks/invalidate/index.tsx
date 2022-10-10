import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useResource } from "@hooks/resource";
import { queryKeys, pickDataProvider } from "@definitions";
import { BaseKey, IQueryKeys } from "../../interfaces";

export type UseInvalidateProp = {
    resource?: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
};

export const useInvalidate = (): ((props: UseInvalidateProp) => void) => {
    const { resources } = useResource();
    const queryClient = useQueryClient();

    const invalidate = useCallback(
        ({
            resource,
            dataProviderName,
            invalidates,
            id,
        }: UseInvalidateProp) => {
            if (invalidates === false) {
                return;
            }
            const queryKey = queryKeys(
                resource,
                pickDataProvider(resource, dataProviderName, resources),
            );

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
