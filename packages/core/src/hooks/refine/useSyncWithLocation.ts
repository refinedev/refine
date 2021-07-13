import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "../../interfaces";

type UseSyncWithLocationType = () => {
    syncWithLocation: IRefineContext["syncWithLocation"];
};

export const useSyncWithLocation: UseSyncWithLocationType = () => {
    const { syncWithLocation } = useContext(RefineContext);

    return { syncWithLocation };
};
