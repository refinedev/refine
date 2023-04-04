import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { IResourcesConfig } from "@refinedev/sdk";

import { useSdk } from "../useSdk";

// TODO: Add hook docs
export const useResourcesConfig = ({
    resourceName,
}: {
    resourceName: string;
}): QueryObserverResult<IResourcesConfig> => {
    const { sdk } = useSdk();
    return useQuery<IResourcesConfig>(["resourcesConfig"], () =>
        sdk.config.resources(resourceName),
    );
};
