import React from "react";
import { AutoSaveIndicatorProps, useTranslate } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
}) => {
    const translate = useTranslate();
    let message = null;
    let icon = <MoreHorizOutlinedIcon fontSize="small" />;

    switch (status) {
        case "success":
            message = translate("autoSave.success", "saved");
            icon = <TaskAltOutlinedIcon fontSize="small" />;
            break;
        case "error":
            message = translate("autoSave.error", "auto save failure");
            icon = <ErrorOutlineOutlinedIcon fontSize="small" />;

            break;
        case "loading":
            message = translate("autoSave.loading", "saving...");
            icon = <SyncOutlinedIcon fontSize="small" />;
            break;
        default:
            // for idle
            message = translate("autoSave.idle", "waiting for changes");
            break;
    }

    return (
        <Typography
            color="gray"
            fontSize="0.8rem"
            position="relative"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            marginRight=".3rem"
        >
            {message}
            <span
                style={{ position: "relative", top: "3px", marginLeft: "3px" }}
            >
                {icon}
            </span>
        </Typography>
    );
};
