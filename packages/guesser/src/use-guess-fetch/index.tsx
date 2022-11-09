import React from "react";
import { useDataProvider, useResource } from "@pankod/refine-core";

import { pickDataProvider, dataProviderFromResource } from "@/utilities";

/**
 * This hook will handle the data fetching for the guesser with `loading` and `initial` states.
 * Data provider functions will be used respectively for the `list`, `show` and `edit` types.
 */
export const useGuessFetch = (
    type: "list" | "show" | "edit",
    resourceNameOrRouteName: string,
) => {
    const { resource, resourceName, id, resources } = useResource({
        resourceNameOrRouteName,
    });
    const dataProvider = useDataProvider();

    const [data, setData] = React.useState<Record<string, unknown> | undefined>(
        undefined,
    );
    const [initial, setInitial] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    const resolver = React.useCallback(
        async (recordItemId: number) => {
            const dataProviderName =
                dataProviderFromResource(resource) ??
                pickDataProvider(resourceName, undefined, resources);
            const dp = dataProvider(dataProviderName);

            setLoading(true);

            try {
                if (type === "list") {
                    const response = await dp.getList({
                        resource: resourceName,
                    });
                    setData(response.data?.[0]);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
                if (type === "edit" || (type === "show" && recordItemId)) {
                    const response = await dp.getOne({
                        resource: resourceName,
                        id: recordItemId,
                    });
                    setData(response.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            } catch (error) {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        },
        [type, dataProvider, resource, resourceName, resources],
    );

    React.useEffect(() => {
        setInitial(false);
        if (!loading && !data) {
            resolver(id);
        }
    }, [resolver, id]);

    return {
        data,
        loading,
        initial,
    };
};
