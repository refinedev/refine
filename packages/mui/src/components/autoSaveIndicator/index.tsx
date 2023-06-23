import React from "react";
import { AutoSaveIndicatorProps, useTranslate } from "@refinedev/core";
import Typography from "@mui/material/Typography";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
}) => {
    const translate = useTranslate();
    let message = null;

    switch (status) {
        case "success":
            message = translate("autosave.success", "saved");
            break;
        case "error":
            message = translate("autosave.error", "autosave error");
            break;
        case "loading":
            message = translate("autosave.loading", "saving...");
            break;
        default:
            // for idle
            message = translate("autosave.idle", "waiting for changes");
            break;
    }

    return <Typography>{message}</Typography>;
};
