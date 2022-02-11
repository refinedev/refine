import { useContext } from "react";

import { UndoableQueueContext } from "@contexts/undoableQueue";
import { IUndoableQueue, IUndoableQueueContext } from "../../../interfaces";

export type UseCancelNotificationType = () => {
    notifications: IUndoableQueue[];
    notificationDispatch: React.Dispatch<any>;
};

export const useCancelNotification: UseCancelNotificationType = () => {
    const { notifications, notificationDispatch } =
        useContext<IUndoableQueueContext>(UndoableQueueContext);

    return { notifications, notificationDispatch };
};
