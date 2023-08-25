import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useResource } from "@hooks/resource";
import { queryKeys, pickDataProvider } from "@definitions";
import { BaseKey, IQueryKeys } from "../../interfaces";
import { useKeys } from "@hooks/useKeys";

export type UseInvalidateProp = {
    resource?: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
};

export const useInvalidate = (): ((props: UseInvalidateProp) => void) => {
    const { resources } = useResource();
    const queryClient = useQueryClient();
    const { keys, preferLegacyKeys } = useKeys();

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
            const dp = pickDataProvider(resource, dataProviderName, resources);

            const queryKey = keys()
                .data(dp)
                .resource(resource ?? "");

            invalidates.forEach((key) => {
                switch (key) {
                    case "all":
                        queryClient.invalidateQueries(
                            keys().data(dp).get(preferLegacyKeys),
                        );
                        break;
                    case "list":
                        queryClient.invalidateQueries(
                            queryKey.action("list").get(preferLegacyKeys),
                        );
                        break;
                    case "many":
                        queryClient.invalidateQueries(
                            queryKey.action("many").get(preferLegacyKeys),
                        );
                        break;
                    case "resourceAll":
                        queryClient.invalidateQueries(
                            queryKey.get(preferLegacyKeys),
                        );
                        break;
                    case "detail":
                        queryClient.invalidateQueries(
                            queryKey
                                .action("one")
                                .id(id || "")
                                .get(preferLegacyKeys),
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
