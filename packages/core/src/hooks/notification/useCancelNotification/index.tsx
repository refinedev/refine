import { useContext } from "react";

import { NotificationContext } from "@contexts/notification";
import { INotificationContext } from "../../../interfaces";

export const useCancelNotification = () => {
    const {
        notifications,
        notificationDispatch,
    } = useContext<INotificationContext>(NotificationContext);

    return { notifications, notificationDispatch };
};
