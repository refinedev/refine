import { useContext } from "react";

import { AdminContext } from "@contexts/admin";

export const useSyncWithLocation = () => {
    const { syncWithLocation } = useContext(AdminContext);

    return { syncWithLocation };
};
