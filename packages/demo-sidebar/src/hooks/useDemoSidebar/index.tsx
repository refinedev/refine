import { useState } from "react";
import { MutationMode } from "@refinedev/core";
import { DemoSidebarProps } from "../../components/DemoSidebar/types";

export const useDemoSidebar = (): [{}, DemoSidebarProps] => {
    const [mutationMode, setMutationMode] =
        useState<MutationMode>("pessimistic");
    const [syncWithLocation, setSyncWithLocation] = useState<boolean>(false);
    const [warnWhenUnsavedChanges, setWarnWhenUnsavedChanges] =
        useState<boolean>(false);
    const [undoableTimeout, setUndoableTimeout] = useState<number>(5000);

    const refineProps = {
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
        undoableTimeout,
    };

    const demoSidebarProps = {
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
        undoableTimeout,
        onMutationModeChange: setMutationMode,
        onSyncWithLocationChange: setSyncWithLocation,
        onWarnWhenUnsavedChangesChange: setWarnWhenUnsavedChanges,
        onUndoableTimeoutChange: setUndoableTimeout,
    };

    return [refineProps, demoSidebarProps];
};
