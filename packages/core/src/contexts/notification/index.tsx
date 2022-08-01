import React, { createContext } from "react";

import { INotificationContext } from "./INotificationContext";

/** @deprecated default value for notification context has no use and is an empty object.  */
export const defaultNotificationProvider: INotificationContext = {};

export const NotificationContext = createContext<INotificationContext>({});

export const NotificationContextProvider: React.FC<
    INotificationContext & {
        children?: React.ReactNode;
    }
> = ({ open, close, children }) => {
    return (
        <NotificationContext.Provider value={{ open, close }}>
            {children}
        </NotificationContext.Provider>
    );
};
