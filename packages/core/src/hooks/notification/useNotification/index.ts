import { useContext } from "react";

import { NotificationProviderContext } from "@contexts/notificationProvider";

export const useNotification = () => {
    const { open, close } = useContext(NotificationProviderContext);

    return { open, close };
};
