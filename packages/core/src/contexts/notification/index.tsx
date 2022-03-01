import React, { createContext } from "react";

import { INotificationContext } from "./INotificationContext";

export const defaultNotificationProvider: INotificationContext = {
    open: () => {
        return {};
    },
    close: () => {
        return {};
    },
};

export const NotificationContext = createContext<INotificationContext>(
    defaultNotificationProvider,
);

export const NotificationContextProvider: React.FC<INotificationContext> = ({
    open,
    close,
    children,
}) => {
    return (
        <NotificationContext.Provider value={{ open, close }}>
            {children}
        </NotificationContext.Provider>
    );
};
