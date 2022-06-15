import { useQuery, QueryObserverResult } from "react-query";
import { IResourcesConfig } from "@pankod/refine-sdk";

import { useSdk } from "../useSdk";

// TODO: Add hook docs
export const useResourcesConfig = (): QueryObserverResult<IResourcesConfig> => {
    const { sdk } = useSdk();
    return useQuery<IResourcesConfig>("authConfig", () =>
        sdk.config.resources(),
    );
};
