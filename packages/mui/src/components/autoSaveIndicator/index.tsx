import React, { PropsWithChildren } from "react";
import { AutoSaveIndicatorProps, useTranslate } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LoopIcon from "@mui/icons-material/Loop";

const IconWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <span
            style={{
                position: "relative",
                top: "2px",
                marginLeft: "0.3rem",
            }}
        >
            <CloudQueueIcon fontSize="medium" />
            {children}
        </span>
    );
};

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
}) => {
    const translate = useTranslate();
    let message = null;
    let icon = <IconWrapper />;

    switch (status) {
        case "success":
            message = translate("autosave.success", "saved");
            icon = (
                <IconWrapper>
                    <CheckIcon
                        color="info"
                        sx={{
                            position: "absolute",
                            top: 7,
                            right: 7,
                            fontSize: "12px",
                        }}
                    />
                </IconWrapper>
            );
            break;
        case "error":
            message = translate("autosave.error", "error");
            icon = (
                <IconWrapper>
                    <CloseIcon
                        color="error"
                        sx={{
                            position: "absolute",
                            top: 7,
                            right: 7,
                            fontSize: "12px",
                        }}
                    />
                </IconWrapper>
            );

            break;
        case "loading":
            message = translate("autosave.loading", "saving changes...");
            icon = (
                <IconWrapper>
                    <LoopIcon
                        sx={{
                            position: "absolute",
                            top: 7,
                            right: 7,
                            fontSize: "12px",
                        }}
                    />
                </IconWrapper>
            );

            break;
        default:
            // for idle
            message = translate("autosave.idle", "waiting for changes");
            break;
    }

    return (
        <Typography
            color="gray"
            fontSize="0.8rem"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            marginRight=".5rem"
        >
            {message}
            {icon}
        </Typography>
    );
};
