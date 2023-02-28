/**
 * @author aliemir
 *
 * While switching to NotificationBindings, we can try to experiment and explore the idea of
 * user controlled undoable notifications.
 *
 * Currently, we're handling the undoable notifications internally by updating the existing notification.
 * This is leading to some uncontrollable behaviors in the notification bindings.
 *
 * While leaving the control might not be possible, we can still try it at least. :)
 */

export interface OpenNotificationParams {
    key?: string;
    message: string;
    type: "success" | "error" | "progress";
    description?: string;
    cancelMutation?: () => void;
    undoableTimeout?: number;
}

export type NotificationsBindings = {
    open: (params: OpenNotificationParams) => void;
    close: (key: string) => void;
};
