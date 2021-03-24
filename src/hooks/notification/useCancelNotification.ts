import { useContext } from "react";

import { NotificationContext } from "@contexts/notification";
import { INotificationContext } from "@interfaces";

export const useCancelNotification = () => {
    const { addNotification } = useContext<INotificationContext>(
        NotificationContext,
    );

    return { addNotification };
};
