import { useContext } from "react";

import { NotificationContext } from "@contexts/notification";
import { INotification, INotificationContext } from "../../../interfaces";

export type UseCancelNotificationType = () => {
    notifications: INotification[];
    notificationDispatch: React.Dispatch<any>;
};

export const useCancelNotification: UseCancelNotificationType = () => {
    const { notifications, notificationDispatch } =
        useContext<INotificationContext>(NotificationContext);

    return { notifications, notificationDispatch };
};
