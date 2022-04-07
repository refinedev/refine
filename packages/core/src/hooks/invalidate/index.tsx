import { useCallback } from "react";
import { useQueryClient } from "react-query";

import { queryKeys } from "@definitions";
import { BaseKey, IQueryKeys } from "../../interfaces";

export type UseInvalidateProp = {
    resource?: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
};

export const useInvalidate = (): ((props: UseInvalidateProp) => void) => {
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
