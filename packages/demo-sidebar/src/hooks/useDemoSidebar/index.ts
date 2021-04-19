import { useState } from "react";
import { MutationMode } from "refinejs";
import { DemoSidebarProps } from "../../components/DemoSidebar/types";

interface DemoSidebarParams {
    defaultTitle: string;
    defaultMutationMode: MutationMode;
}

interface PartialAdminProps {
    title: string;
}

export const useDemoSidebar = ({
    defaultTitle,
}: DemoSidebarParams): [PartialAdminProps, DemoSidebarProps] => {
    const [title, setTitle] = useState<string>(defaultTitle);
    const [mutationMode, setMutationMode] = useState<MutationMode>(
        "pessimistic",
    );
    const [syncWithLocation, setSyncWithLocation] = useState<boolean>(false);
    const [
        warnWhenUnsavedChanges,
        setWarnWhenUnsavedChanges,
    ] = useState<boolean>(false);
    const [undoableTimeout, setUndoableTimeout] = useState<number>(5000);

    const adminProps = {
        title,
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
        undoableTimeout,
    };

    const demoSidebarProps = {
        title,
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
        undoableTimeout,
        onTitleChange: setTitle,
        onMutationModeChange: setMutationMode,
        onSyncWithLocationChange: setSyncWithLocation,
        onWarnWhenUnsavedChangesChange: setWarnWhenUnsavedChanges,
        onUndoableTimeoutChange: setUndoableTimeout,
    };

    return [adminProps, demoSidebarProps];
};
