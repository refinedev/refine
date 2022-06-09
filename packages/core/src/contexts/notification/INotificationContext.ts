export interface OpenNotificationParams {
    key?: string;
    message: string;
    type: "success" | "error" | "progress";
    description?: string;
    cancelMutation?: () => void;
    undoableTimeout?: number;
}

export interface INotificationContext {
    open?: (params: OpenNotificationParams) => void;
    close?: (key: string) => void;
}

export type NotificationProvider = Required<INotificationContext>;
