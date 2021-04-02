import React, { useReducer } from "react";
import { createPortal } from "react-dom";

import { Notification } from "@components";

import { INotification, INotificationContext } from "../../interfaces";
import { ActionTypes } from "./actionTypes";

export const NotificationContext = React.createContext<INotificationContext>({
    notifications: [],
    notificationDispatch: () => false,
});

const initialState: INotification[] = [];

export const notificationReducer = (state: INotification[], action: any) => {
    switch (action.type) {
        case ActionTypes.ADD:
            return [
                ...state,
                {
                    ...action.payload,
                    isRunning: true,
                },
            ];
        case ActionTypes.REMOVE:
            return state.filter(
                (notificationItem: INotification) =>
                    notificationItem.id !== action.payload.id,
            );
        case ActionTypes.DECREASE_NOTIFICATION_SECOND:
            return state.map((notificationItem: INotification) => {
                if (notificationItem.id === action.payload.id) {
                    return {
                        ...notificationItem,
                        seconds: action.payload.seconds - 1,
                    };
                }
                return notificationItem;
            });
        default:
            return state;
    }
};

export const NotificationContextProvider: React.FC = ({ children }) => {
    const [notifications, notificationDispatch] = useReducer(
        notificationReducer,
        initialState,
    );

    const notificationData = { notifications, notificationDispatch };

    return (
        <NotificationContext.Provider value={notificationData}>
            {children}
            {createPortal(
                <Notification notifications={notifications} />,
                document.body,
            )}
        </NotificationContext.Provider>
    );
};
