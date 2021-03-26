import React, { useReducer } from "react";
import { createPortal } from "react-dom";

import { Notification } from "@components";

import { INotificationContext } from "./INotificationContext";

export const NotificationContext = React.createContext<INotificationContext>({
    notifications: [],
    notificationDispatch: () => false,
});

const initialState: any = [];

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const TOGGLE_FALSE = "TOGGLE_FALSE";
export const UPDATE_ALL = "UPDATE_ALL";

export const notificationReducer = (state: any, action: any) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                {
                    ...action.payload,
                    isRunning: "new",
                },
            ];
        case TOGGLE_FALSE:
            return state.map((notif: any) => {
                if (notif.id === action.payload.id) {
                    return {
                        ...notif,
                        isRunning: "ran",
                    };
                } else {
                    return notif;
                }
            });
        case REMOVE:
            return state.filter((t: any) => t.id !== action.payload.id);
        case UPDATE_ALL:
            return action.payload;
        default:
            return state;
    }
};

export const NotificationContextProvider = (props: any) => {
    const [notifications, notificationDispatch] = useReducer(
        notificationReducer,
        initialState,
    );

    const notificationData = { notifications, notificationDispatch };

    return (
        <NotificationContext.Provider value={notificationData}>
            {props.children}
            {createPortal(
                <Notification notifications={notifications} />,
                document.body,
            )}
        </NotificationContext.Provider>
    );
};
