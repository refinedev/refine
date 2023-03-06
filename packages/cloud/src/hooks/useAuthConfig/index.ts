import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { IAuthConfig } from "@refinedev/sdk";

import { useSdk } from "../useSdk";

// TODO: Add hook docs
export const useAuthConfig = (): QueryObserverResult<IAuthConfig> => {
    const { sdk } = useSdk();
    return useQuery<IAuthConfig>(["authConfig"], () => sdk.config.auth());
};
