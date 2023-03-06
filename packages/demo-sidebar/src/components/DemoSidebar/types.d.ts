import { Dispatch, SetStateAction } from "react";
import { MutationMode } from "@refinedev/core";

export interface DemoSidebarProps {
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    undoableTimeout: number;
    onMutationModeChange: Dispatch<SetStateAction<MutationMode>>;
    onSyncWithLocationChange: Dispatch<SetStateAction<boolean>>;
    onWarnWhenUnsavedChangesChange: Dispatch<SetStateAction<boolean>>;
    onUndoableTimeoutChange: Dispatch<SetStateAction<number>>;
}
