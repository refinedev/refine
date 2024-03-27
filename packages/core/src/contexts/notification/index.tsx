import React, { createContext, PropsWithChildren } from "react";

import { INotificationContext } from "./types";

/** @deprecated default value for notification context has no use and is an empty object.  */
export const defaultNotificationProvider: INotificationContext = {};

export const NotificationContext = createContext<INotificationContext>({});

export const NotificationContextProvider: React.FC<
  PropsWithChildren<INotificationContext>
> = ({ open, close, children }) => {
  return (
    <NotificationContext.Provider value={{ open, close }}>
      {children}
    </NotificationContext.Provider>
  );
};
