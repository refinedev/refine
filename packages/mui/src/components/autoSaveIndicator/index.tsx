import React from "react";
import { AutoSaveIndicatorProps } from "@refinedev/core";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
}) => {
    let message = null;

    switch (status) {
        case "success":
            message = "saved";
            break;
        case "error":
            message = "autosave error";
            break;
        case "loading":
            message = "saving...";
            break;
        default:
            // for idle
            message = "waiting for changes";
            break;
    }

    return <span>{message}</span>;
};
