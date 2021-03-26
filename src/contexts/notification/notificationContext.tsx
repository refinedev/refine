import React, { useReducer } from "react";
import { createPortal } from "react-dom";

import { Notification } from "@components";

import { INotification, INotificationContext } from "@interfaces";
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
                    isRunning: "new",
                },
            ];
        case ActionTypes.TOGGLE_FALSE:
            return state.map((notif: INotification) => {
                if (notif.id === action.payload.id) {
                    return {
                        ...notif,
                        isRunning: "ran",
                    };
                } else {
                    return notif;
                }
            });
        case ActionTypes.REMOVE:
            return state.filter(
                (t: INotification) => t.id !== action.payload.id,
            );
        case ActionTypes.UPDATE_ALL:
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
