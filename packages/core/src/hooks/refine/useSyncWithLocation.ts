import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineConfig } from "../../interfaces";

type UseSyncWithLocationType = () => {
    syncWithLocation: IRefineConfig["syncWithLocation"];
};

/**
 * List query parameter values can be edited manually by typing directly in the URL.
 * To activate this feature `syncWithLocation` needs to be set to `true`.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#syncwithlocation} for more details.
 */
export const useSyncWithLocation: UseSyncWithLocationType = () => {
    const { syncWithLocation, config } = useContext(RefineContext);

    return { syncWithLocation: syncWithLocation ?? config.syncWithLocation };
};
