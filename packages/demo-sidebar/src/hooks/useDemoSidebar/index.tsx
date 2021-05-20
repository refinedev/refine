import React, { useState } from "react";
import { MutationMode, TitleProps, Link } from "@pankod/refine";
import { DemoSidebarProps } from "../../components/DemoSidebar/types";

interface DemoSidebarParams {
    defaultTitle: string;
    defaultMutationMode: MutationMode;
}

interface PartialAdminProps {
    Title: React.FC<TitleProps>;
}

export const useDemoSidebar = ({
    defaultTitle,
}: DemoSidebarParams): [PartialAdminProps, DemoSidebarProps] => {
    const [title, setTitle] = useState<string>(defaultTitle);
    const [mutationMode, setMutationMode] =
        useState<MutationMode>("pessimistic");
    const [syncWithLocation, setSyncWithLocation] = useState<boolean>(false);
    const [warnWhenUnsavedChanges, setWarnWhenUnsavedChanges] =
        useState<boolean>(false);
    const [undoableTimeout, setUndoableTimeout] = useState<number>(5000);

    const DefaultTitle = () => (
        <Link to="/">
            <a
                href="/"
                style={{
                    display: "flex",
                    width: "100%",
                    textAlign: "center",
                    color: "rgb(255, 255, 255)",
                    fontSize: "16px",
                    height: "60px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {title}
            </a>
        </Link>
    );

    const adminProps = {
        Title: DefaultTitle,
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
