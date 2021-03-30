import { INotification } from "../../interfaces";

export interface INotificationContext {
    notifications: INotification[];
    notificationDispatch: React.Dispatch<any>;
}
