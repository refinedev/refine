import { useCallback, useMemo } from "react";
import {
    InvalidateOptions,
    InvalidateQueryFilters,
    useQueryClient,
} from "@tanstack/react-query";

import { useResource } from "@hooks/resource";
import { pickDataProvider } from "@definitions";
import { BaseKey, IQueryKeys } from "../../interfaces";
import { useKeys } from "@hooks/useKeys";
import { useRefineContext } from "..";

export type UseInvalidateProp = {
    resource?: string;
    id?: BaseKey;
    dataProviderName?: string;
    invalidates: Array<keyof IQueryKeys> | false;
    invalidationFilters?: InvalidateQueryFilters;
    invalidationOptions?: InvalidateOptions;
};

export const useInvalidate = (): ((props: UseInvalidateProp) => void) => {
    const { resources } = useResource();
    const queryClient = useQueryClient();
    const { keys, preferLegacyKeys } = useKeys();
    const { options } = useRefineContext();

    const invalidationDefaults = useMemo(() => {
        return {
            filters: options.invalidate.filters,
            options: options.invalidate.options,
        };
    }, [options.invalidate.filters, options.invalidate.options]);

    const invalidate = useCallback(
        ({
            resource,
            dataProviderName,
            invalidates,
            id,
            invalidationFilters = invalidationDefaults.filters,
            invalidationOptions = invalidationDefaults.options,
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
                            invalidationFilters,
                            invalidationOptions,
                        );
                        break;
                    case "list":
                        queryClient.invalidateQueries(
                            queryKey.action("list").get(preferLegacyKeys),
                            invalidationFilters,
                            invalidationOptions,
                        );
                        break;
                    case "many":
                        queryClient.invalidateQueries(
                            queryKey.action("many").get(preferLegacyKeys),
                            invalidationFilters,
                            invalidationOptions,
                        );
                        break;
                    case "resourceAll":
                        queryClient.invalidateQueries(
                            queryKey.get(preferLegacyKeys),
                            invalidationFilters,
                            invalidationOptions,
                        );
                        break;
                    case "detail":
                        queryClient.invalidateQueries(
                            queryKey
                                .action("one")
                                .id(id || "")
                                .get(preferLegacyKeys),
                            invalidationFilters,
                            invalidationOptions,
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
