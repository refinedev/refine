import React, { createContext, useReducer } from "react";

import isEqual from "lodash/isEqual";

import { NotificationQueue } from "../../../components";
import {
  ActionTypes,
  INotificationQueue,
  INotificationQueueContext,
} from "./types";

export const NotificationQueueContext =
  createContext<INotificationQueueContext>({
    notifications: [],
    notificationDispatch: () => false,
  });

const initialState: INotificationQueue[] = [];

export const notificationQueueReducer = (
  state: INotificationQueue[],
  action: any,
) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      const newState = state.filter((notificationItem: INotificationQueue) => {
        return !(
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource === action.payload.resource
        );
      });

      return [
        ...newState,
        {
          ...action.payload,
          isRunning: true,
        },
      ];
    }
    case ActionTypes.REMOVE:
      return state.filter(
        (notificationItem: INotificationQueue) =>
          !(
            isEqual(notificationItem.id, action.payload.id) &&
            notificationItem.resource === action.payload.resource
          ),
      );
    case ActionTypes.DECREASE_NOTIFICATION_SECOND:
      return state.map((notificationItem: INotificationQueue) => {
        if (
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource === action.payload.resource
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

export const NotificationQueueContextProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [notifications, notificationDispatch] = useReducer(
    notificationQueueReducer,
    initialState,
  );

  const notificationData = { notifications, notificationDispatch };

  return (
    <NotificationQueueContext.Provider value={notificationData}>
      {children}
      {typeof window !== "undefined"
        ? notifications.map((notification) => (
            <NotificationQueue
              key={`${notification.id}-${notification.resource}-queue`}
              notification={notification}
            />
          ))
        : null}
    </NotificationQueueContext.Provider>
  );
};
