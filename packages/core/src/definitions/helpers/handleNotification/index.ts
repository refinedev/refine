import { notification as antdNotification } from "antd";
import { ArgsProps } from "antd/lib/notification";

export const handleNotification = (
    notification: ArgsProps | false | undefined,
    fallbackNotification?: ArgsProps,
): void => {
    if (notification !== false) {
        if (notification) {
            antdNotification.open(notification);
        } else if (fallbackNotification) {
            antdNotification.open(fallbackNotification);
        }
    }
};
