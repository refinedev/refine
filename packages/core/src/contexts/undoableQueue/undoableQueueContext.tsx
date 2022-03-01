import React, { useReducer } from "react";
import { createPortal } from "react-dom";

import { UndoableQueue } from "@components";

import { IUndoableQueue, IUndoableQueueContext } from "../../interfaces";
import { ActionTypes } from "./actionTypes";

export const UndoableQueueContext = React.createContext<IUndoableQueueContext>({
    notifications: [],
    notificationDispatch: () => false,
});

const initialState: IUndoableQueue[] = [];

export const undoableQueueReducer = (state: IUndoableQueue[], action: any) => {
    switch (action.type) {
        case ActionTypes.ADD:
            return [
                ...state.filter(
                    (notificationItem: IUndoableQueue) =>
                        notificationItem.id != action.payload.id &&
                        notificationItem.resource == action.payload.resource,
                ),
                {
                    ...action.payload,
                    isRunning: true,
                },
            ];
        case ActionTypes.REMOVE:
            return state.filter(
                (notificationItem: IUndoableQueue) =>
                    notificationItem.id != action.payload.id &&
                    notificationItem.resource == action.payload.resource,
            );
        case ActionTypes.DECREASE_NOTIFICATION_SECOND:
            return state.map((notificationItem: IUndoableQueue) => {
                if (
                    notificationItem.id == action.payload.id &&
                    notificationItem.resource == action.payload.resource
                ) {
                    return {
                        ...notificationItem,
                        seconds: action.payload.seconds - 1000,
                    };
                }
                return notificationItem;
            });
        default:
            return state;
    }
};

export const UndoableQueueContextProvider: React.FC = ({ children }) => {
    const [notifications, notificationDispatch] = useReducer(
        undoableQueueReducer,
        initialState,
    );

    const notificationData = { notifications, notificationDispatch };

    return (
        <UndoableQueueContext.Provider value={notificationData}>
            {children}
            {typeof window !== "undefined" &&
                createPortal(
                    <UndoableQueue notifications={notifications} />,
                    document.body,
                )}
        </UndoableQueueContext.Provider>
    );
};
