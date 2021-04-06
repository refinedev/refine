import { useState } from "react";
import { MutationMode } from "readmin";
import { DemoSidebarProps } from "../../components/DemoSidebar";

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

    const adminProps = {
        title,
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
    };

    const demoSidebarProps = {
        title,
        mutationMode,
        syncWithLocation,
        warnWhenUnsavedChanges,
        onTitleChange: setTitle,
        onMutationModeChange: setMutationMode,
        onSyncWithLocationChange: setSyncWithLocation,
        onWarnWhenUnsavedChangesChange: setWarnWhenUnsavedChanges,
    };

    return [adminProps, demoSidebarProps];
};
