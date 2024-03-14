import { useContext } from "react";

import { NotificationQueueContext } from "@contexts/notification/queue";
import { INotificationQueue } from "../../../contexts/notification/queue/types";

export type UseCancelNotificationType = () => {
  notifications: INotificationQueue[];
  notificationDispatch: React.Dispatch<any>;
};

export const useCancelNotification: UseCancelNotificationType = () => {
  const { notifications, notificationDispatch } = useContext(
    NotificationQueueContext,
  );

  return { notifications, notificationDispatch };
};
