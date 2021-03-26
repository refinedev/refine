export interface INotificationContext {
    notifications: {
        id: string;
        resource: string;
        cancelMutation: () => void;
        seconds: number;
        isRunning: "new" | "running" | "ran";
    }[];
    notificationDispatch: React.Dispatch<any>;
}
