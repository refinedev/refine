import { useContext } from "react";

import { AdminContext } from "@contexts/admin";
import { IAdminContext } from "src/interfaces";

type UseSyncWithLocationType = () => {
    syncWithLocation: IAdminContext["syncWithLocation"];
};

export const useSyncWithLocation: UseSyncWithLocationType = () => {
    const { syncWithLocation } = useContext(AdminContext);

    return { syncWithLocation };
};
