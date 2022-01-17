import { IUndoableQueue } from "../../interfaces";

export interface IUndoableQueueContext {
    notifications: IUndoableQueue[];
    notificationDispatch: React.Dispatch<any>;
}
