import React from "react";
import { NotificationProvider } from "@pankod/refine-core";
import { IconButton, useSnackbar } from "@saas-ui/react";
import { IconRotate2 } from "@tabler/icons";

export const notificationProvider = (): NotificationProvider => {
    const snackbar = useSnackbar({
        position: "top-right",
        isClosable: true,
    });

    return {
        open: ({
            key,
            message,
            type,
            description,
            undoableTimeout,
            cancelMutation,
        }) => {
            if (type === "progress") {
                if (key && snackbar.isActive(key)) {
                    snackbar.update(key, {
                        title: message,
                        action: (
                            <IconButton
                                icon={<IconRotate2 />}
                                aria-label="Undo"
                                variant="outline"
                                onClick={cancelMutation}
                            />
                        ),
                    } as any);
                } else {
                    snackbar({
                        id: key,
                        title: message,
                        action: (
                            <IconButton
                                icon={<IconRotate2 />}
                                aria-label="Undo"
                                variant="outline"
                                onClick={cancelMutation}
                            />
                        ),
                    });
                }
            } else {
                if (key && snackbar.isActive(key)) {
                    snackbar.update(key, {
                        title: message,
                        status: type,
                        description,
                    });
                } else {
                    snackbar({
                        id: key,
                        title: message,
                        description,
                        status: type,
                    });
                }
            }
        },
        close: (key) => snackbar.close(key),
    };
};
