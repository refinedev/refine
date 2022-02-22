import { BaseKey } from ".";
export interface IUndoableQueue {
    id: BaseKey;
    resource: string;
    cancelMutation: () => void;
    doMutation: () => void;
    seconds: number;
    isRunning: boolean;
    isSilent: boolean;
}
