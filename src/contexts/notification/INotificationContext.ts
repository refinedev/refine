export interface INotificationContext {
    addNotification: (
        cancelMutation: () => void,
        id: string,
        resource: string,
    ) => void;
}
