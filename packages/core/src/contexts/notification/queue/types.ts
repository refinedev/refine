import { BaseKey } from "../../data/types";

export enum ActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  DECREASE_NOTIFICATION_SECOND = "DECREASE_NOTIFICATION_SECOND",
}

export interface INotificationQueue {
  id: BaseKey;
  resource: string;
  cancelMutation: () => void;
  doMutation: () => void;
  seconds: number;
  isRunning: boolean;
  isSilent: boolean;
}

export interface INotificationQueueContext {
  notifications: INotificationQueue[];
  notificationDispatch: React.Dispatch<any>;
}
