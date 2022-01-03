import React, { createContext } from "react";

import { INotificationProviderContext } from "./INotificationProvider";

export const defaultNotificationProvider: INotificationProviderContext = {
    open: () => true,
    close: () => false,
};

export const NotificationProviderContext =
    createContext<INotificationProviderContext>(defaultNotificationProvider);

export const NotificationProviderContextProvider: React.FC<INotificationProviderContext> =
    ({ open, close, children }) => {
        return (
            <NotificationProviderContext.Provider value={{ open, close }}>
                {children}
            </NotificationProviderContext.Provider>
        );
    };
