import { useCallback } from "react";

import { OpenNotificationParams } from "../../../interfaces";
import { useNotification } from "@hooks";

export const useHandleNotification = (): typeof handleNotification => {
    const { open } = useNotification();

    const handleNotification = useCallback(
        (
            notification: OpenNotificationParams | false | undefined,
            fallbackNotification?: OpenNotificationParams,
        ) => {
            if (notification !== false) {
                if (notification) {
                    open?.(notification);
                } else if (fallbackNotification) {
                    open?.(fallbackNotification);
                }
            }
        },
        [],
    );

    return handleNotification;
};
