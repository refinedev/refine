import { useCallback } from "react";
import { ArgsProps } from "antd/lib/notification";

import { useNotification } from "@hooks";

export const useHandleNotification = () => {
    const { open } = useNotification();

    const handleNotification = useCallback(
        (
            notification: ArgsProps | false | undefined,
            fallbackNotification?: ArgsProps,
        ) => {
            if (notification !== false) {
                if (notification) {
                    open(notification);
                } else if (fallbackNotification) {
                    open(fallbackNotification);
                }
            }
        },
        [],
    );

    return handleNotification;
};
