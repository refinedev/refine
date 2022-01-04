import { CSSProperties, ReactNode } from "react";

export interface OpenNotificationParams {
    description: ReactNode;
    type: "success" | "error" | "progress";
    key?: string;
    message?: ReactNode; // required for antd design notification
    duration?: number;
    style?: CSSProperties;
    closeIcon?: ReactNode;
}

export interface INotificationProviderContext {
    open: (params: OpenNotificationParams) => void;
    close: (key: string) => void;
}
