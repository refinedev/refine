import { useContext } from "react";

import { NotificationContext } from "@contexts/notification";

export const useNotification = () => {
    const { open, close } = useContext(NotificationContext);

    return { open, close };
};
