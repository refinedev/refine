import { useContext } from "react";

import { RefineContext } from "@contexts/refine";

export const useRefineContext = () => {
    const {
        Footer,
        Header,
        Layout,
        OffLayoutArea,
        Sider,
        Title,
        hasDashboard,
        mutationMode,
        syncWithLocation,
        undoableTimeout,
        warnWhenUnsavedChanges,
        DashboardPage,
        LoginPage,
        catchAll,
    } = useContext(RefineContext);

    return {
        Footer,
        Header,
        Layout,
        OffLayoutArea,
        Sider,
        Title,
        hasDashboard,
        mutationMode,
        syncWithLocation,
        undoableTimeout,
        warnWhenUnsavedChanges,
        DashboardPage,
        LoginPage,
        catchAll,
    };
};
