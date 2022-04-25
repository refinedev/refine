import React from "react";
import { NotificationProvider } from "@pankod/refine-core";

import { useSnackbar } from "notistack";

import { CircularDeterminate } from "@components";
import { IconButton } from "@mui/material";
import { UndoOutlined } from "@mui/icons-material";

export const notificationProviderHandle = (): NotificationProvider => {
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const notificationProvider: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation }) => {
            if (type === "progress") {
                const action = (key: any) => (
                    <IconButton
                        onClick={() => {
                            cancelMutation?.();
                            closeSnackbar(key);
                        }}
                    >
                        <UndoOutlined color="secondary" />
                    </IconButton>
                );
                enqueueSnackbar(
                    <>
                        <CircularDeterminate
                            undoableTimeout={undoableTimeout ?? 0}
                            message={message}
                        />
                    </>,
                    {
                        action,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        preventDuplicate: true,
                        key,
                        autoHideDuration: (undoableTimeout ?? 0) * 1000,
                        disableWindowBlurListener: true,
                    },
                );
            } else {
                enqueueSnackbar(message, {
                    variant: type,
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                    disableWindowBlurListener: true,
                });
            }
        },
        close: (key) => {
            closeSnackbar(key);
        },
    };

    return notificationProvider;
};
